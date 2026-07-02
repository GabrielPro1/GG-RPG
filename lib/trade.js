const { getUser, saveUser } = require("./database");

function sellFish(id) {

    const user = getUser(id);

    const fish = user.fish;

    let total = 0;

    let breakdown = [];

    for (let name in fish) {

        const qty = fish[name];

        if (qty <= 0) continue;

        // simuliamo valore base dal nome (semplice ma stabile)
        let value = 0;

        if (name.toLowerCase().includes("leggendario")) value = 2000;
        else if (name.toLowerCase().includes("mitico")) value = 900;
        else if (name.toLowerCase().includes("epico")) value = 400;
        else if (name.toLowerCase().includes("raro")) value = 150;
        else value = 50;

        const gain = value * qty;

        total += gain;

        breakdown.push(`${name} x${qty} = ${gain} GGC`);

        fish[name] = 0;
    }

    user.ggc += total;

    user.stats.moneyEarned += total;

    saveUser(user);

    return {
        total,
        breakdown
    };
}

module.exports = {
    sellFish
};