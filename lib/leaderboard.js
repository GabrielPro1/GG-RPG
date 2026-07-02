const { loadDB } = require("./database");

// TOP GGC
function getTopMoney(limit = 10) {

    const db = loadDB();

    const users = Object.values(db.users);

    return users
        .sort((a, b) => b.ggc - a.ggc)
        .slice(0, limit);
}

// TOP LEVEL
function getTopLevel(limit = 10) {

    const db = loadDB();

    const users = Object.values(db.users);

    return users
        .sort((a, b) => b.level - a.level)
        .slice(0, limit);
}

// TOP FISH
function getTopFish(limit = 10) {

    const db = loadDB();

    const users = Object.values(db.users);

    return users
        .sort((a, b) => (b.stats?.fishCaught || 0) - (a.stats?.fishCaught || 0))
        .slice(0, limit);
}

module.exports = {
    getTopMoney,
    getTopLevel,
    getTopFish
};