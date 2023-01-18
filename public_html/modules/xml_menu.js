import {linkPrefix,widthThreshold,version} from './config.js';

var menu;
var aboutLink = linkPrefix+"home"
var insLink = 'https://www.instagram.com/alaskawinter_x/'
var linkedinLink = 'https://www.linkedin.com/in/jasper-zheng/'
var cvLink = 'https://alaskawinter.cc/CV_2023.01.pdf'


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
    // console.log(test)
  }
  // let skipTitle = menu.hasAttribute("skipTitle")
  if (!menu.hasAttribute("skipTitle") && width>widthThreshold){
    var awTitle = document.createElement("h2");
    var titleA = document.createElement("a");
    titleA.setAttribute("href",linkPrefix+"home")
    awTitle.setAttribute("class","awTitle");
    titleA.innerText = "ALASKA WINTER"
    awTitle.appendChild(titleA)
    menu.appendChild(awTitle);
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

  var cv = document.createElement('a')
  cv.setAttribute('href',cvLink)
  cv.setAttribute('class','menu-about-link')
  cv.setAttribute('target','_blank')
  cv.innerText = 'cv'
  var linkedin = document.createElement('a')
  linkedin.setAttribute('href',linkedinLink)
  linkedin.setAttribute('class','menu-about-link')
  linkedin.setAttribute('target','_blank')
  linkedin.innerText = 'LinkedIn'

  menuAbouts.appendChild(about)
  menuAbouts.appendChild(ins)
  menuAbouts.appendChild(linkedin)
  menuAbouts.appendChild(cv)

  if (width<widthThreshold){
    menuBackground.appendChild(menuAbouts)
  } else {
    menu.appendChild(menuAbouts)
  }

}

var width = window.innerWidth;
getXMLFile("../src/menu.xml?v="+version, createMenu);
