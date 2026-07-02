const getContext = require("../lib/context");
const { getUser } = require("../lib/database");
const { getClass } = require("../lib/classes");

module.exports = {

name: "profilo",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const user = getUser(ctx.target);

    const userClass = getClass(ctx.target);

    const needed = user.level * 100;

    const text =
`╔══════ GG RPG ══════╗

👤 ID: ${user.id}

🧬 Classe: ${userClass ? userClass.name : "Nessuna"}

💰 GGC: ${user.ggc}
🏦 Bank: ${user.bank}

⭐ Livello: ${user.level}
✨ XP: ${user.xp}/${needed}

❤️ HP: ${user.hp}/${user.maxHp}

🎒 Inventario: ${Object.keys(user.inventory).length}
🐟 Pesci: ${Object.keys(user.fish).length}

╚═══════════════════╝`;

    await sock.sendMessage(ctx.chat, { text });

}

};