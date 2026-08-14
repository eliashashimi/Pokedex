const baseUrl = "https://pokeapi.co/api/v2/";
const dialogPkmCardsRef = document.getElementById("dialog");
const pkmCardsRef = document.getElementById("pokemon-card");
const loadMorePkm = 20;
let pkmArray = [];
let allPkm = [];
let evoDataList = [];
let searchedDialogList = [];
let abilities = [];
let saveMorePkm = 0;

async function init() {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.classList.remove("d_none");
    await loadDataApi();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    renderPkmCards();
}

function resetSearchList() {
    searchedDialogList = [];
}

async function loadDataApi() {
    let start = saveMorePkm + 1;
    let end = loadMorePkm + saveMorePkm;
    for (let id = start; id <= end; id++) {
        let response = await fetch(baseUrl + "pokemon/" + `${id}`);
        let responseSpecies = await fetch(baseUrl + "pokemon-species/" + `${id}`);
        let pkmJson = await response.json();
        let pkmJsonSpecies = await responseSpecies.json();
        pkmArray.push(pkmJson, pkmJsonSpecies);
        renderSpecies(pkmJsonSpecies);
    }
    saveMorePkm += loadMorePkm;
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
    if (searchVal === "") {
        resetSearchList();
        return renderPkmCards();
    }
    const isNumber = !isNaN(searchVal);
    if (!isNumber && searchVal.length < 3) return;
    resetSearchList();
    const fullList = await fetchAllPkm();
    const foundPkm = filterPkm(fullList, searchVal);
    loadSearchDetails(foundPkm);
}

function checkEmptySearch() {
    const searchVal = document.getElementById("search-input").value.trim();
    if (searchVal === "") {
        resetSearchList();
        renderPkmCards();
    }
}

function getGlobaleIndex(onePkm) {
    let IndexResult = pkmArray.findIndex((p) => p && p.id === onePkm.id);
    return IndexResult !== -1 ? IndexResult : 0;
}

async function loadSearchDetails(foundPkm) {
    pkmCardsRef.innerHTML = "";
    for (let i = 0; i < foundPkm.length; i++) {
        let pkm = foundPkm[i];
        const urlParts = pkm.url.split("/");
        const pkmId = urlParts[urlParts.length - 2];
        let detailResponse = await fetch(baseUrl + "pokemon/" + pkmId);
        let onePkm = await detailResponse.json();
        const pkmType = onePkm.types[0].type.name;
        const pkmBgColor = typeColors[pkmType] || "#777";
        let pkmtypes = getCardTypesHtml(onePkm);
        let pkmIcons = getPkmIconsHtml(onePkm);
        searchedDialogList.push(onePkm);
        pkmCardsRef.innerHTML += renderPkmCardTemp(onePkm, pkmBgColor, pkmtypes, i, pkmIcons);
    }
}

function renderSpecies(pkmJsonSpecies) {
    const result = pkmJsonSpecies.genera.filter((item) => item.language.name === "en");
    if (result) {
        return result.genus;
    }
}

function getPkmIconsHtml(pokemon) {
    let iconsHtml = "";
    for (let j = 0; j < pokemon.types.length; j++) {
        let t = pokemon.types[j].type;
        let iconUrl = `https://raw.githubusercontent.com/partywhale/pokemon-type-icons/refs/heads/main/icons/${t.name}.svg`;
        iconsHtml += renderPkmIconTemp(t.name, iconUrl);
    }
    return iconsHtml;
}

function getCardTypesHtml(onePkm) {
    let pkmTypes = "";
    for (let j = 0; j < onePkm.types.length; j++) {
        let currentType = onePkm.types[j].type;
        let currentTypeColor = typeColors[currentType.name] || "#777";
        pkmTypes += renderPkmTypeTemp(currentType, currentTypeColor);
    }
    return pkmTypes;
}

async function renderPkmCards() {
    pkmCardsRef.innerHTML = "";
    for (let i = 0; i < pkmArray.length; i += 2) {
        let onePkm = pkmArray[i];
        const pkmType = onePkm.types[0].type.name;
        const pkmBgColor = typeColors[pkmType] || "#777";
        let pkmTypes = getCardTypesHtml(onePkm);
        let pkmIcons = getPkmIconsHtml(onePkm);
        pkmCardsRef.innerHTML += renderPkmCardTemp(onePkm, pkmBgColor, pkmTypes, i, pkmIcons);
    }
    searchedDialogList = pkmArray;
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.classList.remove("d_none");
}

async function loadMorePkmBtn() {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.classList.remove("d_none");
    await loadDataApi();
    renderPkmCards();
}

function getPkmAbilitiesHtml(pkm) {
    abilities = [];
    for (let i = 0; i < pkm.abilities.length; i++) {
        abilities.push(pkm.abilities[i].ability.name);
    }
    return abilities.join(", ");
}

