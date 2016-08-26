var i;
var j;
var computerPunkte;
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
var hirnVolumen;
var hirnInhalt;
var computerHirn = [];
var entfernteSpielkarten = [];
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
    var begin = '<div id="spielFlaecheIn"><div id="kartenFeld" style="width: ' + (spielfeldBreite * 100 + 2) + 'px; height: ' + (spielfeldHoehe * 100) + 'px">';
    var end = '</div>';
    var displaySpieler = '<div class="displayRahmen"><div class="display"><p id="spieler">' + spielerName + ':<input class="breite" id="spielerPunkte" type="text" readonly="" /></p></div>';
    var displayComputer = '<div class="display">Computer: <input class="breite" id="computerPunkte" type="text" readonly="" /></div></div>';
    var output = '';
    for (i = 0; i < spielkartenRunde.length; i++) {
        output += '<div id="karte' + i + '" class="karten" style="background: url(' + spielkartenRunde[i] + '); background-size: 80px 80px"></div>';
    }
    hirnVolumen = (spielkartenRunde.length / 5).toFixed(0);
    speicherErsteKartenImHirn();
    document.getElementById('spielFlaeche').innerHTML = begin + output + end + displaySpieler + displayComputer + end;
    spielLaufzeit = spielkartenRunde.length / 2;
    window.setTimeout(alleSpielkartenVerdecken, spielkartenRunde.length * 100);
}

function alleSpielkartenVerdecken() {
    for (i = 0; i < spielfeldFlaeche; i++) {
        document.getElementById('karte' + i).style.background = "url('./bilder/BildHintergrund.jpg')";
        document.getElementById('karte' + i).style.backgroundSize = "80px 80px";
    }
    spielerIstDran();
}

function falscheSpielkartenVerdecken() {
    document.getElementById(kartenId1).style.background = "url('./bilder/BildHintergrund.jpg')";
    document.getElementById(kartenId1).style.backgroundSize = "80px 80px";
    document.getElementById(kartenId2).style.background = "url('./bilder/BildHintergrund.jpg')";
    document.getElementById(kartenId2).style.backgroundSize = "80px 80px";
    kartenId1 = -1;
    kartenId2 = -2;
    onclickStart();
}

function karteWaehlen(obj) {
    var id = obj.id;
    var newId = id.slice(5);
    if (kartenId1 !== id) {
        if (gewaehlteKarten === 0) {
            kartenId1 = id;
            karte1 = spielkartenRunde[newId];
            gewaehlteKarten += 1;
            tauscheKarteImHirn(kartenId1, karte1);
            document.getElementById(obj.id).style.background = "url('" + spielkartenRunde[newId] + "')";
            document.getElementById(obj.id).style.backgroundSize = "80px 80px";
        } else if (gewaehlteKarten === 1) {
            for (i = 0; i < spielfeldFlaeche; i++) {
                document.getElementById('karte' + i).onclick = "";
            }
            kartenId2 = id;
            karte2 = spielkartenRunde[newId];
            tauscheKarteImHirn(kartenId2, karte2);
            document.getElementById(obj.id).style.background = "url('" + spielkartenRunde[newId] + "')";
            document.getElementById(obj.id).style.backgroundSize = "80px 80px";
            window.setTimeout(pruefe, 100);
        }
    }
}

