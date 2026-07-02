const getContext = require("../lib/context");
const fs = require("fs");

module.exports = {

name: "resetdb",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    console.log("SENDER:", ctx.sender);
    console.log("OWNERS:", global.owners);
    console.log("IS OWNER:", ctx.isOwner);

    if (!ctx.isOwner) {
        return sock.sendMessage(ctx.chat, {
            text: "❌ Non hai il permesso di usare questo comando."
        });
    }

    fs.writeFileSync("./database/users.json", JSON.stringify({
        _version: 2,
        users: {}
    }, null, 2));

    await sock.sendMessage(ctx.chat, {
        text: "🧨 Database resettato!"
    });

}

};