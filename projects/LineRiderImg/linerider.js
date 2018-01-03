var canvas = document.getElementById('canvas');
var canvas1 = document.getElementById('canvas1')
var ctx = canvas.getContext('2d');
var ctx1 = canvas1.getContext('2d');

var bitmapEx = {
  array:[
    0,0,0,0,0,0,0,0,
    0,0,1,1,1,0,0,0,
    0,1,0,0,0,1,0,0,
    0,0,1,1,1,0,0,0,
    0,0,0,1,0,0,0,0,
    0,1,1,1,1,1,0,0,
    0,0,0,1,0,0,0,0,
    0,0,1,0,1,0,0,0,
  ],
  width:8,

};
//0 = false, 1 = true

function image(bitmap, x, y, scale) {
  var lines = [];
  linecount=0;
  for (var i = 0; i < bitmap.array.length/bitmap.width; i++) {
    for (var j = 0; j < bitmap.width; j++) {
      if (bitmap.array[i*bitmap.width+j]) {
        lines[linecount] = {id:linecount, type:3, x1:j*scale+x, y1:i*scale+y, x2:j*scale+x+0.001, y2:i*scale+y+0.001, flipped:false, leftExtended:false, rightExtended:false}
        linecount++;
      }
    }
  }
  return lines;
}
//image(bitmapEx, 0, 0);
//image(bitmapEx, 10, -10);
/*
{
"id": 1,
"type": 3,
"x1": 0,
"y1": 0,
"x2": 0.001,
"y2": 0.001,
"flipped": false,
"leftExtended": false,
"rightExtended": false
}
*/
window.onload = function() {
  img = document.getElementById("example");
  //img.src += '?' + new Date().getTime();
  //img.setAttribute('crossOrigin', '');
  ctx.drawImage(img, 0, 0, 100, 100);
  ctx1.drawImage(canvas, 0, 0, 100, 100);
  var d = ctx1.getImageData(0, 0, 1, 1);
}
function makeBitmap(h, w) {
  for (var i = 0; i < h; i++) {
    for (var j = 0; j < w.length; j++) {

    }
  }
}

function arrayAscii(input) {
  var output = []
  for (var i = 0; i < input.length; i++) {
    output[i] = parseInt(input[i]);
  }
  return output;
}
