import {version} from './config.js?v=200';

let getFileContent = function(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
              var fileContent = rawFile.responseText;
              document.getElementsByTagName("body")[0].innerHTML += fileContent;
          }
      }
  }
  rawFile.send(null);
}

let addModule = function(path){
  let script = document.createElement("script");
  script.src = path + '?v=' + version;
  script.type = "module";
  document.head.appendChild(script);
}

let addCSS = function(path){
  let css = document.createElement("link");
  css.href = path + '?v=' + version;
  css.rel = "stylesheet";
  css.type = "text/css";
  document.head.appendChild(css);
}

export {getFileContent,addModule,addCSS}
