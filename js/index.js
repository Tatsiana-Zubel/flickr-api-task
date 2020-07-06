"use strict";

window.addEventListener("DOMContentLoaded", function () {
  let flickrImages = [],
    imgNumber = 0,
    imagesLoaded = false,
    imagePageNumber = 0,
    sortingEnabled = false;

  const serviceModule = require("./service");
  const serviceModuleInstance = new serviceModule();

  function fetchImages() {
    setImagePageNumber();
    return serviceModuleInstance
      .getImages(imagePageNumber)
      .then(function (images) {
        flickrImages = Object.entries(images);
        imagesLoaded = true;
      });
  }

  let btn = document.getElementById("sort");
  btn.addEventListener("click", function () {
    sortingEnabled = !sortingEnabled;
    cleanStart();
  })

  function cleanStart() {
    flickrImages = [];
    imgNumber = 0;
    imagesLoaded = false;
    imagePageNumber = 0;
    fetchImages().then(function () {
      if (sortingEnabled) {
        flickrImages = flickrImages.sort(function (a, b) {
          return a[1].title.localeCompare(b[1].title);
        });
      }
      let myNode = document.querySelector(".data");
      myNode.innerHTML = ' '
      window.scrollTop(0);
      for (let i = 0; i < 10; i++) {
        updateDOM();
      };
    })
  }

  function start() {
    fetchImages().then(function () {
      for (let i = 0; i < 10; i++) {
        updateDOM();
      }
    });
  }

  start();

  function setImagePageNumber() {
    imagePageNumber += 1;
  }

  function parseImgUrl() {
    let image = flickrImages[imgNumber][1];
    if (image == undefined) {
      imagesLoaded = false;
      imgNumber = 0;

      fetchImages().then(function () {
        return parseImgUrl();
      });
    } else {
      let imageSrc =
        "https://farm" +
        image.farm +
        ".staticflickr.com/" +
        image.server +
        "/" +
        image.id +
        "_" +
        image.secret +
        ".jpg";
      return imageSrc;
    }
  }

  function getImageTitle() {
    let image = flickrImages[imgNumber][1];
    return image.title;
  }

  function updateDOM() {
    let parentblock = document.querySelector(".data"),
      rowdiv = document.createElement("div"),
      imagediv = document.createElement("div"),
      titlediv = document.createElement("div");

    imgNumber += 1;
    imagediv.id = "page" + imagePageNumber + "img" + imgNumber;
    titlediv.id = "page" + imagePageNumber + "title" + imgNumber;

    rowdiv.classList.add("row");
    imagediv.classList.add("col-md-6", "image");
    titlediv.classList.add("col-md-6", "title");

    parentblock.appendChild(rowdiv);
    rowdiv.appendChild(imagediv);
    rowdiv.appendChild(titlediv);

    let image = document.createElement("img");
    image.classList.add("mx-auto", "d-block");
    image.src = parseImgUrl();
    document.getElementById(imagediv.id).appendChild(image);

    let paragraph = document.createElement("p");
    paragraph.classList.add("text-center");

    document.getElementById(titlediv.id).appendChild(paragraph);
    paragraph.textContent = getImageTitle();
  }

  function getScrollHeight() {
    return document.documentElement.scrollHeight;
  }

  function getClientHeight() {
    return document.documentElement.clientHeight;
  }

  window.addEventListener("scroll", function () {
    if (imagesLoaded) {
      if (pageYOffset > getScrollHeight() - getClientHeight() * 1.2) {
        for (let i = 0; i < 3; i++) {
          updateDOM();
        }
      }
    }
  });
});
