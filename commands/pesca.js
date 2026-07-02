const fs = require("fs");

const {
    loadUsers,
    saveUsers,
    createUser
} = require("../lib/database");


const {
    scegliPesce
} = require("../lib/random");





module.exports = {


name:"pesca",




execute: async(sock,msg)=>{


    const id =
    msg.key.remoteJid;



    const user =
    createUser(id);



    const pesci =
    JSON.parse(

        fs.readFileSync(
            "./data/fish.json"
        )

    );



    const pesce =
    scegliPesce(pesci);





    user.pesci.push({

        nome: pesce.nome,

        rarita: pesce.rarita,

        valore: pesce.valore

    });



    user.xp += 5;



    const users =
    loadUsers();



    users[id] = user;



    saveUsers(users);






    const testo =

`🎣 GG RPG PESCA

Hai lanciato la lenza...

🌊

Hai trovato:

🐟 ${pesce.nome}


⭐ Rarità:
${pesce.rarita}


💰 Valore:
${pesce.valore} GGC


✨ +5 XP

Il pesce è stato aggiunto allo zaino!`;





await sock.sendMessage(

    id,

    {
        text:testo
    }

);



}


};