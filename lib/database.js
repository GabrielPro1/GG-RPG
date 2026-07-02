const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "../database/users.json");

function loadDB() {
    if (!fs.existsSync(DB_PATH)) {
        return { _version: 2, users: {} };
    }
    return JSON.parse(fs.readFileSync(DB_PATH));
}

function saveDB(db) {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function getUser(id) {

    const db = loadDB();

    if (!db.users[id]) {
        db.users[id] = {
            id,
            nickname: "",
            ggc: 100,
            bank: 0,
            level: 1,
            xp: 0,
            hp: 100,
            maxHp: 100,

            class: "none",

            inventory: {},
            fish: {},

            daily: {
                last: 0,
                streak: 0
            },

            work: {
                last: 0
            },

            stats: {
                fishCaught: 0,
                moneyEarned: 0,
                commandsUsed: 0
            }
        };

        saveDB(db);
    }

    return db.users[id];
}

function saveUser(user) {
    const db = loadDB();
    db.users[user.id] = user;
    saveDB(db);
}

function addMoney(id, amount) {
    const user = getUser(id);
    amount = Number(amount);
    if (isNaN(amount)) return user.ggc;
    user.ggc += amount;
    if (user.ggc < 0) user.ggc = 0;
    saveUser(user);
    return user.ggc;
}

function removeMoney(id, amount) {
    const user = getUser(id);
    user.ggc -= amount;
    if (user.ggc < 0) user.ggc = 0;
    saveUser(user);
    return user.ggc;
}

function setMoney(id, amount) {
    const user = getUser(id);
    amount = Number(amount);
    if (isNaN(amount)) return null;
    user.ggc = amount;
    if (user.ggc < 0) user.ggc = 0;
    saveUser(user);
    return user.ggc;
}

function addXP(id, amount) {

    const user = getUser(id);

    user.xp += amount;

    let leveledUp = false;

    let needed = user.level * 100;

    while (user.xp >= needed) {
        user.xp -= needed;
        user.level += 1;

        user.maxHp += 10;
        user.hp = user.maxHp;

        leveledUp = true;

        needed = user.level * 100;
    }

    saveUser(user);

    return {
        level: user.level,
        leveledUp
    };
}

module.exports = {
    loadDB,
    saveDB,
    getUser,
    saveUser,
    addMoney,
    removeMoney,
    setMoney,
    addXP
};