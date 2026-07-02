const getContext = require("../lib/context");
const { work } = require("../lib/economy");
const { addXP } = require("../lib/database");

module.exports = {

name: "lavoro",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const result = work(ctx.sender);

    if (!result.ok) {

        const min = Math.ceil(result.remaining / 60000);

        return sock.sendMessage(ctx.chat, {
            text: `⏳ Sei stanco!\nRiprova tra ~${min} minuti.`
        });
    }

    addXP(ctx.sender, 20);

    await sock.sendMessage(ctx.chat, {
        text:
`💼 LAVORO COMPLETATO!

💰 +${result.reward} GGC
✨ +20 XP`
    });

}

};