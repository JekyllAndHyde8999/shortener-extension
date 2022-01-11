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
    regex = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (!!regex.test(url)) {
        response = fetch("https://tinyurl.com/api-create.php?url=".concat(encodeURI(url))).then(res => res.text());
        return response;
    } else {
        return {
            "message": "invalid URL"
        }
    }
}
