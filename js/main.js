// Polyfill for Internet Explorer
Math.log10 = (x) => Math.log(x) / Math.LN10;

function getInputs() {
	let HSInput = $("#hero_souls").val()
	let logHeroSouls;
	if (HSInput.includes("e")) {
		let mantissa = HSInput.substr(0, HSInput.indexOf("e"));
		let exponent = HSInput.substr(HSInput.lastIndexOf("e") + 1);
		mantissa = parseFloat(mantissa || 0);
		exponent = parseFloat(exponent || 0);
		if((mantissa === NaN) || (exponent=== NaN)) {
			alert("Calculation failed. logHeroSouls must be a positive number.");
			$("#hero_souls").val(150);
			return [0, 0, 0];
		}
		logHeroSouls = exponent + Math.log10(mantissa);
		mantissa = Math.pow(10, logHeroSouls % 1).toFixed(3);
		exponent = Math.floor(logHeroSouls);
		$("#hero_souls").val(mantissa + "e" + exponent);
	} else {
		logHeroSouls = parseFloat(HSInput || 0);
		$("#hero_souls").val(logHeroSouls);
	}
    if (!(logHeroSouls >= 0)) {
        alert("Calculation failed. logHeroSouls must be a positive number.");
		$("#hero_souls").val(150);
        return [-1, 0, 0];
    }
	
	
	
	let xyliqilLevel = parseInt($("#xyliqil_level").val() || 0);
	if (!(xyliqilLevel >= 0)) { xyliqilLevel = 0; }
	$("#xyliqil_level").val(xyliqilLevel);
	
	let chorLevel = parseInt($("#chor_level").val() || 0);
	if (!(chorLevel >= 0)) { chorLevel = 0; }
	if (chorLevel > 150) { chorLevel = 150; }
	$("#chor_level").val(chorLevel);
	
    return [logHeroSouls, xyliqilLevel, chorLevel];
}

