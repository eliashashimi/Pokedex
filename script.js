const baseUrl = "https://pokeapi.co/api/v2/";

let pkmArray = [];

function init() {
    renderPkmCards();
}

// Daten aus der API laden mit rückgabewert, keine Ausführende Funktion
async function loadDataApi() {
    for (let id = 1; id <= 3; id++) {
        let response = await fetch(baseUrl + "pokemon/" + `${id}`);
        let pkmJson = await response.json();

        pkmArray.push(pkmJson);
        console.log(pkmArray);
    }
    return pkmArray;
}

// Daten werden aus der oberen function durch den rückgabewert hier eingefügt und genutzt
// und auch in der Template
async function renderPkmCards() {
    const pkmCardsRef = document.getElementById("pokemon-card");
    pkmCardsRef.innerHTML = "";

    // Die Antwort der Funktion in Vaiable, da der Rückgabewert in dieser Funktion benötigt wird
    let pkmData = await loadDataApi();

    for (let i = 0; i < pkmData.length; i++) {
        let onePkm = pkmArray[i];

        const pkmType = onePkm.types[0].type.name;
        const pkmBgColor = typeColors[pkmType];

        pkmCardsRef.innerHTML += renderPkmCardTemp(onePkm, pkmBgColor);
    }
}

function renderDialogPkmCards() {
    const dialogPkmCardsRef = document.getElementById;
    dialogPkmCardsRef.innerHTML = "";
}
