const getContext = require("../lib/context");
const { fish } = require("../lib/fishing");
const { addMoney, addXP } = require("../lib/database");

module.exports = {

name: "pesca",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const result = fish(ctx.sender);

    addMoney(ctx.sender, result.value);
    addXP(ctx.sender, 10);

    await sock.sendMessage(ctx.chat, {
        text:
`🎣 PESCA!

🐟 Hai pescato: ${result.name}
⭐ Rarità: ${result.rarity}
💰 Valore: ${result.value} GGC

✨ +10 XP`
    });

}

};