let e11Levels = {
	Rose1: 602000,
	Rose2: 1204000,
	Rose3: 1806000,
	Rose4: 2408000,
	Rose5: 3010000,
	Sophia1: 677250,
	Sophia2: 1279250,
	Sophia3: 1881250,
	Sophia4: 2483250,
	Sophia5: 3085250,
	Blanche1: 752500,
	Blanche2: 1354500,
	Blanche3: 1956500,
	Blanche4: 2558500,
	Blanche5: 3160500,
	Dorothy1: 827750,
	Dorothy2: 1429750,
	Dorothy3: 1956500,
	Dorothy4: 2633750,
	Dorothy5: 3235750,
};
let e11Dps = {
	Rose: Math.log10(8.586) + 148592,
	Sophia: Math.log10(6.326) + 158831,
	Blanche: Math.log10(4.661) + 178104,
	Dorothy: Math.log10(3.434) + 199738,
}
let e11Upgrade = 5798;
let e11CostScale = Math.log10(1.22);
let e11DpsScale = Math.log10(1000);
let costThousand = Math.log10(1.07) * 1000;
let dogcog = 10;
let heroCosts = {
    Samurai: -10000,
    Atlas: 55 + costThousand - dogcog,
    Terra: 70 + costThousand - dogcog,
    Phthalo: 85 + costThousand - dogcog,
    Orntchya: 100 + costThousand - dogcog,
    Lilin: 115 + costThousand - dogcog,
    Cadmia: 130 + costThousand - dogcog,
    Alabaster: 145 + costThousand - dogcog,
    Astrea: 160 + costThousand - dogcog,
    Chiron: 175 + costThousand - dogcog,
    Moloch: 190 + costThousand - dogcog,
    BomberMax: 205 + costThousand - dogcog,
    Gog: 220 + costThousand - dogcog,
    Wepwawet: 235 + costThousand - dogcog,
    BettyClicker: 235 + costThousand * 1.5 - dogcog,
    KingMidas: 235 + costThousand * 2 - dogcog,
    Wepwawet2: 235 + costThousand * 5 - dogcog,
    Tsuchi: 500 - dogcog,
    Skogur: 1000 - dogcog,
    Moeru: 2000 - dogcog,
    Zilar: 4000 - dogcog,
    Madzi: 8000 - dogcog,
    Xavira0: 14000 - dogcog,
    Xavira1: 18407.5667 - dogcog,
    Xavira2: 19435.9989 - dogcog,
    Xavira3: 21492.8633 - dogcog,
    Xavira4: 22521.2955 - dogcog,
    Xavira5: 23872.9493 - dogcog,
    Cadu0: 25500 - dogcog,
    Ceus1: 27204.2591 - dogcog,
    Cadu1: 28908.5182 - dogcog,
    Ceus2: 30789.08 - dogcog,
    Cadu2: 32845.9444 - dogcog,
    Ceus3: 35079.1115 - dogcog,
    Cadu3: 37473.8894 - dogcog,
    Ceus4: 40044.97 - dogcog,
    Cadu4: 42777.6613 - dogcog,
    Maw0: 45500 - dogcog,
    Maw1: 48761.5993 - dogcog,
    Maw2: 52184.8094 - dogcog,
    Maw3: 55784.3222 - dogcog,
    Maw4: 59545.4457 - dogcog,
    Maw5: 63497.5683 - dogcog,
    Maw6: 67611.2927 - dogcog,
    Yachiyll: 76627.945 - dogcog,
    Yachiyl2: 81432.1926 - dogcog,
    Yachiyl3: 86398.0511 - dogcog,
    Yachiyl4: 91540.2122 - dogcog,
    Yachiyl5: 96858.6759 - dogcog,
    Yachiyl6: 102338.7505 - dogcog,
};
let heroCosts1 = {
    Samurai: 5 - dogcog,
    Atlas: 55 - dogcog,
    Terra: 70 - dogcog,
    Phthalo: 85 - dogcog,
    Orntchya: 100 - dogcog,
    Lilin: 115 - dogcog,
    Cadmia: 130 - dogcog,
    Alabaster: 145 - dogcog,
    Astrea: 160 - dogcog,
    Chiron: 175 - dogcog,
    Moloch: 190 - dogcog,
    BomberMax: 205 - dogcog,
    Gog: 220 - dogcog,
    Wepwawet: 235 - dogcog,
    BettyClicker: Math.log10(20000) - dogcog,
    KingMidas: Math.log10(4e12) - dogcog,
    Tsuchi: 500 - dogcog,
    Skogur: 1000 - dogcog,
    Moeru: 2000 - dogcog,
    Zilar: 4000 - dogcog,
    Madzi: 8000 - dogcog,
    Xavira: 14000 - dogcog,
    Cadu: 25500 - dogcog,
    Ceus: 25500 - dogcog,
    Maw: 45500 - dogcog,
    Yachiyl: 72000 - dogcog,
	Rose: 108000 - dogcog,
	Sophia: 114500 - dogcog,
	Blanche: 127500 - dogcog,
	Dorothy: 142200 - dogcog,
};
let heroBaseDps = {
    Samurai: 5.2858,
    Atlas: 47.4251,
    Terra: 60.2924,
    Phthalo: 73.1598,
    Orntchya: 86.0271,
    Lilin: 98.8944,
    Cadmia: 111.7618,
    Alabaster: 124.6290,
    Astrea: 137.4965,
    Chiron: 149.4965,
    Moloch: 163.2312,
    BomberMax: 175.9437,
    Gog: 188.9871,
    Wepwawet: 201.7295,
    BettyClicker: 11.0038,
    KingMidas: 18.7950,
    Wepwawet2: 201.7295,
    Tsuchi: 427.7216,
    Skogur: 848.7439,
    Moeru: 1681.6906,
    Zilar: 3336.7651,
    Madzi: 6634.3112,
    Xavira0: 11683.4585,
    Xavira1: 12306.4585,
    Xavira2: 12954.4585,
    Xavira3: 13627.4585,
    Xavira4: 14475.4585,
    Xavira5: 15348.4585,
    Cadu0: 26446.3258,
    Ceus1: 27444.1931,
    Cadu1: 28544.3258,
    Ceus2: 29742.1931,
    Cadu2: 31042.3258,
    Ceus3: 32440.1931,
    Cadu3: 33940.3258,
    Ceus4: 35538.1931,
    Cadu4: 37238.3258,
    Maw0: 61732.0604,
    Maw1: 63730.0604,
    Maw2: 65828.0604,
    Maw3: 68026.0604,
    Maw4: 70324.0604,
    Maw5: 72722.0604,
    Maw6: 75220.0604,
    Yachiyll: 101491.9278,
    Yachiyl2: 104389.9278,
    Yachiyl3: 107387.9278,
    Yachiyl4: 110485.9278,
    Yachiyl5: 113683.9278,
    Yachiyl6: 116981.9278,
};

