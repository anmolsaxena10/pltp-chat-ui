var api_url = "http://localhost:8899/api/";

var indexAuth = function(){
    var token = localStorage.getItem("token");
    if(token){
        $.ajax({
            url: api_url + "verifyToken",
            type: "GET",
            beforeSend: function( xhr ) {
                xhr.setRequestHeader("token", token);
            },
            success: function(result){
                console.log(result);
                if(!result.status)
                    window.location.href = window.location.href + "login.html";
                else
                    window.location.href = window.location.href + "users.html";
            }
        });
    }
    else{
        window.location.href = window.location.hostname + "login.html";
    }
}

var loginAuth = function(){
    var token = localStorage.getItem("token");
    if(token){
        $.ajax({
            url: api_url + "verifyToken",
            type: "GET",
            beforeSend: function( xhr ) {
                xhr.setRequestHeader("token", token);
            },
            success: function(result){
                console.log(result);
                if(result.status)
                    window.location.href = "./users.html";
                else{
                    localStorage.removeItem("token");
                }
            }
        });
    }
}

var usersAuth = function(){
    var token = localStorage.getItem("token");
    if(token){
        $.ajax({
            url: api_url + "verifyToken",
            type: "GET",
            beforeSend: function( xhr ) {
                xhr.setRequestHeader("token", token);
            },
            success: function(result){
                console.log(result);
                if(!result.status){
                    localStorage.removeItem("token");
                    window.location.href = "./login.html";
                }
            }
        });
    }
    else{
        window.location.href = "./login.html";
    }
}

var chatAuth = function(){
    var token = localStorage.getItem("token");
    if(token){
        $.ajax({
            url: api_url + "verifyToken",
            type: "GET",
            beforeSend: function( xhr ) {
                xhr.setRequestHeader("token", token);
            },
            success: function(result){
                console.log(result);
                if(!result.status){
                    localStorage.removeItem("token");
                    window.location.href = "./login.html";
                }
            }
        });
    }
    else{
        window.location.href = "./login.html";
    }
}