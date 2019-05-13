var url = "http://colormind.io/api/";
var data = {
    model : "default",
    input : ["N","N","N","N","N"]
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

var http = new XMLHttpRequest();

http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
        var palette = JSON.parse(http.responseText).result;
        // shuffle(palette);
        console.log(palette);

        var bg = document.getElementById("multicolor");
        console.log("50vh solid #" + rgbToHex(palette[0][0]) + rgbToHex(palette[0][1]) + rgbToHex(palette[0][2]));
        bg.style["border-top"] = "50vh solid #" + rgbToHex(palette[1][0]) + rgbToHex(palette[1][1]) + rgbToHex(palette[1][2]);
        bg.style["border-bottom"] = "50vh solid #" + rgbToHex(palette[2][0]) + rgbToHex(palette[2][1]) + rgbToHex(palette[2][2]);
        bg.style["border-left"] = "50vw solid #" + rgbToHex(palette[3][0]) + rgbToHex(palette[3][1]) + rgbToHex(palette[3][2]);
        bg.style["border-right"] = "50vw solid #" + rgbToHex(palette[4][0]) + rgbToHex(palette[4][1]) + rgbToHex(palette[4][2]);
        $("#multicolor").fadeIn(1000);

        var elements = document.getElementsByClassName("fa-circle");
        var newcolor = "#" + rgbToHex(palette[0][0]) + rgbToHex(palette[0][1]) + rgbToHex(palette[0][2]);
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.color = newcolor;
        }
        $("b").css("color", newcolor);
    }
}

http.open("POST", url, true);
http.send(JSON.stringify(data));

// [[42, 41, 48], [90, 83, 84], [191, 157, 175], [188, 138, 125], [215, 170, 66]]
// note that the input colors have changed as well, by a small amount