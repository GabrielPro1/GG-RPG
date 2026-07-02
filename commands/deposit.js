const getContext = require("../lib/context");
const { deposit } = require("../lib/bank");

module.exports = {

name: "deposit",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const amount = parseInt(ctx.args[0]);

    if (!amount) {
        return sock.sendMessage(ctx.chat, {
            text: "💰 Uso corretto: /deposit <quantità>"
        });
    }

    const result = deposit(ctx.sender, amount);

    if (!result.ok) {
        return sock.sendMessage(ctx.chat, {
            text: `❌ ${result.message}`
        });
    }

    await sock.sendMessage(ctx.chat, {
        text:
`🏦 DEPOSITO COMPLETATO!

💰 Depositati: ${amount} GGC
🏦 Saldo banca: ${result.balance} GGC`
    });

}

};