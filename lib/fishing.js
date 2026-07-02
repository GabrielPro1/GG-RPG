const fs = require("fs");
const path = require("path");
const { getUser, saveUser } = require("./database");
const { getClass } = require("./classes");

const FISH_PATH = path.join(__dirname, "../data/fish.json");

function loadFish() {
    return JSON.parse(fs.readFileSync(FISH_PATH));
}

function randomFish() {

    const fishList = loadFish();

    const roll = Math.random() * 100;

    let sum = 0;

    for (let fish of fishList) {
        sum += fish.chance;
        if (roll <= sum) {
            return { ...fish };
        }
    }

    return { ...fishList[0] };
}

function fish(id) {

    const user = getUser(id);

    const result = randomFish();

    const userClass = getClass(id);

    let multiplier = 1;

    if (userClass?.bonus?.fishValue) {
        multiplier *= userClass.bonus.fishValue;
    }

    result.value = Math.floor(result.value * multiplier);

    if (!user.fish[result.name]) {
        user.fish[result.name] = 0;
    }

    user.fish[result.name] += 1;

    user.stats.fishCaught += 1;

    saveUser(user);

    return result;
}

module.exports = {
    fish,
    loadFish
};