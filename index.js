const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const Pino = require("pino");
const qrcode = require("qrcode-terminal");

const loadCommands = require("./lib/commandLoader");
const commands = loadCommands();
const backup = require("./lib/backup");

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("./session");

    const sock = makeWASocket({
        auth: state,
        logger: Pino({
            level: "silent"
        })
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0];

        if (!msg.message) return;

        const testo =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text;

        if (!testo) return;

        console.log("📩", testo);

        if (testo.startsWith("/")) {

            const comando = testo
                .slice(1)
                .split(" ")[0]
                .toLowerCase();

            const cmd = commands[comando];

            if (cmd) {

                await cmd.execute(
                    sock,
                    msg
                );

            } else {

                await sock.sendMessage(
                    msg.key.remoteJid,
                    {
                        text:
`❌ Comando non trovato.

Scrivi /menu per vedere i comandi 🎮`
                    }
                );

            }
        }

    });


    sock.ev.on("connection.update", (update) => {

        const {
            connection,
            qr
        } = update;


        if (qr) {

            console.log("\n📱 Scansiona QR:\n");

            qrcode.generate(
                qr,
                {
                    small: true
                }
            );
        }


        if (connection === "open") {

            console.log("\n🎮 GG RPG ONLINE!");

        }


        if (connection === "close") {

            const reconnect =
                update.lastDisconnect?.error?.output?.statusCode
                !== DisconnectReason.loggedOut;


            if (reconnect) {

                console.log("♻️ Riconnessione...");
                startBot();

            } else {

                console.log("❌ Logout");

            }

        }

    });

}

backup();

setInterval(
    backup,
    1000 * 60 * 30
);

startBot();