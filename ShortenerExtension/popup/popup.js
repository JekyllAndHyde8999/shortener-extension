document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("shorten-button").addEventListener('click', function() {
        chrome.runtime.sendMessage({
            "message": "shorten-url"
        });
    })
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "url shortened") {
        document.getElementById("shortened-url").innerHTML = '<a href="' + request.tinyurl + '">' + request.tinyurl + '</a>';
    } else if (request.message == "invalid url") {
        document.getElementById("shortened-url").innerHTML = '<p class="alert-danger">Invalid URL!!</p>';
    }
});
