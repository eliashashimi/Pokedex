const baseUrl = "https://pokeapi.co/api/v2/";

let pkmArray = [];
let allPkm = [];

const dialogPkmCardsRef = document.getElementById("dialog");
const pkmCardsRef = document.getElementById("pokemon-card");

function init() {
    renderPkmCards();
}

// Daten aus der API laden mit rückgabewert, keine Ausführende Funktion
async function loadDataApi() {
    if (pkmArray.length > 0) return pkmArray;

    for (let id = 1; id <= 6; id++) {
        let response = await fetch(baseUrl + "pokemon/" + `${id}`);
        let responseSpecies = await fetch(baseUrl + "pokemon-species/" + `${id}`);
        let responseEvo = await fetch(baseUrl + "evolution-chain/" + `${id}`);
        let pkmJson = await response.json();
        let pkmJsonSpecies = await responseSpecies.json();
        let pkmJsonEvo = await responseEvo.json();

        pkmArray.push(pkmJson, pkmJsonSpecies, pkmJsonEvo);
        renderSpecies(pkmJsonSpecies);
    }
    return pkmArray;
}

async function fetchAllPkm() {
    if (allPkm.length === 0) {
        let response = await fetch(baseUrl + "pokemon?limit=1351&offset=0");
        let allpkmJson = await response.json();
        allPkm = allpkmJson.results;
    }
    return allPkm;
}

function filterPkm(list, searchVal) {
    return list.filter((pkm) => {
        const matchesName = pkm.name.toLowerCase().includes(searchVal);

        const urlParts = pkm.url.split("/");
        const pkmId = urlParts[urlParts.length - 2];
        const matchesId = pkmId === searchVal;

        return matchesName || matchesId;
    });
}

async function inpSearchPkm() {
    const searchVal = document.getElementById("search-input").value.toLowerCase().trim();

    if (searchVal === "") return renderPkmCards();

    const isNumber = !isNaN(searchVal);

    if (!isNumber && searchVal.length < 3) return;
    const fullList = await fetchAllPkm();
    const foundPkm = filterPkm(fullList, searchVal);

    loadSearchDetails(foundPkm);
}

function checkEmptySearch() {
    const searchVal = document.getElementById("search-input").value.trim();

    if (searchVal === "") {
        renderPkmCards();
    }
}

function getSearchPkmTypesHtml(onePkm) {
    let pkmtypes = "";
    for (let j = 0; j < onePkm.types.length; j++) {
        pkmtypes += renderPkmTypeTemp(onePkm.types[j].type);
    }
    return pkmtypes;
}

function getGlobaleIndex(onePkm) {
    let IndexResult = pkmArray.findIndex((p) => p && p.id === onePkm.id);
    return IndexResult !== -1 ? IndexResult : 0;
}

async function loadSearchDetails(foundPkm) {
    pkmCardsRef.innerHTML = "";

    for (let pkm of foundPkm) {
        const urlParts = pkm.url.split("/");
        const pkmId = urlParts[urlParts.length - 2];
        let detailResponse = await fetch(baseUrl + "pokemon/" + pkmId);
        let onePkm = await detailResponse.json();

        const pkmType = onePkm.types[0].type.name;
        const pkmBgColor = typeColors[pkmType] || "#777";
        let pkmtypes = getSearchPkmTypesHtml(onePkm);
        let globalIndex = getGlobaleIndex(onePkm);

        pkmCardsRef.innerHTML += renderPkmCardTemp(onePkm, pkmBgColor, pkmtypes, globalIndex);
    }
}

function renderSpecies(pkmJsonSpecies) {
    const result = pkmJsonSpecies.genera.filter((item) => item.language.name === "en");

    if (result) {
        return result.genus;
    }
}

async function renderPkmCards() {
    pkmCardsRef.innerHTML = "";
    await loadDataApi();

    for (let i = 0; i < pkmArray.length; i += 3) {
        let onePkm = pkmArray[i];
        const pkmType = onePkm.types[0].type.name;
        const pkmBgColor = typeColors[pkmType] || "#777";

        let pkmtypes = "";
        for (let j = 0; j < onePkm.types.length; j++) {
            pkmtypes += renderPkmTypeTemp(onePkm.types[j].type);
        }
        pkmCardsRef.innerHTML += renderPkmCardTemp(onePkm, pkmBgColor, pkmtypes, i);
    }
}

function prepDialogData(index) {
    let clickedPkm = pkmArray[index];
    let clickedSpecies = pkmArray[index + 1];
    let clickedEvo = pkmArray[index + 2];
    let pkmTypesHtml = getPokemonTypesHtml(clickedPkm);
    let genusText = getEngGenus(clickedSpecies);

    return { clickedPkm, pkmTypesHtml, genusText };
}

function getPokemonTypesHtml(pokemon) {
    let html = "";
    for (let typeEntry of pokemon.types) {
        html += renderPkmTypeTemp(typeEntry.type);
    }
    return html;
}

function getEngGenus(species) {
    for (let item of species.genera) {
        if (item.language.name === "en") {
            return item.genus;
        }
    }
    return "Unknown";
}

function openDialog(index) {
    dialogPkmCardsRef.innerHTML = "";

    const { clickedPkm, pkmTypesHtml, genusText } = prepDialogData(index);
    dialogPkmCardsRef.innerHTML = openDialogTemp(clickedPkm, pkmTypesHtml, genusText, index);

    dialogPkmCardsRef.showModal();
    dialogPkmCardsRef.classList.add("active");
}

function closeDialog() {
    dialogPkmCardsRef.close();
    dialogPkmCardsRef.classList.remove("active");
}

function changeDialogPkm(currentIndex, direction) {
    let newIndex = currentIndex;

    if (direction === "next") {
        newIndex += 3;
    } else if (direction === "prev") {
        newIndex -= 3;
    }
    if (newIndex >= 0 && newIndex < pkmArray.length) {
        openDialog(newIndex);
    }
}