// Populate e11 heroes
let newHeroes = ["Rose", "Sophia", "Blanche", "Dorothy"];
for (let l = 0; l < 6; l++) {
	for (let q = 0; q < 4; q++) {
		let hero = newHeroes[q];
		let heroCost = heroCosts1[hero];
		let heroDps = e11Dps[hero];
		let heroUpgrade = hero + l;
		let level = e11Levels[heroUpgrade] || 0;
		heroCosts[heroUpgrade] = heroCost + level * e11CostScale;
		heroBaseDps[heroUpgrade] = heroDps + e11Upgrade * l + 1.861426728;
	}
}
heroCosts["Rose0"] += Math.log10(1.22) * 9825;

function findBestHero(logGold) {
    let bestHero;
    let heroType = "old";
    for (let s in heroCosts) {
        if (heroCosts.hasOwnProperty(s)) {
            if (heroCosts[s] < logGold) {
                bestHero = s;
                if (s === "Xavira0") { heroType = "e10"; }
				if (s === "Rose0") { heroType = "e11"; }
            }
        }
    }
    return [bestHero, heroType];
}

function findHeroDps(bestHero, heroLevel, heroType, gilds) {
    let baseDps = heroBaseDps[bestHero] + Math.log10(heroLevel);
	let damageMultiplier;
	if (heroType === "e11") {
		damageMultiplier = 1000;
	} else if (heroType === "e10") {
		damageMultiplier = 4.5;
	} else {
		damageMultiplier = 4;
	}
    let dpsMultiplier25 = Math.log10(damageMultiplier) * Math.floor(Math.max(heroLevel - 175, 0) / 25);
    let dpsMultiplier1000 = (heroType === "e11")
		? 0
		: Math.log10(10 / damageMultiplier) * Math.min(Math.floor(heroLevel / 1000), 8);
	let gildDps = Math.log10(gilds);
    return baseDps + dpsMultiplier25 + dpsMultiplier1000 + gildDps;
}

let cacheHp140 = Math.log10(1.55)*139 + 1;
let hp141 = 1 + Math.log10(1.145) + cacheHp140;
let hp500 = 1 + Math.log10(1.55) * 139 + Math.log10(1.145) * 360;
let hp200k1 = Math.log10(1.24) + 25409;

function findHighestZone(totalDps) {
	if (totalDps < hp141) {
		return 130;
	} else if (totalDps <= hp500) {
		return 500;
	} else if (totalDps < hp200k1) {
        let logHealth = hp500;
        this.zone = 200001;
        for (let z = 501; z < 200001; z++) {
            logHealth += Math.log10(1.145 + 0.001 * Math.floor((z - 1) / 500));
            if (logHealth >= totalDps) {
                this.zone = z;
                break;
            }
        }
    } else {
        this.zone = (totalDps - hp200k1) / Math.log10(1.545) + 200001;
    }
	return Math.floor(this.zone);
}

