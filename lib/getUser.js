function getSender(msg) {

    return msg.key.participant || msg.key.remoteJid;

}

function getMention(msg) {

    return msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] ||
           msg.message?.contextInfo?.mentionedJid?.[0] ||
           null;

}

module.exports = {
    getSender,
    getMention
};