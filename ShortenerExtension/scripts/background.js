chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message == "shorten-url") {
        // getCurrentWindow();
        chrome.tabs.query({
            "active": true,
            "currentWindow": true
        }, getUrl)
    }
});

function getUrl(tab) {
    url = tab[0].url;
    res = shortenUrl(url);
    try {
        res.then(function(result) {
            // send result back to popup
            chrome.runtime.sendMessage({
                "message": "url shortened",
                "tinyurl": result
            });
        });
    } catch (e) {
        if (res["message"] == "invalid URL") {
            chrome.runtime.sendMessage({
                "message": "invalid url"
            });
        }
    } finally {

    }

}

function shortenUrl(url) {
    regex = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$');
    if (!!regex.test(url)) {
        response = fetch("https://tinyurl.com/api-create.php?url=".concat(encodeURI(url))).then(res => res.text());
        return response;
    } else {
        return {
            "message": "invalid URL"
        }
    }
}
