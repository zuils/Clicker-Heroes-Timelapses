let print = false;

function readSave() {
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
        if (logHeroSoulsOnAscend > logHeroSoulsCurrent) {
            $("#hero_souls").val(primalSouls);
        } else {
            $("#hero_souls").val(heroSoulsEnd);
        }
        let outsiders = data.outsiders.outsiders;
        $("#xyliqil_level").val(outsiders[1].level);
        $("#chor_level").val(outsiders[2].level);
        if (print) { $("#savegame").val(JSON.stringify(data,null,1)); }
        refresh();
    } else if (txt) {
        $("#savegame").val("");
    }
}

function printSave(input=true) {
    print = Boolean(input);
    return print;
}
