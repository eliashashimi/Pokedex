function renderPkmTypeTemp(onePkm) {
    return onePkm.types.map((t) => `<span class="type-badge ${t.type.name}">${t.type.name}</span>`).join("");
}

function renderPkmCardTemp(onePkm, pkmBgColor, typesHtml, i) {
    return /*html*/ `
        <button id="card${i}" class="pkm-card" onclick="openDialog(${i})" style="background-color: ${pkmBgColor}">
            <div class="pkm-card-nameid">
                <h3>${onePkm.name}</h3>
                <p>#${onePkm.id}</p>
            </div>
            <div class="pkm-types-name">
                ${typesHtml}
            </div>
            <img id="card-image${i}" src="${onePkm.sprites.other["official-artwork"].front_shiny}" alt="onePkm.name">
        </button>
    `;
}

function openDialogTemp(clickedPkm) {
    return /*html*/ `
        <section id="overlay-dialog-name" class="dialog-overlay-dialog-name">
            <button id="exit-btn"></button>
            <div>
                <h3>${onePkm.name}</h3>
                <p>#${onePkm.id}</p>
            </div>
            <div>
                ${typesHtml}
            </div>
            <img src="${onePkm.sprites.other[offical - artwork].front_shiny}" alt="onePkm.name">
            </div>
            <div class="dialog-tabs">
                <button class="tab-btn active" onclick="switchTab('about')">About</button>
                <button class="tab-btn" onclick="switchTab('stats')">Base Stats</button>
                <button class="tab-btn" onclick="switchTab('gender')">Gender</button>
                <button class="tab-btn" onclick="switchTab('shiny')">Shiny</button>
            </div>
            <div class="tab-content-container">
                ${renderAboutTabTemp(clickedPkm)}
                <div>
                    <button id="prev-button">preview</button>
                    <button id="next-button">next</button>
                </div>
            </div>
        </section>
    `;
}

function renderAboutTabTemp(clickedPkm) {
    return /*html*/ `
        <div class="tab-category">
            <p></p>
            <p></p>
            <p></p>
        </div>
    `;
}

function renderStatsTemp() {
    return /*html*/ `
    <div class="tab-category">
            ${clickedPkm.stats
                .map(
                    (s) => `
            <div class="stats-row">
                <span class="stats-name">${s.stats.name.toUpperCase()}:</span>
                <span class="stats-value">${s.base_stat}</span>
            </div>
            `,
                )
                .join("")}
        </div>
    `;
}
