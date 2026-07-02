const config = require("../config");

function clean(jid = "") {
    return jid.replace(/:\d+/, "").split("@")[0] + "@s.whatsapp.net";
}

function getContext(msg) {

    const chat = msg.key.remoteJid;

    const senderRaw = msg.key.participant || msg.key.remoteJid;

    const sender = clean(senderRaw);

    const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        "";

    const args = text.trim().split(/\s+/).slice(1);

    const mention =
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

    const target = clean(mention || sender);

    const isOwner = config.owners.includes(sender);

    return {
        chat,
        sender,
        target,
        text,
        args,
        isOwner
    };
}

module.exports = getContext;