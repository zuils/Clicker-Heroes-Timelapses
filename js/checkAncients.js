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

function checkAncients(data, timelapseZoneMax, highestZone, heroSoulsInput) {
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
    checkList(missing, underleveled, ancients, [28, 15, 19, 4, 8, 9, 10, 5], (heroSouls - 5) / 2);
    //check juggernaut and nogardnit
    checkList(missing, underleveled, ancients, [29, 32], (heroSouls - 5) / 2.5);
    //check morgulis
    checkList(missing, underleveled, ancients, [16], heroSouls - 5);
    //check kuma/borb
    let kumaLevel = data.ancients.ancients[21].level;
    let kumaEffect = 8 * (1 - Math.exp(-0.025 * kumaLevel));
    let borbLevel = data.outsiders.outsiders[6].level;
    let mpzReduction = kumaEffect * (1 + borbLevel / 8);
    let borbLimit = Math.floor((mpzReduction - 8) * 10) * 500 + 500;
    //check rubies
    let rubies = data.rubies;
    let logHeroSouls;
    if (heroSoulsInput.indexOf("e") > -1) {
        let mantissa = heroSoulsInput.substr(0, heroSoulsInput.indexOf("e"));
        let exponent = heroSoulsInput.substr(heroSoulsInput.lastIndexOf("e") + 1);
        mantissa = parseFloat(mantissa || 0);
        exponent = parseFloat(exponent || 0);
        if ((isNaN(mantissa)) || isNaN(exponent)) {
            alert("Calculation failed. logHeroSouls must be a positive number.");
            $("#hero_souls").val(150);
            return [0, 0, 0];
        }
        logHeroSouls = exponent + Math.log10(mantissa);
        mantissa = Math.pow(10, logHeroSouls % 1).toFixed(3);
        exponent = Math.floor(logHeroSouls);
        $("#hero_souls").val(mantissa + "e" + exponent);
    } else {
        logHeroSouls = parseFloat(heroSoulsInput || 0);
        $("#hero_souls").val(logHeroSouls);
    }
    let rubiesNeeded = 0;
    if (logHeroSouls > 1320 && logHeroSouls < 9800) {
        rubiesNeeded = Math.floor((3350 - Math.max(logHeroSouls - 3700, 0) * 0.442) / 50) * 50;
    }
    
    let results = "";
    if (missing.length > 0) {
        results += "<b>Missing:</b> ";
        for (let a = 0; a < missing.length; a++) {
            results += ancientNames[missing[a]] + ", ";
        }
        results = results.slice(0, -2);
        results += "<br>";
    }
    if (underleveled.length > 0) {
        results += "<b>Underleveled:</b> ";
        for (let a = 0; a < underleveled.length; a++) {
            results += ancientNames[underleveled[a]] + ", ";
        }
        results = results.slice(0, -2);
        results += "<br>";
    }
    if (timelapseZoneMax > borbLimit) {
        results += "You will have more than 2 monsters per zone starting from zone " + borbLimit.toLocaleString() + "! Timelapse predictions beyond this zone will be inaccurate!"
        results += "<br>"
    } else if (highestZone > borbLimit) {
        results += "You will have more than 2 monsters per zone starting from zone " + borbLimit.toLocaleString() + "; the ascension may take considerably longer than predicted here!"
        results += "<br>"
    }
    if (rubiesNeeded > rubies) {
        results += "You are low on rubies! You need roughly <b>" + rubiesNeeded + " rubies</b> total for QAs up to zone 1 million. Consider <b>";
        results += logHeroSouls > 5040 ? "saving your rubies</b>." : 
            logHeroSouls > 2600 ? "using a single 24 hour Timelapse</b>." :
            "saving your rubies</b>.";
    }
    if (results !== "") {
        $("#ancientCheckResults").html(results);
        $("#ancientCheckResults").parent().show();
        $('html, body').animate({
            scrollTop: ($('.warning').offset().top)
        },200);
    } else {
        $("#ancientCheckResults").parent().hide();
        $('html, body').animate({
            scrollTop: ($('#results').offset().top)
        },200);
    }
}