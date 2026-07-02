const getContext = require("../lib/context");
const { buyItem } = require("../lib/shop");
const { getUser } = require("../lib/database");

module.exports = {

name: "buy",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const itemId = ctx.args[0];

    if (!itemId) {
        return sock.sendMessage(ctx.chat, {
            text: "/buy <item_id>\nEsempio: /buy bait"
        });
    }

    const result = buyItem(ctx.sender, itemId);

    if (!result.ok) {
        return sock.sendMessage(ctx.chat, {
            text: `❌ ${result.message}`
        });
    }

    const user = getUser(ctx.sender);

    await sock.sendMessage(ctx.chat, {
        text:
`🏪 ACQUISTO COMPLETATO!

🛒 ${result.item.name}
💰 -${result.item.price} GGC

💳 Saldo: ${user.ggc} GGC`
    });

}

};