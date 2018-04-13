let ancientNames = {
    4: "libertas",
    5: "siyalatas",
    8: "mammon",
    9: "mimzee",
    10: "pluto",
    11: "dogcog",
    12: "fortuna",
    13: "atman",
    14: "dora",
    15: "bhaal",
    16: "morgulis",
    17: "chronos",
    18: "bubos",
    19: "fragsworth",
    20: "vaagur",
    21: "kumawakamaru",
    22: "chawedo",
    23: "hecatoncheir",
    24: "berserker",
    25: "sniperino",
    26: "kleptos",
    27: "energon",
    28: "argaiv",
    29: "juggernaut",
    31: "revolc",
    32: "nogardnit"
}

function checkList(missing, underleveled, ancients, list, treshold) {
    for (let i = 0; i < list.length; i++) {
        let ancientNo = list[i];
        if (ancients[ancientNo] && ancients[ancientNo].level) {
            let ancientLevel = ancients[ancientNo].level;
            let lastE = ancientLevel.lastIndexOf("e");
            let logAncientLevel = lastE > 0
                ? parseFloat(ancientLevel.substr(lastE + 1)) + Math.log10(ancientLevel.substr(0, lastE))
                : Math.log10(ancientLevel)
            if (logAncientLevel < treshold) underleveled.push(ancientNo);
        } else {
            missing.push(ancientNo);
        }
    }
}

function checkAncients(data) {
    let chor = data.outsiders.outsiders[2].level;
    let heroSoulsTotal = data.totalHeroSoulsFromAscensions;
    let lastE = heroSoulsTotal.lastIndexOf("e");
    let heroSouls = lastE > 0
        ? parseFloat(heroSoulsTotal.substr(lastE + 1)) + Math.log10(heroSoulsTotal.substr(0, lastE))
        : Math.log10(heroSoulsTotal);
    heroSouls += Math.log10(1 / 0.95) * chor;
    let ancients = data.ancients.ancients;
    let missing = [];
    let underleveled = [];
    //check argaiv, bhaal, fragsworth, libertas, mammon, mimzee, pluto and siyalatas
    checkList(missing, underleveled, ancients, [28, 15, 19, 4, 8, 9, 10, 5], heroSouls / 2 - 4);
    //check juggernaut and nogardnit
    checkList(missing, underleveled, ancients, [29, 32], heroSouls / 2.5 - 4);
    //check morgulis
    checkList(missing, underleveled, ancients, [16], heroSouls - 4);
    let results = "";
    if(missing.length > 0) {
        results += "<b>Missing:</b> ";
        for (let a = 0; a < missing.length; a++) {
            results += ancientNames[missing[a]] + ", ";
        }
        results = results.slice(0, -2);
        results += "<br>";
    }
    if(underleveled.length > 0) {
        results += "<b>Underleveled:</b> ";
        for (let a = 0; a < underleveled.length; a++) {
            results += ancientNames[underleveled[a]] + ", ";
        }
        results = results.slice(0, -2);
    }
    if (results !== "") {
        $("#ancientCheckResults").html(results);
        $("#ancientCheckResults").parent().show();
    }
}