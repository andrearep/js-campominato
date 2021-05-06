//inserire in modo casuale 10 mine su 100 caselle
function randomNum(min, max) {
    return Math.ceil(Math.random() * (max - min) * min);
}
var bombe = []

while (bombe.length < 10) {
    numero = randomNum(1, 100);
    if (!bombe.includes(numero)) {
        bombe.push(numero);
    }
}

bombe.sort(function (a, b) { return a - b });
console.log(bombe);

//inseriamo nel campo minato un array di array con come primo valore il valore nella griglia e nel secondo quante bombe ha vicino
var campoMinato = [];
for (var i = 0; i < 100; i++) {
    campoMinato.push([i, 0])
}


//inseriamo le bombe nel campo minato
//Le bombe sono piazzate con 0
for (i = 0; i < bombe.length; i++) {
    campoMinato[bombe[(i)]][1] = 1000;
}

//aggiungiamo un le caselle limitrofe
for (var i = 0; i < bombe.length; i++) {
    var numeriLimitrofi = nearNumber(bombe[i]);

    for (var j = 0; j < numeriLimitrofi.length; j++) {
        campoMinato[numeriLimitrofi[j]][1] += 1;
    }
}
console.log(campoMinato);



function nearNumber(number) {
    var array = [];

    if (number > 9 && number < 90 && number % 10 != 0 && (number - 9) % 10 != 0) {
        array.push(number - 11);
        array.push(number - 10);
        array.push(number - 9);
        array.push(number - 1);
        array.push(number + 1);
        array.push(number + 9);
        array.push(number + 10);
        array.push(number + 11);
    } else if (number == 0) {
        array.push(number + 1);
        array.push(number + 10);
        array.push(number + 11);
    } else if (number == 99) {
        array.push(number - 1);
        array.push(number - 10);
        array.push(number - 11);
    } else if (number == 9) {
        array.push(number + 9);
        array.push(number - 1);
        array.push(number + 10);
    } else if (number == 90) {
        array.push(number - 9);
        array.push(number + 1);
        array.push(number - 10);
    } else if (number > 90) {
        array.push(number - 1);
        array.push(number + 1);
        array.push(number - 9);
        array.push(number - 10);
        array.push(number - 11);
    } else if (number < 9) {
        array.push(number - 1);
        array.push(number + 1);
        array.push(number + 9);
        array.push(number + 10);
        array.push(number + 11);
    } else if (number % 10 != 0) {
        array.push(number - 10);
        array.push(number - 9);
        array.push(number + 1);
        array.push(number + 10);
        array.push(number + 11);
    } else if ((number - 9) % 10 != 0) {
        array.push(number - 11);
        array.push(number - 10);
        array.push(number - 1);
        array.push(number + 9);
        array.push(number + 10);
    }
    return array;
}
var prova = nearNumber(50);
console.log(prova);
// mettiamo gli id all'interno delle card
var cardsElement = document.querySelectorAll('.card');

// Set their ids
for (var i = 0; i < cardsElement.length; i++) {
    cardsElement[i].id = i;
}

//inseriamo i valori nelle varie caselle
for (var i = 0; i < 100; i++) {
    if (campoMinato[i][1] != 0 && campoMinato[i][1] < 10) {
        cardsElement[i].querySelector("span").innerHTML = campoMinato[i][1]
    } else if (campoMinato[i][1] > 100) {
        cardsElement[i].querySelector("span").innerHTML = "BOMBA"
    }
}
//al click la casella si deve girare e in caso di bomba deve dare il GAME OVER



window.onclick = e => {
    var element = e.target;
    console.log(element);  // to get the element tag name alone
    console.log(typeof (element));
    element.style.backgroundColor = "blue";
    element.querySelector(".display_none").style.visibility = "visible";
    var valoreCella = element.querySelector(".display_none").innerHTML;
    if (valoreCella == "BOMBA") {
        alert("GAME OVER");
        return false;
    }
    return true;
}


