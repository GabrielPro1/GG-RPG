const {

    loadUsers,
    saveUsers,
    createUser

} = require("../lib/database");


const {
    checkCooldown
} = require("../lib/cooldown");



module.exports = {


name:"daily",



execute: async(sock,msg)=>{


    const id =
    msg.key.remoteJid;


    const user =
    createUser(id);



    const wait =
    checkCooldown(
        user,
        "daily",
        86400000
    );



    if(wait > 0){


        await sock.sendMessage(

            id,

            {
                text:
`⏳ Hai già ritirato il daily!

Torna tra:
${wait} secondi`
            }

        );


        return;

    }





    const premio =
    Math.floor(
        Math.random()*200
    ) + 100;



    user.ggc += premio;


    user.xp += 10;



    const users =
    loadUsers();



    users[id] = user;


    saveUsers(users);




    await sock.sendMessage(

        id,

        {
            text:
`🎁 DAILY GG RPG

Hai ricevuto:

💰 ${premio} GGC

✨ +10 XP


💳 Saldo:
${user.ggc} GGC`
        }

    );


}


};