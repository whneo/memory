var i;
var j;
var computerPunkte;
var computerZug = false;
var spielerZug = false;
var spielerPunkte;
var spielerName;
var gewaehlteKarten = 0;
var spielLaufzeit;
var karte1;
var karte2;
var kartenId1;
var kartenId2;
var spielfeldBreite;
var spielfeldHoehe;
var spielfeldFlaeche;
var computerHirn = [];
var spielkartenRunde = [];
var spielkartenGesamt = [];

for (i = 0; i < 32; i++) {
    spielkartenGesamt[i] = "./bilder/Bild" + i + ".jpg";
}

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
        document.getElementById("startButton").onclick = spielfeldErstellen;
        document.getElementById("spielfeldBreite").oninput = eingabeLoeschen;
        document.getElementById("spielfeldHoehe").oninput = eingabeLoeschen;
        document.getElementById("spielerName").oninput = eingabeLoeschen;
    }
    spielerName = document.getElementById("spielerName").value;
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
}

function eingabeLoeschen() {
    spielfeldBreite = 0;
    spielfeldHoehe = 0;
    spielfeldFlaeche = 0;
    spielerName = "";
    document.getElementById("startButton").onclick = "";
}

function spielfeldErstellen() {
    spielkartenErstellen();
    var begin = '<div id="kartenFeld" style="width: ' + (spielfeldBreite * 100 + 2) + 'px; height: ' + (spielfeldHoehe * 100) + 'px">';
    var end = '</div>';
    var displaySpieler = '<div class="displayRahmen"><div class="display"><p id="spieler">' + spielerName + ':</p><input class="breite" id="spielerPunkte" type="text" readonly="" /></div>'
    var displayComputer = '<div class="display">Computer: <input class="breite" id="computerPunkte" type="text" readonly="" /></div>'
    var output = '';
    for (i = 0; i < spielkartenRunde.length; i++) {
        output += '<div id="karte' + i + '" class="karten" style="background: url(' + spielkartenRunde[i] + '); background-size: 80px 80px"></div>';
    }
    speicherErsteKartenImHirn();
    document.getElementById('spielFlaeche').innerHTML = begin + output + end + displaySpieler + displayComputer + end;
    spielLaufzeit = spielkartenRunde.length / 2;
    window.setTimeout(alleSpielkartenVerdecken, spielkartenRunde.length * 100);
}

function alleSpielkartenVerdecken() {
    for (i = 0; i < spielfeldFlaeche; i++) {
        document.getElementById('karte' + i).style.background = "url('./bilder/BildHintergrund.jpg')";
        document.getElementById('karte' + i).style.backgroundSize = "80px 80px";
        document.getElementById('karte' + i).onclick = function () {
            karteWaehlen(this);
        };
    }
    spielerZug = true;
}

function falscheSpielkartenVerdecken() {
    document.getElementById(kartenId1).style.background = "url('./bilder/BildHintergrund.jpg')";
    document.getElementById(kartenId1).style.backgroundSize = "80px 80px";
    document.getElementById(kartenId2).style.background = "url('./bilder/BildHintergrund.jpg')";
    document.getElementById(kartenId2).style.backgroundSize = "80px 80px";
    for (i = 0; i < spielfeldFlaeche; i++) {
        document.getElementById('karte' + i).onclick = function () {
            karteWaehlen(this);
        };
    }
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
        loescheRichtigeKartenAusHirn(karte1, karte2);
        gewaehlteKarten = 0;
        spielLaufzeit--;
        laufzeitCheck();
    } else {
        gewaehlteKarten = 0;
//        tauscheKartenImHirn();
        for (i = 0; i < spielfeldFlaeche; i++) {
            document.getElementById('karte' + i).onclick = "";
        }
        window.setTimeout(falscheSpielkartenVerdecken, 1500);
    }
}

function laufzeitCheck() {
    if (spielLaufzeit === 0) {
        alert("Sie haben das Spiel gewonnen");
        window.setTimeout(neuesSpiel, 1500);
    }
}

