function renderPkmTypeTemp(type) {
    return `<span class="type-badge ${type.name}">${type.name}</span>`;
}

function renderPkmCardTemp(onePkm, pkmBgColor, pkmtypes, i) {
    return /*html*/ `
        <button id="card${i}" class="pkm-card" onclick="openDialog(${i}, 'pkmBgColor')" style="background-color: ${pkmBgColor}">
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

function openDialogTemp(clickedPkm, pkmTypesHtml, genusText, index) {
    return /*html*/ `
        <section id="overlay-dialog-name" class="overlay-dialog-name" onclick="event.stopPropagation()">
            <button id="exit-btn"></button>
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
                <button class="tab-btn active" onclick="switchTab('about')">About</button>
                <button class="tab-btn" onclick="switchTab('stats')">Base Stats</button>
                <button class="tab-btn" onclick="switchTab('gender')">Gender</button>
                <button class="tab-btn" onclick="switchTab('shiny')">Shiny</button>
            </div>
            <div class="tab-content-container" id="tab-content">
                ${renderAboutTabTemp(clickedPkm, genusText)}
                <div>
                    <button class= id="prev-button" onclick="changeDialogPkm((${index}), 'prev')">prev</button>
                    <button id="next-button" onclick="changeDialogPkm((${index}), 'next')">next</button>
                </div>
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

function renderStatsTemp() {
    return /*html*/ `
        <div class="stats-row">
            <span class="stats-name">${s.stat.name.toUpperCase()}:</span>
            <span class="stats-value">${s.base_stat}</span>
        </div>
    `;
}
