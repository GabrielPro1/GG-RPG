const getContext = require("../lib/context");

const { createUser } = require("../lib/database");

module.exports = {

name: "profilo",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const user = createUser(ctx.target);

    const testo =
`
👤 PROFILO

ID: ${ctx.target}
💰 GGC: ${user.ggc}
⭐ XP: ${user.xp}
🎮 Livello: ${user.level}
🐟 Pesci: ${user.pesci.length}
`;

    await sock.sendMessage(ctx.chat, {
        text: testo
    });

}

};