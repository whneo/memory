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

function ueberpruefeGroesse(feld){
    if (feld.value < 3){
        alert("Bitte geben sie einen Wert größer als 2 ein!");
    }
}
function berechne(){
    var feld_a = document.getElementById("breite").value;
    var feld_b = document.getElementById("hoehe").value;
    var ergebnis = feld_a * feld_b;
    if (ergebnis > 64){
        alert("Es dürfen Max. 64 Spielfelder erzeugt werden!")
    }
    document.getElementById("anzahl").value = ergebnis;
}

function modulo(){
    var feld_a = document.getElementById("breite").value;
    var feld_b = document.getElementById("hoehe").value;
    if (feld_a % 2 == 1 && feld_b % 2 == 1){
        alert("Breite und Höhe dürfen nicht beide ungerade Werte haben!");
    }
}

function spielBedingung(obj){
    ueberpruefeGroesse(obj);
    modulo();
    berechne();
}
