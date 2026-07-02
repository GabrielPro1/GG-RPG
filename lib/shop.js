const fs = require("fs");
const path = require("path");
const { getUser, saveUser } = require("./database");

const SHOP_PATH = path.join(__dirname, "../data/shop.json");

function loadShop() {
    return JSON.parse(fs.readFileSync(SHOP_PATH));
}

// visualizza shop
function getShop() {
    return loadShop();
}

// compra item
function buyItem(id, itemId) {

    const user = getUser(id);
    const shop = loadShop();

    const item = shop.find(i => i.id === itemId);

    if (!item) {
        return { ok: false, message: "Item non trovato" };
    }

    if (user.ggc < item.price) {
        return { ok: false, message: "Non hai abbastanza GGC" };
    }

    user.ggc -= item.price;

    if (!user.inventory[itemId]) {
        user.inventory[itemId] = 0;
    }

    user.inventory[itemId] += 1;

    user.xp += 5;

    saveUser(user);

    return {
        ok: true,
        item
    };
}

module.exports = {
    getShop,
    buyItem
};