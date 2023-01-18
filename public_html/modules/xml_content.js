import {widthThreshold,version} from './config.js';

var content;

var slidesContainer
var slides = [];
var thumbs = [];
var slideIndex = 0;
var slideNum;
var prevButton, nextButton

let getXMLFile = function(path, callback) {
  let request = new XMLHttpRequest();
  request.open("GET",path);
  request.setRequestHeader("Content-Type", "text/xml");
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      callback(request.responseXML);
    }
  };
  request.send();
}

let createContent = function(xml){

  createSlide(xml.getElementsByTagName('imgSlide'))

  var space = document.createElement("div");
  space.setAttribute("class","space-m")
  content.appendChild(space)

  var contentTable = document.createElement("table");
  contentTable.setAttribute("class","content-table")

  var texts = document.createElement("td");
  texts.setAttribute("class","content-texts")

  var labels = document.createElement("td");
  labels.setAttribute("class","content-labels")

  var labelXml = xml.getElementsByTagName('label')[0]

  var title = document.createElement("div");
  title.setAttribute("class", "content-labels-title");
  title.innerText = labelXml.getAttribute("title")
  texts.appendChild(title)

  var subTitle = document.createElement("p");
  subTitle.innerText = labelXml.getAttribute("subTitle")
  subTitle.setAttribute("style", "font-weight:bold")
  texts.appendChild(subTitle)

  var dim = document.createElement("p");
  dim.innerText = labelXml.getAttribute("dimension")
  texts.appendChild(dim)

  var date = document.createElement("p");
  date.innerText = labelXml.getAttribute("date")
  texts.appendChild(date)

  for(var i = 0; i<2;i++){
    var br = document.createElement("div");
    br.setAttribute("class","space-s")
    texts.appendChild(br)
  }

  var mat = document.createElement("p");
  mat.setAttribute("style", "padding-top: 0.3vw");
  // console.log(labelXml.childNodes[0].nodeValue.length)
  if (labelXml.childNodes[0].nodeValue.length != 3){
    mat.innerText = labelXml.childNodes[0].nodeValue
    texts.appendChild(mat)
  }

  var links = xml.getElementsByTagName('link')
  for (var i = 0; i<links.length;i++){
    var a = document.createElement("a");
    a.setAttribute("href",links[i].getAttribute("href"))
    a.setAttribute("style","text-decoration: underline")
    a.setAttribute("class","label-link")
    a.setAttribute("target","_blank")
    a.innerHTML = links[i].getAttribute("linkTitle")
    texts.appendChild(a)
  }

  var space0 = document.createElement("div");
  space0.setAttribute("class","space-m")
  texts.appendChild(space0)

  var line0 = document.createElement("div")
  line0.setAttribute("class","line")
  texts.appendChild(line0)

  var space1 = document.createElement("div");
  space1.setAttribute("class","space-m")
  texts.appendChild(space1)

  var textContents = xml.getElementsByTagName('text')
  for (var i = 0; i < textContents.length; i++){
    var p = document.createElement("p");
    p.setAttribute("class","p")
    p.setAttribute("style","padding-top: 1vw")
    p.innerHTML = textContents[i].childNodes[0].nodeValue
    texts.appendChild(p)
  }

  var textContentsA = xml.getElementsByTagName('text-a')
  for (var i = 0; i < textContentsA.length; i++){
    var p = document.createElement("a")
    p.setAttribute("href",textContentsA[i].getAttribute("href"))
    p.setAttribute("class","label-link")
    p.setAttribute("target","_blank")
    p.setAttribute("style","text-decoration: underline")
    p.innerHTML = textContentsA[i].childNodes[0].nodeValue
    texts.appendChild(p)
  }

  var linkedVideos = xml.getElementsByTagName('video')
  for (var i = 0; i < linkedVideos.length; i++){
    var spaceV = document.createElement("div");
    spaceV.setAttribute("class","space-l")
    texts.appendChild(spaceV)

    var iframe = document.createElement("iframe");
    iframe.setAttribute("src",linkedVideos[i].getAttribute("src"))
    iframe.setAttribute("width",linkedVideos[i].getAttribute("width"))
    iframe.setAttribute("height",linkedVideos[i].getAttribute("height"))
    iframe.setAttribute("frameborder",linkedVideos[i].getAttribute("frameborder"))
    texts.appendChild(iframe)
  }

  var linkedSongs = xml.getElementsByTagName('music')
  for (var i = 0; i < linkedSongs.length; i++){
    var spaceV = document.createElement("div");
    spaceV.setAttribute("class","space-l")
    texts.appendChild(spaceV)

    var iframe = document.createElement("iframe");
    iframe.setAttribute("src",linkedSongs[i].getAttribute("src"))
    iframe.setAttribute("width",linkedSongs[i].getAttribute("width"))
    iframe.setAttribute("height",linkedSongs[i].getAttribute("height"))
    iframe.setAttribute("frameborder",linkedSongs[i].getAttribute("frameborder"))
    iframe.setAttribute("allowtransparency",linkedSongs[i].getAttribute("allowtransparency"))
    iframe.setAttribute("allow",linkedSongs[i].getAttribute("encrypted-media"))
    texts.appendChild(iframe)
  }



  contentTable.appendChild(texts)
  // contentTable.appendChild(labels)
  content.appendChild(contentTable)

  for (var i = 0; i<1;i++){
    var spaceL = document.createElement("div");
    spaceL.setAttribute("class","space-l")
    content.appendChild(spaceL)
  }
}