function findHighestIdleZone(logHeroSouls, heroDps, xyliqilLevel) {
    let ancientDps = logHeroSouls * 2.4 + Math.log10(1.5) * 2 * xyliqilLevel;
    let totalDps = heroDps + ancientDps;
	let zone = findHighestZone(totalDps);
    return zone;
}

function findHighestActiveZone(logHeroSouls, heroDps) {
	let ancientDps = logHeroSouls * 2.9;
	let totalDps = heroDps + ancientDps;
	let zone = findHighestZone(totalDps);
	return zone;
}

function getMonsterGold(level, logHeroSouls) {
	let ancientGold = logHeroSouls * 1.5;
	if (level < 140) {
		return Math.log10(1.6) * (level - 1) + ancientGold - Math.log10(15);
	} else {
		return Math.log10(1.15) * (level - 140) + Math.log10(1.6) * 139 + ancientGold - Math.log10(15);
	}
}

function getHeroLevel(logGold, bestHero, heroType) {
	let nameShort = bestHero.substring(0, bestHero.length - 1);
	let baseCost = heroCosts1[nameShort]
		? heroCosts1[nameShort]
		: heroCosts1[bestHero];
	let costMultiplier = (heroType == "e11" ) ? 1.22 : 1.07;
	let heroLevel = Math.floor((logGold - baseCost) / Math.log10(costMultiplier));
	heroLevel = Math.max(1, heroLevel);
	return heroLevel
}

