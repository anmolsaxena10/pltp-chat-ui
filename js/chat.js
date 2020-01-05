/*
<li class="collection-item avatar right-align">
                <i class="material-icons circle green darken-4">arrow_upward</i>
                <span class="title">Message</span>
                <p>time</p>
            </li>
            <li class="collection-item avatar">
                <i class="material-icons circle green darken-4">arrow_downward</i>
                <span class="title">Message</span>
                <p>Time</p>
            </li>
*/

var loadMessages = function () {
    var url = new URL(window.location.href);
    var username = url.searchParams.get("uname");
    if (username != null) {
        $(".brand-logo").html("Chat " + username);
        $.ajax({
            url: api_url + "getAllMessages/" + username,
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("token", localStorage.getItem("token"));
            },
            success: function (result) {
                console.log(result);
                if (result.success) {
                    showMessages(result.messages, username);
                    // displayUsers(result.users);
                }
                else {
                    M.toast({ html: 'Problem loading messages. Please reload the page' });
                }
            }
        });
    }
    else {
        window.location.href = './';
    }
}

var showMessages = function (messages, username) {
    messages.forEach(message => {
        var date = new Date(message.ts);
        date = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
        if (message.to == username) {
            var html = `<li class="collection-item avatar right-align">
                            <i class="medium material-icons circle lime darken-4">arrow_upward</i>
                            <span class="title">`+ message.message + `</span>
                            <p>`+ date + `</p>
                        </li>`;
            $('#bucket').append(html);
        }
        else if(message.from == username) {
            var html = `<li class="collection-item avatar">
                            <i class="medium material-icons circle green darken-4">arrow_downward</i>
                            <span class="title">`+ message.message + `</span>
                            <p>`+ date + `</p>
                        </li>`;
            $('#bucket').append(html);
        }
        else{
            M.toast({ html: 'Message received from ' + message.from });
        }
    });
}

const socket = io('http://192.168.1.7:8899?token=' + localStorage.getItem("token"));

socket.on("message", (message) => {
    var url = new URL(window.location.href);
    var to = url.searchParams.get("uname");
    showMessages([message], to);
});

var sendMessage = function () {
    var url = new URL(window.location.href);
    var to = url.searchParams.get("uname");
    var message = {
        "to": to,
        "message": $('#message').val(),
        "ts": (new Date()).getTime()
    }
    socket.emit("message", message);
};