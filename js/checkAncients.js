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

function checkAncients() {
    let data = userData.data;
    let heroSoulsInput = userData.heroSoulsInput;
    let borbLimit = userData.borbLimit;
    
    let chor = data.outsiders.outsiders[2].level;
    let heroSoulsTotal = data.totalHeroSoulsFromAscensions;
    let lastE = heroSoulsTotal.lastIndexOf("e");
    let heroSouls = lastE > 0
        ? parseFloat(heroSoulsTotal.substr(lastE + 1)) + Math.log10(heroSoulsTotal.substr(0, lastE))
        : Math.log10(heroSoulsTotal);
    heroSouls += Math.log10(1 / 0.95) * chor;
    
    let results = "";
    
    let ancients = data.ancients.ancients;
    let missing = [];
    let underleveled = [];
    if (!userData.useOnAscend) {
        //check argaiv, bhaal, fragsworth, libertas, mammon, mimzee, pluto and siyalatas
        checkList(missing, underleveled, ancients, [28, 15, 19, 4, 8, 9, 10, 5], (heroSouls - 5) / 2);
        //check juggernaut and nogardnit
        checkList(missing, underleveled, ancients, [29, 32], (heroSouls - 5) / 2.5);
        //check morgulis
        checkList(missing, underleveled, ancients, [16], heroSouls - 5);
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
    }
    
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
            return false;
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
    
    if (borbLimit < 0) {
        let mpzStart = -(borbLimit - 499) / 5000 + 2;
        results += "You have " + mpzStart + " monsters per zone, leading to a longer ascension.";
        results += "<br>"
    } else if (userData.highestZone > borbLimit) {
        results += "You will have more than 2 monsters per zone starting from zone " + (borbLimit + 1).toLocaleString() + ", leading to a longer ascension."
        results += "<br>"
    }
    let altAction = false;
    if (rubiesNeeded > rubies) {
        results += "You are low on rubies! You need roughly <b>" + rubiesNeeded + " rubies</b> total for QAs up to zone 1 million. Consider <b>";
        if (logHeroSouls > 5040 || logHeroSouls <= 2600) {
            results += "saving your rubies</b>.";
            altAction = "Save your rubies."
        } else {
            results += "using a single 24 hour Timelapse</b>.";
            altAction = "Use a single 24h Timelapse."
        }
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
    return altAction;
}