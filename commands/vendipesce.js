const getContext = require("../lib/context");
const { sellFish } = require("../lib/trade");

module.exports = {

name: "vendipesce",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const result = sellFish(ctx.sender);

    if (result.total <= 0) {
        return sock.sendMessage(ctx.chat, {
            text: "🐟 Non hai pesci da vendere!"
        });
    }

    await sock.sendMessage(ctx.chat, {
        text:
`💰 VENDITA COMPLETATA!

${result.breakdown.join("\n")}

💵 Totale guadagnato: ${result.total} GGC`
    });

}

};