let createContentM = function(xml){
  createSlide(xml.getElementsByTagName('imgSlide'))

  var contentTable = document.createElement("div");
  contentTable.setAttribute("class","content-table")

  var texts = document.createElement("div");
  texts.setAttribute("class","content-texts")

  var labels = document.createElement("div");
  labels.setAttribute("class","content-labels")

  var textContents = xml.getElementsByTagName('text')
  for (var i = 0; i < textContents.length; i++){
    var p = document.createElement("p");
    p.setAttribute("class","p")
    p.setAttribute("style","padding-top: 2.8vw")
    p.innerHTML = textContents[i].childNodes[0].nodeValue
    texts.appendChild(p)
  }

  var textContentsA = xml.getElementsByTagName('text-a')
  for (var i = 0; i < textContentsA.length; i++){
    var p = document.createElement("a")
    p.setAttribute("href",textContentsA[i].getAttribute("href"))
    p.setAttribute("class","label-link")
    p.setAttribute("target","_blank")
    p.setAttribute("style","text-decoration: underline")
    p.innerHTML = textContentsA[i].childNodes[0].nodeValue
    texts.appendChild(p)
  }

  var linkedVideos = xml.getElementsByTagName('video')
  for (var i = 0; i < linkedVideos.length; i++){
    var spaceV = document.createElement("div");
    spaceV.setAttribute("class","space-m")
    texts.appendChild(spaceV)

    var iframe = document.createElement("iframe");
    iframe.setAttribute("src",linkedVideos[i].getAttribute("src"))
    iframe.setAttribute("width",linkedVideos[i].getAttribute("width")*0.6)
    iframe.setAttribute("height",linkedVideos[i].getAttribute("height")*0.6)
    iframe.setAttribute("frameborder",linkedVideos[i].getAttribute("frameborder"))
    texts.appendChild(iframe)
  }

  var linkedSongs = xml.getElementsByTagName('music')
  for (var i = 0; i < linkedSongs.length; i++){
    var spaceV = document.createElement("div");
    spaceV.setAttribute("class","space-m")
    texts.appendChild(spaceV)

    var iframe = document.createElement("iframe");
    iframe.setAttribute("src",linkedSongs[i].getAttribute("src"))
    iframe.setAttribute("width",width*0.87)
    iframe.setAttribute("height",linkedSongs[i].getAttribute("height"))
    iframe.setAttribute("frameborder",linkedSongs[i].getAttribute("frameborder"))
    iframe.setAttribute("allowtransparency",linkedSongs[i].getAttribute("allowtransparency"))
    iframe.setAttribute("allow",linkedSongs[i].getAttribute("encrypted-media"))
    texts.appendChild(iframe)
  }

  var labelXml = xml.getElementsByTagName('label')[0]

  var title = document.createElement("div");
  title.setAttribute("class", "content-labels-title");
  title.innerText = labelXml.getAttribute("title")
  labels.appendChild(title)

  var subTitle = document.createElement("p");
  subTitle.innerText = labelXml.getAttribute("subTitle")
  subTitle.setAttribute("style", "font-weight:bold")
  labels.appendChild(subTitle)

  var dim = document.createElement("p");
  dim.innerText = labelXml.getAttribute("dimension")
  labels.appendChild(dim)

  var date = document.createElement("p");
  date.innerText = labelXml.getAttribute("date")
  labels.appendChild(date)

  for(var i = 0; i<1;i++){
    var br = document.createElement("div");
    br.setAttribute("class","space-s")
    labels.appendChild(br)
  }

  var mat = document.createElement("p");
  // mat.setAttribute("style", "padding-top: 3vw");
  mat.innerText = labelXml.childNodes[0].nodeValue
  labels.appendChild(mat)

  for(var i = 0; i<1;i++){
    var br = document.createElement("div");
    br.setAttribute("class","space-s")
    labels.appendChild(br)
  }

  var links = xml.getElementsByTagName('link')
  for (var i = 0; i<links.length;i++){
    var a = document.createElement("a");
    a.setAttribute("href",links[i].getAttribute("href"))
    a.setAttribute("style","text-decoration: underline")
    a.setAttribute("class","label-link")
    a.innerHTML = links[i].getAttribute("linkTitle")
    labels.appendChild(a)
  }
  contentTable.appendChild(labels)

  var line = document.createElement("div")
  line.setAttribute("class","line")
  contentTable.appendChild(line)

  contentTable.appendChild(texts)

  content.appendChild(contentTable)
}

