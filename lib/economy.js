const { getUser, saveUser } = require("./database");
const { getClass } = require("./classes");

function hours(h) {
    return h * 60 * 60 * 1000;
}

// DAILY
function claimDaily(id) {

    const user = getUser(id);
    const now = Date.now();

    const cooldown = hours(24);

    if (now - user.daily.last < cooldown) {
        return {
            ok: false,
            remaining: cooldown - (now - user.daily.last)
        };
    }

    user.daily.last = now;
    user.daily.streak += 1;

    let reward = 500 + (user.daily.streak * 50);

    const userClass = getClass(id);

    if (userClass?.bonus?.xpBonus) {
        reward = Math.floor(reward * userClass.bonus.xpBonus);
    }

    user.ggc += reward;

    saveUser(user);

    return {
        ok: true,
        reward,
        streak: user.daily.streak
    };
}

// WORK
function work(id) {

    const user = getUser(id);
    const now = Date.now();

    const cooldown = hours(2);

    if (now - user.work.last < cooldown) {
        return {
            ok: false,
            remaining: cooldown - (now - user.work.last)
        };
    }

    user.work.last = now;

    let reward = Math.floor(Math.random() * 300) + 100;

    const userClass = getClass(id);

    if (userClass?.bonus?.workBonus) {
        reward = Math.floor(reward * userClass.bonus.workBonus);
    }

    user.ggc += reward;

    saveUser(user);

    return {
        ok: true,
        reward
    };
}

module.exports = {
    claimDaily,
    work
};