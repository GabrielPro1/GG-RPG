const getContext = require("../lib/context");
const { setMoney } = require("../lib/database");

module.exports = {

name: "setggc",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    if (!ctx.isOwner) {
        return sock.sendMessage(ctx.chat, {
            text: "❌ Non hai il permesso di usare questo comando."
        });
    }

    const target = ctx.target;
    const amount = Number(ctx.args[0]);

    if (isNaN(amount)) {
        return sock.sendMessage(ctx.chat, {
            text: "💰 Uso: /setggc @utente quantità"
        });
    }

    const result = setMoney(target, amount);

    await sock.sendMessage(ctx.chat, {
        text:
`🧾 SALDO IMPOSTATO

👤 Target: ${target.split("@")[0]}
💰 Nuovo saldo: ${result} GGC`
    });

}

};