let createSlide = function(imgSlide) {
  slidesContainer = document.createElement("div");
  slidesContainer.setAttribute("class","slides-container");
  slideNum = imgSlide.length;
  for (var i = 0; i < slideNum; i++){
    let imgPath = pathPrefix + imgSlide[i].getAttribute("src")+'?v='+version;
    var slideContainer = document.createElement("div");
    var slideImg = document.createElement("img");

    slideContainer.setAttribute("class","slide-container");
    slideImg.setAttribute("src",imgPath);
    slideImg.setAttribute("class","slide-img");

    if (imgSlide[i].getAttribute("layout")=="landscape"){
      slideImg.className += " landscape";
    } else {
      slideImg.className += " horizontal";
    }

    if (i == slideIndex){
      slideContainer.style.display = "block";
    } else {
      slideContainer.style.display = "none";
    }

    slideContainer.appendChild(slideImg)
    // console.log(slideImg.width)
    slides.push(slideContainer);
    slidesContainer.appendChild(slideContainer)
  }
  content.append(slidesContainer)
  showControlers();
  showThumbs(imgSlide)
}

let switchSlide = function(event){
  let index = slideIndex + event.currentTarget.operation
  if (index>=slideNum) {
    slideIndex = 0;
    index = 0;
  } else if (index<0) {
    slideIndex = slideNum-1;
    index = slideNum-1;
  } else{
    slideIndex = index
  }
  for (var i = 0; i < slideNum; i++) {
    if (i==index){
      slides[i].style.display = "block";
      thumbs[i].className += " active";
    } else {
      slides[i].style.display = "none";
      thumbs[i].className = thumbs[i].className.replace(" active","");
    }
  }

}

