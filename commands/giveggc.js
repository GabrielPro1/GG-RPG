const getContext = require("../lib/context");

const {
    loadUsers,
    saveUsers,
    createUser
} = require("../lib/database");

const { owners } = require("../config");

module.exports = {

name: "giveggc",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    console.log("SENDER:", ctx.sender);
    console.log("OWNERS:", owners);

    if (!ctx.isOwner) {
        return sock.sendMessage(ctx.chat, {
            text: "❌ Solo l'owner può usare questo comando."
        });
    }

    const quantita = parseInt(ctx.args[1] || ctx.args[0]);

    if (!quantita || quantita <= 0) {
        return sock.sendMessage(ctx.chat, {
            text: `/giveggc @utente quantità\nEsempio: /giveggc 1000`
        });
    }

    const user = createUser(ctx.target);

    user.ggc += quantita;

    const users = loadUsers();
    users[ctx.target] = user;
    saveUsers(users);

    await sock.sendMessage(ctx.chat, {
        text:
`👑 ADMIN GIVE

Target: ${ctx.target}
+${quantita} GGC

Saldo: ${user.ggc} GGC`
    });

}

};