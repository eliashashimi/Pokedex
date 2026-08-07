const baseUrl = "https://pokeapi.co/api/v2/";

let pkmArray = [];

const dialogPkmCardsRef = document.getElementById("dialog");
const pkmCardsRef = document.getElementById("pokemon-card");

function init() {
    renderPkmCards();
}

// Daten aus der API laden mit rückgabewert, keine Ausführende Funktion
async function loadDataApi() {
    for (let id = 1; id <= 9; id++) {
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
    pkmCardsRef.innerHTML = "";

    // Die Antwort der Funktion in Variable, da der Rückgabewert in dieser Funktion benötigt wird
    let pkmData = await loadDataApi();

    for (let i = 0; i < pkmData.length; i++) {
        let onePkm = pkmArray[i];

        const pkmType = onePkm.types[0].type.name;
        const pkmBgColor = typeColors[pkmType] || "#777";

        const typesHtml = renderPkmTypeTemp(onePkm);

        pkmCardsRef.innerHTML += renderPkmCardTemp(onePkm, pkmBgColor, typesHtml, i);
    }
}

function openDialog(index) {
    dialogPkmCardsRef.innerHTML = "";

    let clickedPkm = pkmArray[index];
    dialogPkmCardsRef.innerHTML = openDialogTemp(clickedPkm);

    dialogPkmCardsRef.showModal();
    dialogPkmCardsRef.classList.add("active");
}

function closeDialog() {
    dialogPkmCardsRef.close();
    dialogPkmCardsRef.classList.remove("active");
}
