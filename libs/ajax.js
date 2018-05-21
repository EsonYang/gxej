function ajaxGet(url, data) {
    data = data ? "?" + data : "";
    url = url + data;
    return new Promise(function(resolve, rejected) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send(null);
        xhr.onload = function() {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            }
        }
        setTimeout(function() {
            rejected("ajax错误");
        }, 3000)
    })
}