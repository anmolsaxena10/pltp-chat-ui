/*
<div class="col s6 m3 l2 center-align">
    <a onclick="openChat('id')">
        <div class="card-panel hoverable green darken-4">
            <span class="white-text">User</span>
        </div>
    </a>
</div>
*/

var loadUsers = function () {
    console.log("asdsa");
    $.ajax({
        url: api_url + "getAllUsers",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("token", localStorage.getItem("token"));
        },
        success: function (result) {
            console.log(result);
            if (result.success) {
                displayUsers(result.users);
            }
            else {
                M.toast({ html: 'Problem loading users. Please reload the page' });
            }
        }
    });
}

var displayUsers = function (users) {
    users.forEach(user => {
        var html = `<div class="col s6 m3 l2 center-align">
                        <a onclick="openChat('`+ user.username + `')">
                            <div class="card-panel hoverable green darken-4">
                                <span class="white-text">`+user.username+`</span>
                            </div>
                        </a>
                    </div>`;
        $('#bucket').append(html);
    });
}

var openChat = function (userid) {
    console.log(userid);
    window.location.href = './chat.html?uname='+userid;
}