function refresh (test = false, logHeroSouls = 0, xyliqilLevel = 0, chorLevel = 0, ) {
    // Inputs
    if (test) {
		this.logHeroSouls = logHeroSouls;
		this.xyliqilLevel = xyliqilLevel;
		this.chorLevel = chorLevel;
    } else {
		[this.logHeroSouls, this.xyliqilLevel, this.chorLevel] = getInputs();
	}
    if (this.logHeroSouls < 0) { return false; }
	
	this.use168h = $("#TL168").is(":checked");
	let gilds = Math.max(1, Math.floor((this.logHeroSouls - 5) / Math.log10(1.25) / 2) - 9);
	let baseHeroSouls = this.logHeroSouls;
	this.logHeroSouls += Math.log10(1 / 0.95) * this.chorLevel - 2;

    let	startingZone = 0;
    let	timelapses = [];
    let zonesGained;
    let rubyCost = 0;
	let minimumZoneGain = 8200;

    do {
		let logGold = getMonsterGold(startingZone, this.logHeroSouls)
		if (startingZone > 0) {
			logGold += Math.log10(1 / (1 - 1 / 1.15));
			logGold += Math.log10(1.5) * this.xyliqilLevel;
		}
        let [bestHero, heroType] = findBestHero(logGold);
		let heroLevel = getHeroLevel(logGold, bestHero, heroType);
        let heroDps = findHeroDps(bestHero, heroLevel, heroType, gilds);
        let highestZone = findHighestIdleZone(this.logHeroSouls, heroDps, this.xyliqilLevel);

		zonesGained = highestZone - startingZone;
        let duration;
        if (zonesGained < minimumZoneGain) { break; }
		if (this.use168h && zonesGained > 360000) {
			duration = "168h";
            zonesGained = Math.min(756000, zonesGained);
            rubyCost += 50;
		}else if (zonesGained > 144000) {
            duration = "48h";
            zonesGained = Math.min(216000, zonesGained);
            rubyCost += 30;
        } else if (zonesGained > 72000) {
            duration = "24h";
            zonesGained = Math.min(108000, zonesGained);
            rubyCost += 20;
        } else {
            duration = "8h";
            zonesGained = Math.min(36000, zonesGained);
            rubyCost += 10;
        }
        highestZone = startingZone + zonesGained;

        if (bestHero === "Wepwawet2") { bestHero = "Wepwawet"; }

        timelapses.push({
            duration,
            bestHero,
            heroLevel,
            zone: highestZone,
            zoneDisplay: highestZone.toLocaleString() + " (+" + zonesGained.toLocaleString() + ")",
        });

        startingZone = highestZone;
    } while (zonesGained >= minimumZoneGain);
	
	let timelapseZoneMax = startingZone;
	let iterations = 0;
	
	do {
		let logGold = getMonsterGold(startingZone, this.logHeroSouls);
		logGold += Math.log10(1 / (1 - 1 / 1.15));
		let [bestHero, heroType] = findBestHero(logGold);
        let heroLevel = getHeroLevel(logGold, bestHero, heroType);
        let heroDps = findHeroDps(bestHero, heroLevel, heroType, gilds);
		let highestZone = findHighestActiveZone(this.logHeroSouls, heroDps);
		
		zonesGained = highestZone - startingZone;
		if (zonesGained <= 10) {
			let activeZonesGained = startingZone - timelapseZoneMax;
			let durationSeconds = Math.ceil(activeZonesGained / 8200 * 3600);
			let hours = Math.floor(durationSeconds / 3600);
			let minutes = Math.floor((durationSeconds - (hours * 3600)) / 60);
			let seconds = durationSeconds - hours * 3600 - minutes * 60;
			if (hours   < 10) hours   = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds;
			let duration = hours + ":" + minutes + ":" + seconds;
			if (bestHero === "Wepwawet2") { bestHero = "Wepwawet"; }
			timelapses.push({
				duration,
				bestHero,
				heroLevel,
				zone: highestZone,
				zoneDisplay: highestZone.toLocaleString() + " (max zone)",
			});
		} else
			startingZone = highestZone;
	} while (zonesGained > 10);

    // Test log
    if (test) {
        return (JSON.stringify({
            logHeroSouls: baseHeroSouls,
			xyliqilLevel: this.xyliqilLevel,
			chorLevel: this.chorLevel,
            rubyCost,
            timelapses,
        }));
    }

    // Display results
    let toappend = "";
    for (let t = 0; t < timelapses.length; t++) {
        let row = timelapses[t];
        toappend += "<tr><td>" + row.duration + "</td><td>" + row.bestHero + "</td><td>" + row.heroLevel.toLocaleString() + "</td><td>" + row.zoneDisplay + "</td>";
    }
    $("#TimelapsesTable tbody").html(toappend);
    $("#RubyCost").html("Total Rubies: " + rubyCost);
    /*let canQA = (timelapses.length > 0)
                ? timelapses[timelapses.length - 1].zone < 1e7 // Change to 1e6 when patch e11 hits
                : true;
    if ((rubyCost > 50) && canQA) {
        $("#Recommend").html("Recommended Action: Use Quick Ascension");
    } else if (rubyCost > 0) {
        $("#Recommend").html("Recommended Action: Use Timelapses as shown above");
    } else {
        $("#Recommend").html("Recommended Action: Save your rubies");
    }*/
    $("#RubyCost").html("Total Rubies: " + rubyCost);
}

function test() {
    let cases = [100, 250, 500, 750, 1000, 2000, 3000, 4000, 5000, 7500, 10000, 12500, 15000, 17500, 20000, 22500];
    let readout = "[\n";
    for (let i = 0; i < cases.length; i++) {
        readout += "	" + refresh(true, cases[i]) + ",\n";
    }
	for (let i = 1; i < 4; i++) {
		for (let j = 1; j < 4; j++) {
			readout += "	" + refresh(true, 5000, i * 10, j * 50) + ",\n";
		}
    }
    readout = readout.slice(0, -2);
    readout += "\n]";
	$("#savegame").val(readout);
}

$("#hero_souls").keyup((ev) => {
    if (ev.which === 13) { refresh(); }
});