function pruefe() {
    if (karte1 === karte2) {
        entfernteSpielkarten.push(kartenId1, kartenId2);
        loescheRichtigeKartenAusHirn();
        gewaehlteKarten = 0;
        spielLaufzeit--;
        laufzeitCheck();
        window.setTimeout(kartenEntfernen, 250);
    } else {
        gewaehlteKarten = 0;
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
    document.getElementById("spielFlaeche").innerHTML = '<form><table border="1"><thead><tr><th colspan="4">Geben Sie die Breit und Höhe für das Spielfeld an.<br>Max Anzahl Spielfelder ist 64!</th></tr></thead><tbody id="Feld1"><tr><td class="tdStart">Breite: </td><td class="tdStart"><input class="breite" id="spielfeldBreite"  min="3" onchange="berechneSpielfeldFlaeche()" required="" type="number"  /></td><td class="tdStart"> </td><td class="tdStart"><button style="width: 100%" type="button" onclick="spielkonfigurationLaden()">Erstelle Spielfeld</button></td></tr><tr><td class="tdStart">Höhe:</td><td class="tdStart"><input class="breite" id="spielfeldHoehe" min="3" onchange="berechneSpielfeldFlaeche()" type="number" required="" /></td><td class="tdStart"></td><td class="tdStart"><button id="startButton" style="width: 100%" type="button">Start</button></td></tr><tr><td class="tdStart">Spieler: </td><td class="tdStart"><input class="breite" id="spielerName" onchange="berechneSpielfeldFlaeche()" type="text" required="" /></td><td class="tdStart">Anzahl Felder:</td><td class="tdStart"><input id="spielfeldFlaeche" type="text" readonly="readonly" /></td></tr></tbody></table></form>';
}

function speicherErsteKartenImHirn() {
    for (i = 0; i < hirnVolumen; i++) {
        var random = Math.floor(Math.random() * spielkartenRunde.length);
        computerHirn[i] = ["karte" + random, spielkartenRunde[random]];
    }
    hirnInhalt = hirnVolumen;
}

function loescheRichtigeKartenAusHirn() {
    for (j = 0; j < 2; j++) {
        for (i = 0; i < hirnVolumen; i++) {
            if (computerHirn[i][1] === karte1 || computerHirn[i][1] === karte2) {
                computerHirn = computerHirn.slice(0, i).concat(computerHirn.slice(i + 1));
                hirnInhalt--;
                computerHirn[computerHirn.length] = ["", ""];
            }
        }
    }
}

function tauscheKarteImHirn(kartenId, karte) {
    var austausch = true;
    for (i = 0; i < hirnVolumen; i++) {
        if (computerHirn[i][0] === kartenId && computerHirn[i][1] === karte) {
            austausch = false;
        }
    }
    if (austausch === true) {
        if (hirnInhalt < hirnVolumen) {
            computerHirn[hirnInhalt][0] = kartenId;
            computerHirn[hirnInhalt][1] = karte;
            hirnInhalt++;
        } else {
            computerHirn[hirnInhalt - 1][0] = kartenId;
            computerHirn[hirnInhalt - 1][1] = karte;
        }
    }
    if (hirnInhalt === hirnVolumen) {
        computerHirn.sort(function () {
            return 0.5 - Math.random();
        });
    }
}

function spielerIstDran() {
    for (i = 0; i < spielfeldFlaeche; i++) {
        document.getElementById('karte' + i).onclick = function () {
            karteWaehlen(this);
        };
    }
}

function onclickStart() {
    alert(entfernteSpielkarten);
    var check = true;
    for (i = 0; i < spielfeldFlaeche; i++) {
        for (j = 0; j < entfernteSpielkarten.length; j++) {
            if ("karte" + i === entfernteSpielkarten[j]) {
                check = false;
                break;
            }
        }
        if (check === true) {
            document.getElementById('karte' + i).onclick = function () {
                karteWaehlen(this);
            };
        } else {
            document.getElementById('karte' + i).onclick = "";
            document.getElementById('karte' + i).style.cursor = "default";
        }
        check = true;
    }
}

function kartenEntfernen() {
    document.getElementById(kartenId1).style.background = "url('./bilder/BildTransparent.gif')";
    document.getElementById(kartenId1).style.border = "none";
    document.getElementById(kartenId2).style.background = "url('./bilder/BildTransparent.gif')";
    document.getElementById(kartenId2).style.border = "none";
    kartenId1 = -1;
    kartenId2 = -2;
    onclickStart();
}