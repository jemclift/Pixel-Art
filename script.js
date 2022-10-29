var height = 7;
var width = 5;
var retro = false
var color1 = "white"
var color2 = "black"

var map = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]


function flipPixel(id) {
  a = id[0].charCodeAt(0)-97
  b = id[1]-1

  if (map[a][b] == 0) {map[a][b] = 1}
  else {if (map[a][b] == 1) {map[a][b] = 0}
  }

  RefreshPixels()
}

function resetAll(input) {
  for (var h = 0; h <= (height-1); h++) {
    for (var w = 1; w <= width; w++) {
      var id = String.fromCharCode(65+h).toLowerCase() + w.toString()
      var elem = document.getElementById(id)
      if (input == 0) {map[h][w-1] = 0}
      if (input == 1) {map[h][w-1] = 1}
    }
  }
  RefreshPixels()
  drawImage()
}

function Export() {
  drawImage()
  elem = document.getElementById("output-page")
  if (elem.style.display == "block") {
    elem.style.display = "none"
  } else {
    elem.style.display = "block"
  }

  elem = document.getElementById("code")
  var print = ""
  for (var x = 0; x <= (height-1); x++) {
    print = print + map[x] + "<br>"
  }
  elem.innerHTML = print

  elem = document.getElementById("setting-page")
  if (elem.style.display = "block") {
    elem.style.display = "none"
  }
}

function copy() {
  var elem = document.getElementById("code")
  updateClipboard(elem.innerText)
}

function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(function() {
    /* clipboard successfully set */
  }, function() {
    /* clipboard write failed */
  });
}

function random() {
  for (var h = 0; h <= (height-1); h++) {
    for (var w = 1; w <= width; w++) {
      var id = String.fromCharCode(65+h).toLowerCase() + w.toString()
      var elem = document.getElementById(id)
      var rand = Math.floor(Math.random()*2)
      if (rand == 0) {map[h][w-1] = 1}
      else {map[h][w-1] = 0}
    }
  }
  RefreshPixels()
  drawImage()
}

function settings() {
  elem = document.getElementById("setting-page")
  if (elem.style.display == "block") {
    elem.style.display = "none"
  } 
  else {
    elem.style.display = "block"
  }
  elem.scrollTo(0, 0)
  elem = document.getElementById("output-page")
  if (elem.style.display = "block") {
    elem.style.display = "none"
  }
}

function RefreshColors() {
  elem = document.getElementById("picker1")
  color1 = elem.value
  elem = document.getElementById("picker2")
  color2 = elem.value
  for (var h = 0; h <= (height-1); h++) {
    for (var w = 1; w <= width; w++) {
      var id = String.fromCharCode(65+h).toLowerCase() + w.toString()
      var elem = document.getElementById(id)

      if (Hex(elem.style.backgroundColor) == color1) {
        elem.style.backgroundColor = color1
      } 
      if (Hex(elem.style.backgroundColor) == color2) {
        elem.style.backgroundColor = color2
      } 
    }
  }

  var elem = document.getElementById("allWhite")
  elem.innerHTML = ntc.name(color1)[1]
  elem.style.backgroundColor = color1
  var comp = Rgb(color1)
  if (((comp[0]+comp[1]+comp[2])/3) > 128) {
    elem.style.color = "black"
  } else {
    elem.style.color = "white"
  }

  var elem = document.getElementById("allBlack")
  elem.innerHTML = ntc.name(color2)[1]
  elem.style.backgroundColor = color2
  comp = Rgb(color2)
  if (((comp[0]+comp[1]+comp[2])/3) > 128) {
    elem.style.color = "black"
  } else {
    elem.style.color = "white"
  }

  document.body.style.backgroundColor = document.getElementById("picker3").value

  RefreshPixels()
}

function RefreshPixels() {
  for (var h = 0; h <= (height-1); h++) {
    for (var w = 1; w <= width; w++) {
      var id = String.fromCharCode(65+h).toLowerCase() + w.toString()
      var elem = document.getElementById(id)
      if (map[h][w-1] == 0) {elem.style.backgroundColor = color1} 
      if (map[h][w-1] == 1) {elem.style.backgroundColor = color2} 
    }
  }
}

function Hex(rgb) {
  function componentToHex(c) {var hex = c.toString(16);return hex.length == 1 ? "0" + hex : hex;}
  function rgbToHex(r, g, b) {return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);}
  rgb = rgb.replace("rgb(","");rbg = rgb.replace(")","");rgb = rgb.split(',');
  return rgbToHex(parseInt(rgb[0], 10),parseInt(rgb[1], 10),parseInt(rgb[2], 10))
}

function ResetColors() {
  elem = document.getElementById("picker1")
  elem.value = '#ffffff'
  elem = document.getElementById("picker2")
  elem.value = '#000000'
    elem = document.getElementById("picker3")
  elem.value = '#2F4858'
  RefreshColors()
}

function Rgb(hex) {
  "use strict";
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }
  if ((hex.length < 2) || (hex.length > 6)) {
    return false;
  }
  var values = hex.split(''),
    r,
    g,
    b;

  if (hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = r;
    b = r;
  } else if (hex.length === 3) {
    r = parseInt(values[0].toString() + values[0].toString(), 16);
    g = parseInt(values[1].toString() + values[1].toString(), 16);
    b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = parseInt(values[2].toString() + values[3].toString(), 16);
    b = parseInt(values[4].toString() + values[5].toString(), 16);
  } else {
    return false;
  }
  return [r, g, b];
}


function pushToLocal() {
  for (var x = 0; x < height; x++) {
    localStorage.setItem('MAP'+x.toString(), map[x]);
  }
}

function pullFromLocal() {
  for (var x = 0; x < height; x++) {
    map[x] = localStorage.getItem('MAP'+x.toString()).split(',');
  }
  RefreshPixels()
}

function resetCursor() {
  document.body.style.cursor = 'default'
  // document.getElementsByTagName('div').style.cursor = 'default'
  document.getElementsByTagName('button').style.backgroundColor = 'red'
  // document.getElementsByTagName('h1').style.cursor = 'default'
  // document.getElementsByTagName('p').style.cursor = 'default'
  // document.getElementsByTagName('input').style.cursor = 'default'
}

function drawImage() {
  var scale = 20

  var canvas = document.getElementById("Canvas");
  var context = canvas.getContext("2d");

  for (var h = 0; h <= (height-1); h++) {
    for (var w = 0; w <= width-1; w++) {
      if (map[h][w] == 0) { context.fillStyle = color1;}
      if (map[h][w] == 1) { context.fillStyle = color2;}
      context.fillRect(w*scale,h*scale,scale,scale);
      }
  }
}

function downloadImage(type){
  var link = document.createElement('a');
  link.download = 'image.'+type;
  link.href = document.getElementById('Canvas').toDataURL()
  link.click();
}


function cleanPixels() {
  var temp = map
  resetAll(0)
  resetAll(1)
  map = temp
  RefreshPixels()
}