const getContext = require("../lib/context");
const { getShop } = require("../lib/shop");

module.exports = {

name: "shop",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const shop = getShop();

    let text = "🏪 SHOP GG RPG\n\n";

    for (let item of shop) {

        text += `🛒 ${item.name}\n`;
        text += `💰 ${item.price} GGC\n`;
        text += `📦 ${item.description}\n\n`;
    }

    await sock.sendMessage(ctx.chat, {
        text
    });

}

};