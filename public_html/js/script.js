/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var pfad = "bilder/";

var image = [
    "Bild1.jpg",
    "Bild2.jpg",
    "Bild3.jpg"
];

//var pfadImage = pfad + image;

var i = 0;

function test() {
    for (i = 0; i < image.length; i++) {
        var pfadImage = pfad + image[i];
        document.getElementById("Karten" + i).src = pfadImage;

    }
}

function masse(){
    
}
