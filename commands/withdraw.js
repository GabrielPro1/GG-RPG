const getContext = require("../lib/context");
const { withdraw } = require("../lib/bank");

module.exports = {

name: "withdraw",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const amount = parseInt(ctx.args[0]);

    if (!amount) {
        return sock.sendMessage(ctx.chat, {
            text: "💸 Uso corretto: /withdraw <quantità>"
        });
    }

    const result = withdraw(ctx.sender, amount);

    if (!result.ok) {
        return sock.sendMessage(ctx.chat, {
            text: `❌ ${result.message}`
        });
    }

    await sock.sendMessage(ctx.chat, {
        text:
`💸 PRELIEVO COMPLETATO!

💰 Ritirati: ${amount} GGC
💳 Wallet: ${result.balance} GGC`
    });

}

};