function prepDialogData(index) {
    let clickedPkm = searchedDialogList[index];
    let clickedSpecies = searchedDialogList === pkmArray ? searchedDialogList[index + 1] : null;
    let pkmTypesHtml = getPokemonTypesHtml(clickedPkm);
    let genusText = clickedSpecies ? getEngGenus(clickedSpecies) : "Unknown";
    let abilitiesHtml = getPkmAbilitiesHtml(clickedPkm);
    let catchRate = clickedSpecies ? clickedSpecies.cpature_rate : "Unknown";
    let baseExp = clickedPkm.base_experience || "Unknown";
    return { clickedPkm, pkmTypesHtml, genusText, abilitiesHtml, catchRate, baseExp };
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

function getPokemonStatsHtml(clickedPkm) {
    let statsRowsHtml = "";
    for (let i = 0; i < clickedPkm.stats.length; i++) {
        let s = clickedPkm.stats[i];
        let percent = (s.base_stat / 255) * 100;
        statsRowsHtml += renderSingleStatsRowTemp(s.stat.name, s.base_stat, percent);
    }
    return renderStatsTemp(statsRowsHtml);
}

async function fetchEvoChain(clickedPkm) {
    const speciesUrl = clickedPkm.species.url;
    let speciesResponse = await fetch(speciesUrl);
    let speciesJson = await speciesResponse.json();
    let evoResponse = await fetch(speciesJson.evolution_chain.url);
    let evoJson = await evoResponse.json();
    return evoJson.chain;
}

async function fetchEvoImages(evoNameList) {
    evoDataList = [];
    for (let i = 0; i < evoNameList.length; i++) {
        let name = evoNameList[i];
        let response = await fetch(baseUrl + "pokemon/" + name);
        let pkmJson = await response.json();
        evoDataList.push({
            name: name,
            image: pkmJson.sprites.other["official-artwork"]["front_shiny"],
        });
    }
    return evoDataList;
}

async function getPkmEvoHtml(clickedPkm) {
    let evoHtml = "";
    let evoStep = await fetchEvoChain(clickedPkm);
    let p1 = evoStep ? evoStep.species.name : null;
    let p2 = evoStep?.evolves_to?.[0] ? evoStep.evolves_to[0].species.name : null;
    let p3 = evoStep?.evolves_to?.[0]?.evolves_to?.[0] ? evoStep.evolves_to[0].evolves_to[0].species.name : null;
    let evoNameList = [p1, p2, p3].filter((name) => name != null);
    let evoObjectList = await fetchEvoImages(evoNameList);
    for (let i = 0; i < evoObjectList.length; i++) {
        let pkm = evoObjectList[i];
        evoHtml += renderEvoRowTemp(pkm.name, pkm.image);
    }
    return renderEvoTemp(evoHtml);
}

function openDialog(index, pkmBgColor) {
    dialogPkmCardsRef.innerHTML = "";
    const { clickedPkm, pkmTypesHtml, genusText, abilitiesHtml, catchRate, baseExp } = prepDialogData(index);
    if (!pkmBgColor) {
        const pkmType = clickedPkm.types[0].type.name;
        pkmBgColor = typeColors[pkmType] || "#777";
    }
    dialogPkmCardsRef.innerHTML = openDialogTemp(clickedPkm, pkmTypesHtml, genusText, index, pkmBgColor, abilities, catchRate, baseExp);
    dialogPkmCardsRef.showModal();
    dialogPkmCardsRef.classList.add("active");
}

function closeDialog() {
    dialogPkmCardsRef.close();
    dialogPkmCardsRef.classList.remove("active");
}

function changeDialogPkm(currentIndex, direction) {
    let newIndex = currentIndex;
    let step = searchedDialogList === pkmArray ? 2 : 1;
    if (direction === "next") {
        newIndex += step;
    } else if (direction === "prev") {
        newIndex -= step;
    }
    if (newIndex < 0) {
        newIndex = searchedDialogList.length - step;
    } else if (newIndex >= searchedDialogList.length) {
        newIndex = 0;
    }
    openDialog(newIndex);
}

function updateActiveBtn(tabName) {
    const button = document.querySelectorAll(".tab-btn");
    for (let btn of button) {
        btn.classList.remove("active");
    }
    const activeBtn = document.getElementById("tab-" + tabName);
    if (activeBtn) activeBtn.classList.add("active");
}

async function switchTab(tabName, index) {
    updateActiveBtn(tabName);
    const tabContentRef = document.getElementById("tab-content");
    let clickedPkm = searchedDialogList[index];
    const { genusText, abilities, catchRate, baseExp } = prepDialogData(index);
    if (tabName === "about") {
        tabContentRef.innerHTML = renderAboutTabTemp(clickedPkm, genusText, abilities, catchRate, baseExp);
    } else if (tabName === "stats") {
        tabContentRef.innerHTML = getPokemonStatsHtml(clickedPkm);
    } else if (tabName === "evolution") {
        tabContentRef.innerHTML = await getPkmEvoHtml(clickedPkm);
    } else if (tabName === "shiny") {
        tabContentRef.innerHTML = renderShinyTabTemp(clickedPkm);
    }
}
