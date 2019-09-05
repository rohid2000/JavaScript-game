var speler1 = 'O';
var speler2 = 'X';

var huidigeBeurt = 1;
var gemaakteZet = 0;
var win = false;
var gelijk = false;

var winnaarContainer = $('.einde');
var reset = $('.reset');

var vak = $('.square');

vak.on('click', (e) => {
    if(win) {
        return;
    } if(gelijk) {
        return;
    }

    gemaakteZet++;
    //om te kijken wie z'n beurt het is.
    //als het onbekend is is het speler1's beurt, anders speler 2.
    if (huidigeBeurt % 2 === 1) {
        winnaarContainer.css('display', "block");
        reset.css('display', 'block');
        winnaarContainer.html("Speler 2");
        event.target.innerHTML = speler1;
        event.target.style.color = "blue";
        huidigeBeurt++;

    } else {
        winnaarContainer.css('display', "block");
        reset.css('display', 'block');
        winnaarContainer.html("Speler 1");
        event.target.innerHTML = speler2;
        event.target.style.color = "red";
        huidigeBeurt--;
    }

    if (checkVoorWinnaar()) {
        winnaar = huidigeBeurt == 1 ? speler2 : speler1;
        bepaalWinnaar(winnaar);
        win = true;
    } else {
        if(gemaakteZet > 8) {
            winnaarContainer.css('display', "block");
            winnaarContainer.css('background-color', "darkorange");
            winnaarContainer.css('color', "black");
            reset.css('display', 'block');
            winnaarContainer.html("Gelijkspel");
            gelijk = true;

        }
    }
});

reset.on('click', (e) => {
    var zetten = Array.prototype.slice.call($(".square"));
    zetten.map((m) => {
        m.innerHTML = "";
    });
    winnaarContainer.css('display', "block");
    reset.css('display', 'block');
    winnaarContainer.css('background-color', 'darkblue');
    winnaarContainer.css('color', 'white');
    winnaarContainer.html("Speler 1");
    huidigeBeurt = 1;
    gemaakteZet = 0;
    win = false;
});

function bepaalWinnaar(winner) {
    winnaarContainer.css('display', "block");
    reset.css('display', 'block');
    winner = winner === speler1 ? 'Speler 1' : 'Speler 2';
    winnaarContainer.html(winner + " Wint");
}

function checkVoorWinnaar() {
    if (gemaakteZet > 4) {
        var vak = $('.square');
        //met de call functie, kan een object een methode gebruiken die bij een ander object hoort.
        //hier wordt zetten als methode gebruikt voor de class="square.".
        var zetten = Array.prototype.slice.call($(".square"));
        // de map functie maakt maakt een nieuwe array, met de resultaten van een opgeroepen functie voor elke array op volgorde.
        // in dit geval wordt er een nieuwe array gemaakt met zetten, met de square functie.
        var results = zetten.map(function(square) { return square.innerHTML; });
        var wincombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return wincombos.find(function(combo) {
            // de find functie, stuurt de waarde van de van het eerste element in een array terug dat de voorwaarde passeert.
            if (results[combo[0]] !== "" && results[combo[1]] !== "" && results[combo[2]] !== "" && results[combo[0]] === results[combo[1]] && results[combo[1]] === results[combo[2]]) {
                return true;
            } else {

                return false;
            }
        });
    }
}