let jumpToSlide = function(event){
  slideIndex = event.currentTarget.index
  for (var i = 0; i < slideNum; i++) {
    if (i==slideIndex){
      slides[i].style.display = "block";
      thumbs[i].className += " active";
    } else {
      slides[i].style.display = "none";
      thumbs[i].className = thumbs[i].className.replace(" active","");
    }
  }
}

let showControlers = function(){
  prevButton = document.createElement("a");
  nextButton = document.createElement("a");
  prevButton.setAttribute("class","prev-button switch-button");
  nextButton.setAttribute("class","next-button switch-button");

  prevButton.operation = -1;
  nextButton.operation = 1;
  prevButton.addEventListener("click",switchSlide,false)
  nextButton.addEventListener("click",switchSlide,false)

  if (width > widthThreshold){
    prevButton.onmouseover = mouseOverLeft;
    prevButton.onmouseout = mouseOut;
    nextButton.onmouseover = mouseOverRight;
    nextButton.onmouseout = mouseOut;
  }

  let prevButtonIndicator = document.createElement("div");
  let nextButtonIndicator = document.createElement("div");
  prevButtonIndicator.setAttribute("class","prev-button-indicator switch-button-indicator");
  nextButtonIndicator.setAttribute("class","next-button-indicator switch-button-indicator");

  prevButtonIndicator.innerHTML = "&#10094;";
  nextButtonIndicator.innerHTML = "&#10095;";

  prevButton.appendChild(prevButtonIndicator)
  nextButton.appendChild(nextButtonIndicator)

  slidesContainer.appendChild(prevButton);
  slidesContainer.appendChild(nextButton);

}

function showThumbs(imgSlide) {
  var thumbsContainer = document.createElement("div")
  thumbsContainer.setAttribute("class","thumbs")
  for (var i = 0; i < slideNum; i++) {
    var thumb = document.createElement("div");
    var img = document.createElement("img");
    var space = document.createElement("div")
    space.setAttribute("class","thumb-space");
    thumb.setAttribute("class","thumb");
    if (i==slideIndex){
      thumb.className += " active";
    }
    img.setAttribute("src",pathPrefix + imgSlide[i].getAttribute("src"));
    img.setAttribute("class","thumb-img");
    img.index = i

    if (width > widthThreshold){
      thumb.style.width = 0.032*width*imgSlide[i].getAttribute("width")/imgSlide[i].getAttribute("height")+"px";
    } else {
      thumb.style.width = 0.105*width*imgSlide[i].getAttribute("width")/imgSlide[i].getAttribute("height")+"px";
    }

    img.addEventListener("click",jumpToSlide,false)
    thumb.appendChild(img);
    thumbsContainer.appendChild(thumb);
    thumbsContainer.appendChild(space)
    thumbs.push(thumb);

    // console.log(img.naturalHeight + " " + img.naturalWidth)
  }
  content.appendChild(thumbsContainer)
}

var mouseX, mouseY
var cursor = document.getElementById("cursor");


function onMouseMove( event ) {
  mouseX = event.clientX / window.innerWidth * 100
  mouseY = event.clientY / window.innerHeight * 100
  cursor.style.left = mouseX - 1.25 + '%'
  cursor.style.top = mouseY - 1.25 + '%'
}

function mouseOverLeft(event) {
  cursor.style.opacity = 1
  cursor.style.transform = "rotate(-180deg) scale(1)"
}
function mouseOverRight(event) {
  cursor.style.opacity = 1
  cursor.style.transform = "rotate(0deg) scale(1)"
}
function mouseOut(event) {
  cursor.style.opacity = 0
  cursor.style.transform = "rotate(-90deg) scale(0.8)"
}

content = document.getElementById("content");
let pathPrefix = "./" + window.location.pathname.split("/").pop().split(".")[0]+"-src/"
var width = window.innerWidth;

if (width > widthThreshold){
  window.addEventListener('mousemove', onMouseMove, false);
  getXMLFile(pathPrefix+"content.xml?v="+version, createContent);
} else {
  getXMLFile(pathPrefix+"content.xml?v="+version, createContentM);
}
