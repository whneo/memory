var i;
var gewaehlteKarten = 0;
var karte1;
var karte2;
var kartenId1;
var kartenId2;
var spielfeldBreite;
var spielfeldHoehe;
var spielfeldFlaeche;
var spielkartenGesamt = [];
var spielkartenRunde = [];

function berechneSpielfeldFlaeche() {
    spielfeldBreite = document.getElementById("spielfeldBreite").value;
    spielfeldHoehe = document.getElementById("spielfeldHoehe").value;
    spielfeldFlaeche = spielfeldBreite * spielfeldHoehe;
    document.getElementById("spielfeldFlaeche").value = spielfeldFlaeche;
}

function spielkonfigurationLaden() {
    berechneSpielfeldFlaeche();
    if ((spielfeldBreite % 2 === 1 && spielfeldHoehe % 2 === 1) && spielfeldFlaeche > 64) {
        eingabeLoeschen();
        alert("Breite und Höhe dürfen nicht beide ungerade sein! \n \n Es dürfen max. 64 Spielfelder erzeugt werden!");
    } else if (spielfeldBreite % 2 === 1 && spielfeldHoehe % 2 === 1) {
        eingabeLoeschen();
        alert("Breite und Höhe dürfen nicht beide ungerade sein!");
    } else if (spielfeldFlaeche > 64) {
        eingabeLoeschen();
        alert("Es dürfen max. 64 Spielfelder erzeugt werden!");
    } else {
        for (i = 0; i < 32; i++) {
            spielkartenGesamt[i] = "./bilder/Bild" + i + ".jpg";
        }
        document.getElementById("startButton").onclick = spielfeldErstellen;
        document.getElementById("spielfeldBreite").oninput = eingabeLoeschen;
        document.getElementById("spielfeldHoehe").oninput = eingabeLoeschen;
    }
}

function spielkartenErstellen() {
    spielkartenGesamt.sort(function () {
        return 0.5 - Math.random();
    });
    for (i = 0; i < (spielfeldFlaeche / 2); i++) {
        spielkartenRunde[i] = spielkartenGesamt[i];
        spielkartenRunde[spielfeldFlaeche / 2 + i] = spielkartenGesamt[i];
    }
    spielkartenRunde.sort(function () {
        return 0.5 - Math.random();
    });
//    document.getElementById("spielfeld").innerHTML = spielkartenRunde;
//    alert("Breite: " + spielfeldBreite + "\n Höhe: " + spielfeldHoehe + "\n Spielfelder: " + spielfeldFlaeche);
}

function eingabeLoeschen() {
    spielfeldBreite = 0;
    spielfeldHoehe = 0;
    spielfeldFlaeche = 0;
    document.getElementById("startButton").onclick = "";
}

function spielfeldErstellen() {
    spielkartenErstellen();
    var begin = '<div id="container" style="width: ' + (spielfeldBreite * 100 + 2) + 'px; height: ' + (spielfeldHoehe * 100) + 'px">';
    var end = '</div>';
    var output = '';
    for (i = 0; i < spielkartenRunde.length; i++) {
        output += '<div id="karte' + i + '" class="Karten0" style="background: url(' + spielkartenRunde[i] + '); background-size: 80px 80px"></div>';
    }
    document.getElementById('spielfeld').innerHTML = begin + output + end;
    window.setTimeout(alleSpielkartenVerdecken, spielkartenRunde.length * 100);
}

function alleSpielkartenVerdecken() {
    for (i = 0; i < spielfeldFlaeche; i++) {
        document.getElementById('karte' + i).style.background = "url('./bilder/BildHintergrund.jpg')";
        document.getElementById('karte' + i).style.backgroundSize = "80px 80px";
        document.getElementById('karte' + i).onclick = function () {
            DoSomething(this);
        };
    }
}

function falscheSpielkartenVerdecken() {
    document.getElementById(kartenId1).style.background = "url('./bilder/BildHintergrund.jpg')";
    document.getElementById(kartenId1).style.backgroundSize = "80px 80px";
    document.getElementById(kartenId2).style.background = "url('./bilder/BildHintergrund.jpg')";
    document.getElementById(kartenId2).style.backgroundSize = "80px 80px";
    for (i = 0; i < spielfeldFlaeche; i++) {
        document.getElementById('karte' + i).onclick = function () {
            DoSomething(this);
        };
    }
}

function DoSomething(obj) {
    karteWaehlen(obj);
}

function karteWaehlen(obj) {
    var id = obj.id;
    var newId = id.slice(5);
    if (gewaehlteKarten === 0) {
        kartenId1 = id;
        karte1 = spielkartenRunde[newId];
        gewaehlteKarten += 1;
        document.getElementById(obj.id).style.background = "url('" + spielkartenRunde[newId] + "')";
        document.getElementById(obj.id).style.backgroundSize = "80px 80px";
    } else if (gewaehlteKarten === 1) {
        kartenId2 = id;
        karte2 = spielkartenRunde[newId];
        document.getElementById(obj.id).style.background = "url('" + spielkartenRunde[newId] + "')";
        document.getElementById(obj.id).style.backgroundSize = "80px 80px";
        pruefe();
    }
}

function pruefe() {
    if (karte1 === karte2) {
        gewaehlteKarten = 0;
    } else {
        gewaehlteKarten = 0;
        for (i = 0; i < spielfeldFlaeche; i++) {
            document.getElementById('karte' + i).onclick = "";
        }
        window.setTimeout(falscheSpielkartenVerdecken, 1500);
    }
}