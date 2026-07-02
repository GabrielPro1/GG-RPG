const {

    loadUsers,
    saveUsers,
    createUser

} = require("../lib/database");


const {
    checkCooldown
} = require("../lib/cooldown");



module.exports = {


name:"lavoro",



execute: async(sock,msg)=>{


    const id =
    msg.key.remoteJid;


    const user =
    createUser(id);



    const wait =
    checkCooldown(
        user,
        "lavoro",
        60000
    );



    if(wait > 0){


        await sock.sendMessage(

            id,

            {
                text:
`💼 Sei stanco!

Aspetta ${wait} secondi.`
            }

        );


        return;

    }





    const lavori = [


        "Hai riparato una nave 🚢",

        "Hai tagliato legna 🌲",

        "Hai aiutato un mercante 🛒",

        "Hai trovato un tesoro nascosto 💎"

    ];



    const lavoro =
    lavori[
        Math.floor(
            Math.random()*lavori.length
        )
    ];



    const guadagno =
    Math.floor(
        Math.random()*100
    ) + 50;





    user.ggc += guadagno;

    user.xp += 5;



    const users =
    loadUsers();


    users[id] = user;


    saveUsers(users);




    await sock.sendMessage(

        id,

        {
            text:
`💼 LAVORO

${lavoro}


💰 Guadagno:
${guadagno} GGC


✨ +5 XP

💳 Saldo:
${user.ggc} GGC`
        }

    );


}


};