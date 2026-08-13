function renderPkmTypeTemp(type) {
    return `<span class="type-badge ${type.name}">${type.name}</span>`;
}

function renderPkmCardTemp(onePkm, pkmBgColor, pkmtypes, i) {
    return /*html*/ `
        <button id="card${i}" class="pkm-card" onclick="openDialog(${i}, '${pkmBgColor}')" style="background-color: ${pkmBgColor}">
            <div class="pkm-card-nameid">
                <h3>${onePkm.name.toUpperCase()}</h3>
                <p>#${onePkm.id}</p>
            </div>
            <div class="pkm-types-name">
                ${pkmtypes.toUpperCase()}
            </div>
            <img id="card-image${i}" src="${onePkm.sprites.other["official-artwork"].front_shiny}" alt="onePkm.name">
        </button>
    `;
}

function openDialogTemp(clickedPkm, pkmTypesHtml, genusText, index, pkmBgColor, abilitiesHtml, catchRate, baseExp) {
    return /*html*/ `
        <section id="overlay-dialog-name" class="overlay-dialog-name" onclick="event.stopPropagation()" style="background-color: ${pkmBgColor}">
            <button id="exit-btn"  onclick="closeDialog()"><img src="./assets/icons/arrow-left.svg" alt=""></button>
            <div>
                <h3>${clickedPkm.name.toUpperCase()}</h3>
                <p>#${clickedPkm.id}</p>
            </div>
            <div>
                ${pkmTypesHtml.toUpperCase()}
            </div>
            <div>
            <img class="dialog-img" src="${clickedPkm.sprites.other["official-artwork"].front_shiny}" alt="onePkm.name">
            </div>
            <div class="dialog-tabs">
                <button id="tab-about" class="tab-btn active" onclick="switchTab('about', ${index})">About</button>
                <button id="tab-stats" class="tab-btn" onclick="switchTab('stats', ${index})">Base Stats</button>
                <button id="tab-evolution" class="tab-btn" onclick="switchTab('evolution', ${index})">Evolution</button>
                <button id="tab-shiny" class="tab-btn" onclick="switchTab('shiny', ${index})">Shiny</button>
            </div>
            <div class="tab-content-container" id="tab-content">
                ${renderAboutTabTemp(clickedPkm, genusText, abilitiesHtml, catchRate, baseExp)}
            </div>
            <div>
                <button class="prev btn" id="prev-button" onclick="changeDialogPkm(${index}, 'prev')">prev</button>
                <button class="next btn" id="next-button" onclick="changeDialogPkm(${index}, 'next')">next</button>
            </div>            
        </section>
    `;
}

function renderAboutTabTemp(onePkm, genusText, abilitiesHtml, catchRate, baseExp) {
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
                <tr>
                    <th>Abilities</th>
                    <td>${abilitiesHtml}</td>
                </tr>
                <tr>
                    <th>Catch Rate</th>
                    <td>${catchRate}</td>
                </tr>
                <tr>
                    <th>Base EXP</th>
                    <td>${baseExp}</td>
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

function renderSingleStatsRowTemp(statName, baseStat, percent) {
    return /*html*/ `
        <div class="stats-row" >
            <span class="stats-name">${statName.toUpperCase()}:</span>
            <span class="stats-value">${baseStat}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar-fill" style="width: ${percent}%"></div>
            </div>
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

function renderEvoRowTemp(evoName, evoImage) {
    return /*html*/ `
        <div class="evo-row">
            <img class="evo-dialog-img" class="evo-pkm-img" src="${evoImage}" alt="${evoName}">
            <span class="evo-pkm-name">${evoName.toUpperCase()}</span>
        </div>
    `;
}

function renderShinyTabTemp(clickedPkm) {
    return /*html*/ `
        <div class="tab-category">
            <img src="${clickedPkm.sprites.other["showdown"].front_shiny}" alt="${clickedPkm.name}">
        </div>
    `;
}
