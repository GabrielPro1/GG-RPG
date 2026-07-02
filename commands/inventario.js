const getContext = require("../lib/context");
const { getUser } = require("../lib/database");

module.exports = {

name: "inventario",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const user = getUser(ctx.sender);

    let text = "🎒 INVENTARIO\n\n";

    text += "🐟 PESCI:\n";

    let fishEmpty = true;

    for (let f in user.fish) {
        if (user.fish[f] > 0) {
            text += `- ${f} x${user.fish[f]}\n`;
            fishEmpty = false;
        }
    }

    if (fishEmpty) text += "Nessun pesce\n";

    text += "\n🧰 OGGETTI:\n";

    let itemEmpty = true;

    for (let i in user.inventory) {
        if (user.inventory[i] > 0) {
            text += `- ${i} x${user.inventory[i]}\n`;
            itemEmpty = false;
        }
    }

    if (itemEmpty) text += "Nessun oggetto\n";

    await sock.sendMessage(ctx.chat, { text });

}

};