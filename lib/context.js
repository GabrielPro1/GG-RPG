const { owners } = require("../config");

function normalizeJid(jid) {
    return jid?.split(":")[0];
}

function getContext(msg) {

    const chat = msg.key.remoteJid;

    const sender = normalizeJid(
        msg.key.participant || msg.key.remoteJid
    );

    const text =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        "";

    const args = text.trim().split(/\s+/).slice(1);

    const mention =
        msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
        null;

    const target = normalizeJid(mention || sender);

    const isOwner = owners.includes(sender);

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