function neuesSpiel() {
    document.getElementById("spielFlaeche").innerHTML = '<form><table border="1"><thead><tr><th colspan="4">Geben Sie die Breit und Höhe für das Spielfeld an.<br>Max Anzahl Spielfelder ist 64!</th></tr></thead><tbody id="Feld1"><tr><td class="tdStart">Breite: </td><td class="tdStart"><input class="breite" id="spielfeldBreite"  min="3" onchange="berechneSpielfeldFlaeche()" required="" type="number"  /></td><td class="tdStart"> </td><td class="tdStart"><button style="width: 140px" type="button" onclick="spielkonfigurationLaden()">Erstelle Spielfeld</button></td></tr><tr><td class="tdStart">Höhe:</td><td class="tdStart"><input class="breite" id="spielfeldHoehe" min="3" onchange="berechneSpielfeldFlaeche()" type="number" required="" /></td><td class="tdStart"></td><td class="tdStart"><button id="startButton" style="width: 100%" type="button">Start</button></td></tr><tr><td class="tdStart">Spieler: </td><td class="tdStart"><input class="breite" id="spielerName" onchange="berechneSpielfeldFlaeche()" type="text" required="" /></td><td class="tdStart">Anzahl Felder:</td><td class="tdStart"><input id="spielfeldFlaeche" type="text" readonly="readonly" /></td></tr></tbody></table></form>';
}

function speicherErsteKartenImHirn() {
    for (i = 0; i < (spielkartenRunde.length / 5).toFixed(0); i++) {
        var random = Math.floor(Math.random() * spielkartenRunde.length);
        computerHirn[i] = ["karte" + random, spielkartenRunde[random]];
    }
//    alert("erste karten \n" + computerHirn);
}

function loescheRichtigeKartenAusHirn(karte1, karte2) {
    for (j = 0; j < 2; j++) {
        for (i = 0; i < computerHirn.length; i++) {
            if (computerHirn[i][1] === karte1 || computerHirn[i][1] === karte2) {
                computerHirn = computerHirn.slice(0, i).concat(computerHirn.slice(i + 1));
            }
        }
    }
//    alert("match gelöscht \n" + computerHirn);
}

//function tauscheKartenImHirn() {
//    var id1 = -1;
//    var id2 = -1;
//    var tauschen1 = true;
//    var tauschen2 = true;
//    var neuesHirn = [];
//    for (i = 0; i < computerHirn.length; i++) {
//        if (computerHirn[i][0] === kartenId1 && computerHirn[i][1] === karte1) {
//            tauschen1 = false;
//            id1 = i;
//        } else if (computerHirn[i][0] === kartenId2 && computerHirn[i][1] === karte2) {
//            tauschen2 = false;
//            id2 = i;
//        }
//    }
//    alert(id1 + " " + id2 + "\n" + computerHirn);
//    if (id1 !== -1) {
//        computerHirn = computerHirn.slice(0, id1).concat(computerHirn.slice(id1 + 1));
//    }
//    alert("nach " + id1 + "\n" + computerHirn);
//    if (id2 !== -1) {
//        if (computerHirn.length === 1) {
//            computerHirn[0][0] = kartenId1;
//            computerHirn[0][1] = karte1;
//            computerHirn[1][0] = kartenId2;
//            computerHirn[1][1] = karte2;
//        } else {
//            computerHirn = computerHirn.slice(0, id2).concat(computerHirn.slice(id2 + 1));
//        }
//    }
//    alert("nach " + id2 + "\n" + computerHirn);
//
//    if (tauschen1 === true && tauschen2 === true) {
//        var x = computerHirn.length;
//        computerHirn[x - 1][0] = kartenId1;
//        computerHirn[x - 1][1] = karte1;
//        computerHirn[x - 2][0] = kartenId2;
//        computerHirn[x - 2][1] = karte2;
//        alert(tauschen1 + " " + tauschen2 + "\n" + computerHirn);
//    } else if (tauschen1 === true && tauschen2 === false) {
//        var x = computerHirn.length;
//        computerHirn[x - 1][0] = kartenId1;
//        computerHirn[x - 1][1] = karte1;
//        computerHirn[x + 1][0] = kartenId2;
//        computerHirn[x + 1][1] = karte2;
//        alert(tauschen1 + " " + tauschen2 + "\n" + computerHirn);
//    } else if (tauschen1 === false && tauschen2 === true) {
//        var x = computerHirn.length;
//        computerHirn[x + 1][0] = kartenId1;
//        computerHirn[x + 1][1] = karte1;
//        computerHirn[x - 1][0] = kartenId2;
//        computerHirn[x - 1][1] = karte2;
//        alert(tauschen1 + " " + tauschen2 + "\n" + computerHirn);
//    }
//    alert("neue karten gemerkt \n" + computerHirn);
//}