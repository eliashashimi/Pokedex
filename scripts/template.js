function renderPkmCardTemp(onePkm, pkmBgColor) {
    return /*html*/ `
        <button class="pkm-card" style="background-color: ${pkmBgColor}">
            <div class="pkm-card-nameid">
                <h3>${onePkm.name}</h3>
                <p>#${onePkm.id}</p>
            </div>
            <div>
                <p>${onePkm.types[0].type.name}</p>
                <p>${onePkm.types[1].type.name}</p>
            </div>
            <img src="${onePkm.sprites.front_shiny}" alt="">
        </button>
    `;
}
