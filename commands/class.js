const getContext = require("../lib/context");
const { loadClasses, setClass } = require("../lib/classes");

module.exports = {

name: "class",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const classes = loadClasses();

    if (!ctx.args[0]) {

        let text = "⚔️ CLASSI DISPONIBILI\n\n";

        classes.forEach(c => {
            text += `🧬 ${c.name} (${c.id})\n`;
            text += `📖 ${c.description}\n\n`;
        });

        return sock.sendMessage(ctx.chat, { text });
    }

    const result = setClass(ctx.sender, ctx.args[0]);

    if (!result.ok) {
        return sock.sendMessage(ctx.chat, {
            text: "❌ Classe non valida"
        });
    }

    await sock.sendMessage(ctx.chat, {
        text:
`⚔️ CLASSE ASSEGNATA!

🧬 ${result.class.name}
📖 ${result.class.description}`
    });

}

};