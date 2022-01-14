document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("shorten-button").addEventListener('click', function() {
        chrome.runtime.sendMessage({
            "message": "shorten-url"
        });
    })
})

function copyToClipBoard() {
    url = document.getElementById('shortened-link');
    navigator.clipboard.writeText(url.innerHTML);
    document.getElementById("copy-button").className = "fas fa-check";
    document.getElementById("copy-button").style.color = "green";
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "url shortened") {
        document.getElementById("shortened-url-container").innerHTML = '<span id="shortened-link">' + request.tinyurl + '</span>' + document.getElementById("shortened-url-container").innerHTML;
        document.getElementById('copy-button').style.display = "block";
        document.getElementById('copy-button').addEventListener('click', copyToClipBoard);
    } else if (request.message == "invalid url") {
        document.getElementById("shortened-url-container").innerHTML = '<p class="alert-danger">Invalid URL!!</p>';
    }
});
