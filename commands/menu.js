module.exports = {

    name: "menu",

    execute: async (sock, msg) => {

        const testo = `
🎮 GG RPG

━━━━━━━━━━━━━━

👤 Profilo

/profilo
/saldo
/inventario

━━━━━━━━━━━━━━

💰 Economia

/daily
/lavoro
/pesca
/vendipesce

━━━━━━━━━━━━━━

🛒 Negozio

/shop

━━━━━━━━━━━━━━

ℹ️ Info

/menu
/ping

━━━━━━━━━━━━━━

💰 Valuta:
GGCoin (GGC)

Buona fortuna, avventuriero!
        `;


        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: testo
            }
        );

    }

};