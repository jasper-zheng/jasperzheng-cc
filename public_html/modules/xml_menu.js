import {linkPrefix,widthThreshold,version} from './config.js';

var menu;
var aboutLink = linkPrefix+"home"
var insLink = 'https://www.instagram.com/alaskawinter_x/'

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

let createMenu = function(xml){
  let menuBackground;
  if (width<widthThreshold){
    //if mobile
    menu = document.createElement("table");
    menu.setAttribute("class","menu-container")
    menuBackground = document.getElementById("mobileMenu");
    menuBackground.appendChild(menu)
  } else {
    menu = document.getElementById("desktopMenu");
  }

  let categories = xml.getElementsByTagName('categories');

  for (var i = 0; i<categories.length; i++) {
    var row = document.createElement("tr");
    var category = document.createElement("th");
    var h3 = document.createElement("h3");
    var a = document.createElement("a");
    a.setAttribute("href", linkPrefix+categories[i].getAttribute("link"));
    a.innerText = categories[i].getAttribute("name");
    category.setAttribute("class", "menuHead");
    // h3.setAttribute("class", "menuHeadTitle");
    h3.appendChild(a);
    category.appendChild(h3);
    row.appendChild(category);
    menu.appendChild(row);

    var projects = categories[i].getElementsByTagName('project');
    for (var n = 0; n<projects.length; n++) {
      if (projects[n].getAttribute("isVisableInMenu") == "true") {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var h4 = document.createElement("h4");
        var aa = document.createElement("a");
        aa.innerText = projects[n].getAttribute("title");
        aa.setAttribute("href", linkPrefix+projects[n].getAttribute("link"));
        td.setAttribute("class", "menuCell");
        h4.appendChild(aa);
        td.appendChild(h4);
        tr.appendChild(td);
        menu.appendChild(tr);
      }
    }
  }

  var menuAbouts = document.createElement('div')
  menuAbouts.setAttribute('class','menu-abouts')


  var ins = document.createElement('a')
  var about = document.createElement('a')
  ins.setAttribute('href',insLink)
  about.setAttribute('href',aboutLink)
  about.setAttribute('class','menu-about-link')
  ins.setAttribute('class','menu-about-link')
  ins.setAttribute('target','_blank')
  ins.innerText = 'Instagram'
  about.innerText = 'About'

  menuAbouts.appendChild(about)
  menuAbouts.appendChild(ins)

  if (width<widthThreshold){
    menuBackground.appendChild(menuAbouts)
  } else {
    menu.appendChild(menuAbouts)
  }

}

var width = window.innerWidth;
getXMLFile("../src/menu.xml?v="+version, createMenu);
