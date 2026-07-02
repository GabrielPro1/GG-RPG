const fs = require("fs");
const path = require("path");
const { getUser, saveUser } = require("./database");

const CLASS_PATH = path.join(__dirname, "../data/classes.json");

function loadClasses() {
    return JSON.parse(fs.readFileSync(CLASS_PATH));
}

// assegna classe
function setClass(id, classId) {

    const user = getUser(id);
    const classes = loadClasses();

    const selected = classes.find(c => c.id === classId);

    if (!selected) {
        return { ok: false, message: "Classe non valida" };
    }

    user.class = classId;

    saveUser(user);

    return {
        ok: true,
        class: selected
    };
}

// ottieni classe
function getClass(id) {

    const user = getUser(id);

    const classes = loadClasses();

    return classes.find(c => c.id === user.class);
}

module.exports = {
    setClass,
    getClass,
    loadClasses
};