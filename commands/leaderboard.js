const getContext = require("../lib/context");
const {
    getTopMoney,
    getTopLevel,
    getTopFish
} = require("../lib/leaderboard");

module.exports = {

name: "leaderboard",

execute: async (sock, msg) => {

    const ctx = getContext(msg);

    const topMoney = getTopMoney(5);
    const topLevel = getTopLevel(5);
    const topFish = getTopFish(5);

    let text = "🏆 GG RPG LEADERBOARD\n\n";

    text += "💰 TOP GGC:\n";
    topMoney.forEach((u, i) => {
        text += `${i + 1}. ${u.id.split("@")[0]} - ${u.ggc} GGC\n`;
    });

    text += "\n⭐ TOP LEVEL:\n";
    topLevel.forEach((u, i) => {
        text += `${i + 1}. ${u.id.split("@")[0]} - Lv.${u.level}\n`;
    });

    text += "\n🐟 TOP PESCA:\n";
    topFish.forEach((u, i) => {
        text += `${i + 1}. ${u.id.split("@")[0]} - ${u.stats?.fishCaught || 0} pesci\n`;
    });

    await sock.sendMessage(ctx.chat, {
        text
    });

}

};