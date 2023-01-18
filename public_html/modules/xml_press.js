import {linkPrefix,widthThreshold,version} from './config.js';

var press;

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

let createPress = function(xml){
  let pressBlock = xml.getElementsByTagName('press-list');

  for (var j = 0; j< pressBlock.length; j++){
    let presses = pressBlock[j].getElementsByTagName('press')

    let table = document.createElement("table");
    table.setAttribute("class","pressTable")

    let row_num = Math.floor(presses.length/3)+1

    let i = 0;
    for (var r = 0; r < row_num; r++){
      var row = document.createElement("tr");
      row.setAttribute("class","pressRow")
      for (var n = 0; n < 3; n++){
        if (i < presses.length){
          if (presses[i].getAttribute("isVisableInPress") == "true") {
            var a = document.createElement("a")
            a.setAttribute("href", linkPrefix + presses[i].getAttribute("link"))

            var cell = document.createElement("td")
            cell.setAttribute("class", "pressContainer")
            var coverImg = document.createElement("img");
            coverImg.setAttribute("class", "pressCoverImg");
            coverImg.setAttribute("src", presses[i].getAttribute("imgSrc")+'?v='+version);
            coverImg.onmouseover = mouseOver;
            coverImg.onmouseout = mouseOut;
            var title = document.createElement("div");
            title.setAttribute("class", "pressTitle");
            title.innerText = presses[i].getAttribute("title")
            var subTitle = document.createElement("div");
            subTitle.setAttribute("class", "pressSubtitle");
            subTitle.innerText = presses[i].getAttribute("subtitle")
            var date = document.createElement("div");
            date.setAttribute("class", "pressDate")
            date.innerText = presses[i].getAttribute("date")

            a.appendChild(coverImg)
            a.appendChild(title)
            a.appendChild(subTitle)
            a.appendChild(date)
            cell.appendChild(a)
            row.appendChild(cell)
            i += 1
          }
        } else {
            var cell = document.createElement("td")
            cell.setAttribute("class", "pressContainer")
            row.appendChild(cell)
        }
      }
      table.appendChild(row)
    }

    press[j].appendChild(table)

    var space = document.createElement("div")
    space.setAttribute("class", "space-l")
    press[j].appendChild(space)

    var line = document.createElement("div")
    line.setAttribute("class", "line")
    press[j].appendChild(line)

  }

}

let createPressM = function(xml){
  let pressBlock = xml.getElementsByTagName('press-list');
  // console.log(pressBlock)
  for (var j = 0; j< pressBlock.length; j++){

      let presses = pressBlock[j].getElementsByTagName('press');

      let table = document.createElement("table");
      table.setAttribute("class","pressTable")

      let row_num = presses.length


      for (var i = 0; i < row_num; i++){
        var row = document.createElement("tr");
        row.setAttribute("class","pressRow")
        if (presses[i].getAttribute("isVisableInPress") == "true") {
          var a = document.createElement("a")
          a.setAttribute("href", linkPrefix + presses[i].getAttribute("link"))

          var cell = document.createElement("td")
          cell.setAttribute("class", "pressContainer")

          var coverImg = document.createElement("img");
          coverImg.setAttribute("class", "pressCoverImg");
          coverImg.setAttribute("src", presses[i].getAttribute("imgSrc")+'?v='+version);
          coverImg.onmouseover = mouseOver;
          coverImg.onmouseout = mouseOut;
          var title = document.createElement("div");
          title.setAttribute("class", "pressTitle");
          title.innerText = presses[i].getAttribute("title")
          var subTitle = document.createElement("div");
          subTitle.setAttribute("class", "pressSubtitle");
          subTitle.innerText = presses[i].getAttribute("subtitle")
          var date = document.createElement("div");
          date.setAttribute("class", "pressDate")
          date.innerText = presses[i].getAttribute("date")
          a.appendChild(coverImg)
          a.appendChild(title)
          a.appendChild(subTitle)
          a.appendChild(date)
          cell.appendChild(a)
          row.appendChild(cell)
        }


        table.appendChild(row)
        var space = document.createElement("div")
        space.setAttribute("class","space-press")
        table.appendChild(space)
      }

      press[j].appendChild(table)
      for (var i = 0; i<2;i++){
        var space = document.createElement("div")
        space.setAttribute("class", "space-s")
        press[j].appendChild(space)
      }
  }
}



var mouseX, mouseY
var cursor = document.getElementById("cursor");


function onMouseMove( event ) {
  mouseX = event.clientX / window.innerWidth * 100
  mouseY = event.clientY / window.innerHeight * 100
  cursor.style.left = mouseX - 1.25 + '%'
  cursor.style.top = mouseY - 1.25 + '%'
}

function mouseOver(event) {
  cursor.style.opacity = 1
  cursor.style.transform = "rotate(0deg) scale(1)"
}
function mouseOut(event) {
  cursor.style.opacity = 0
  cursor.style.transform = "rotate(-75deg) scale(0.8)"
}

var width = window.innerWidth;
let filenamePrefix = window.location.pathname.split("/").pop().split(".")[0]
if (filenamePrefix==''){
  filenamePrefix = 'home'
}

if (width<widthThreshold){
  //mobile
  press = document.getElementsByClassName("mobilePress");
  getXMLFile("../src/"+filenamePrefix+"-press.xml?v="+version, createPressM);
} else {
  press = document.getElementsByClassName("desktopPress");
  getXMLFile("../src/"+filenamePrefix+"-press.xml?v="+version, createPress);
}
