
function ServiceModule() {

    let imagePageNumber = 0;
    const url = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=00ac5f70d662304b87e7da585bbdef9d&tags=nature&per_page=500&page=" + imagePageNumber + "&format=json&nojsoncallback=1";

    function sendRequest(method, url) {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open(method, url);
            request.onload = resolve;
            request.onerror = reject;
            request.send();
        });
    };

    ServiceModule.prototype.getImages = function getImages(page) {
        imagePageNumber = page;
        return sendRequest('GET', url)
            .then(function (response) {
                let responseObj = JSON.parse(response.target.response);
                return responseObj.photos.photo;
            }, function (response) {
            });
    }
}

module.exports = ServiceModule;