const getContext = require("../lib/context");
const { claimDaily } = require("../lib/economy");
const { addXP } = require("../lib/database");

module.exports = {

name: "daily",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const result = claimDaily(ctx.sender);

    if (!result.ok) {

        const hoursLeft = Math.ceil(result.remaining / 3600000);

        return sock.sendMessage(ctx.chat, {
            text: `⏳ Hai già riscattato il daily!\nRiprova tra ~${hoursLeft} ore.`
        });
    }

    addXP(ctx.sender, 50);

    await sock.sendMessage(ctx.chat, {
        text:
`🎁 DAILY RISCOSSO!

💰 +${result.reward} GGC
🔥 Streak: ${result.streak}
✨ +50 XP`
    });

}

};