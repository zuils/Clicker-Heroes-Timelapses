let print = false;

function readSave() {
    readingSave = true;
    let txt = $("#savegame").val();
    let data;
    if (txt.indexOf("Fe12NAfA3R6z4k0z") > -1 || txt.substring(0, 32) === "7a990d405d2c6fb93aa8fbb0ec1a3b23") {
        if (txt.substring(0, 32) === "7a990d405d2c6fb93aa8fbb0ec1a3b23") {
            try {
                data = JSON.parse(pako.inflate(atob(txt.substring(32)), {to: "string"}));
            } catch(e) {
                $("#savegame").val("");
                return;
            }
        } else {
            let result = txt.split("Fe12NAfA3R6z4k0z");
            txt = "";
            for (let i = 0; i < result[0].length; i += 2) {
                txt += result[0][i];
            }
            data = JSON.parse(atob(txt));
        }
        let primalSouls = data.primalSouls;
        let heroSoulsEnd = data.stats.currentAscension.heroSoulsEnd;
        let logHeroSoulsOnAscend = parseFloat(primalSouls.substr(primalSouls.lastIndexOf("e") + 1));
        let logHeroSoulsCurrent =  parseFloat(heroSoulsEnd.substr(heroSoulsEnd.lastIndexOf("e") + 1));
        let heroSoulsInput = logHeroSoulsOnAscend > logHeroSoulsCurrent ? primalSouls : heroSoulsEnd;
        $("#hero_souls").val(heroSoulsInput);
        let outsiders = data.outsiders.outsiders;
        $("#xyliqil_level").val(outsiders[1].level);
        $("#chor_level").val(outsiders[2].level);
        $("#autoclickers").val(data.autoclickers);
        if (print) { $("#savegame").val(JSON.stringify(data,null,1)); }
        //check kuma/borb
        let kumaLevel = data.ancients.ancients[21].level;
        let kumaEffect = 8 * (1 - Math.exp(-0.025 * kumaLevel));
        let borbLevel = data.outsiders.outsiders[6].level;
        let mpzReduction = kumaEffect * (1 + borbLevel / 8);
        borbLimit = Math.floor((mpzReduction - 8) * 10) * 500 + 499;
        let IEsucks = refresh();
        let timelapseZoneMax = IEsucks[0];
        let highestZone = IEsucks[1];
        checkAncients(data, timelapseZoneMax, highestZone, heroSoulsInput);
        borbLimit = false;
    } else if (txt) {
        $("#savegame").val("");
    }
    readingSave = false;
}

function printSave(input) {
    // IE sucks
    if (input === undefined || input === null) input = true;
    print = Boolean(input);
    return print;
}
