function renderPkmTypeTemp(type) {
    return `<span class="type-badge ${type.name}">${type.name}</span>`;
}

function renderPkmCardTemp(onePkm, pkmBgColor, pkmtypes, i) {
    return /*html*/ `
        <button id="card${i}" class="pkm-card" onclick="openDialog(${i}, '${pkmBgColor}')" style="background-color: ${pkmBgColor}">
            <div class="pkm-card-nameid">
                <h3>${onePkm.name}</h3>
                <p>#${onePkm.id}</p>
            </div>
            <div class="pkm-types-name">
                ${pkmtypes}
            </div>
            <img id="card-image${i}" src="${onePkm.sprites.other["official-artwork"].front_shiny}" alt="onePkm.name">
        </button>
    `;
}

function openDialogTemp(clickedPkm, pkmTypesHtml, genusText, index, pkmBgColor) {
    return /*html*/ `
        <section id="overlay-dialog-name" class="overlay-dialog-name" onclick="event.stopPropagation()" style="background-color: ${pkmBgColor}">
            <button id="exit-btn"  onclick="closeDialog()"><img src="./assets/icons/arrow-left.svg" alt=""></button>
            <div>
                <h3>${clickedPkm.name}</h3>
                <p>#${clickedPkm.id}</p>
            </div>
            <div>
                ${pkmTypesHtml}
            </div>
            <div>
            <img src="${clickedPkm.sprites.other["official-artwork"].front_shiny}" alt="onePkm.name">
            </div>
            <div class="dialog-tabs">
                <button id="tab-about" class="tab-btn active" onclick="switchTab('about', ${index})">About</button>
                <button id="tab-stats" class="tab-btn" onclick="switchTab('stats', ${index})">Base Stats</button>
                <button id="tab-evolution" class="tab-btn" onclick="switchTab('evolution', ${index})">Evolution</button>
                <button id="tab-shiny" class="tab-btn" onclick="switchTab('shiny', ${index})">Shiny</button>
            </div>
            <div class="tab-content-container" id="tab-content">
                ${renderAboutTabTemp(clickedPkm, genusText)}
            </div>
            <div>
                <button class="prev btn" id="prev-button" onclick="changeDialogPkm(${index}, 'prev')">prev</button>
                <button class="next btn" id="next-button" onclick="changeDialogPkm(${index}, 'next')">next</button>
            </div>            
        </section>
    `;
}

function renderAboutTabTemp(onePkm, genusText) {
    return /*html*/ `
        <div class="tab-category">
            <table>
                <tr>
                    <th>Species</th>
                    <td>${genusText}</td>
                </tr>
                <tr>
                    <th>Height:</th>
                    <td>${onePkm.height / 10} m</td>
                </tr>
                <tr>
                    <th>weight</th>
                    <td>${onePkm.weight / 10} kg</td>
                </tr>
            </table>
        </div>
    `;
}

function renderStatsTemp(statsRowsHtml) {
    return /*html*/ `
        <div class="tab-category">
            ${statsRowsHtml}
        </div>
    `;
}

function renderSingleStatsRowTemp(statName, baseStat) {
    return /*html*/ `
        <div class="stats-row">
            <span class="stats-name">${statName.toUpperCase()}:</span>
            <span class="stats-value">${baseStat}</span>
        </div>
    `;
}

function renderEvoTemp(evoHtml) {
    return /*html*/ `
        <div class="tab-category">
            <div class="evolution-list">
                ${evoHtml}
            </div>
        </div>
    `;
}

function renderEvoRowTemp(evoName) {
    return /*html*/ `
        <div class="evo-row">
            <span class="evo-pkm-name">${evoName.toUpperCase()}</span>
        </div>
    `;
}
