var i;
var karten = [];
for (i = 0; i < 32; i++){
    karten[i] = ["bilder/Bild" + i + ".jpg", "bilder/Bild" + i + ".jpg"];
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
//    ueberpruefeGroesse(obj);
    modulo();
    berechne();
}



function spielkarten(breite, hoehe, menge){
    var spielKartenNach = [];
    var spielKartenVor = karten;
    spielKartenVor.sort(function(a, b){return 0.5 - Math.random()});
    for(i = 0; i < (menge/2); i++){
      spielKartenNach[i] = spielKartenVor[i];
    }
    spielKartenNach.sort(function(a, b){return 0.5 - Math.random()});
    document.getElementById("test").innerHTML = spielKartenNach;
}