const { getUser, saveUser } = require("./database");

// DEPOSIT
function deposit(id, amount) {

    const user = getUser(id);

    amount = Math.floor(amount);

    if (amount <= 0) {
        return { ok: false, message: "Importo non valido" };
    }

    if (user.ggc < amount) {
        return { ok: false, message: "Non hai abbastanza GGC" };
    }

    user.ggc -= amount;
    user.bank += amount;

    saveUser(user);

    return {
        ok: true,
        balance: user.bank
    };
}

// WITHDRAW
function withdraw(id, amount) {

    const user = getUser(id);

    amount = Math.floor(amount);

    if (amount <= 0) {
        return { ok: false, message: "Importo non valido" };
    }

    if (user.bank < amount) {
        return { ok: false, message: "Fondi insufficienti in banca" };
    }

    user.bank -= amount;
    user.ggc += amount;

    saveUser(user);

    return {
        ok: true,
        balance: user.ggc
    };
}

module.exports = {
    deposit,
    withdraw
};