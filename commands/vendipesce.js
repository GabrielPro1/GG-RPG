const {

    loadUsers,
    saveUsers,
    createUser

} = require("../lib/database");




module.exports = {


name:"vendipesce",




execute: async(sock,msg)=>{


    const id =
    msg.key.remoteJid;



    const user =
    createUser(id);



    if(user.pesci.length === 0){


        await sock.sendMessage(

            id,

            {
                text:
`🐟 Non hai pesci da vendere.

Usa /pesca per iniziare!`
            }

        );


        return;

    }





    let guadagno = 0;



    let lista = "";



    user.pesci.forEach(
        pesce=>{


        guadagno += pesce.valore;


        lista +=
`
🐟 ${pesce.nome}
💰 ${pesce.valore} GGC

`;



    });





    user.ggc += guadagno;



    user.pesci = [];




    const users =
    loadUsers();



    users[id] = user;



    saveUsers(users);







    const testo =

`
🏪 MERCATO GG RPG

Hai venduto:

${lista}

━━━━━━━━━━

💰 Guadagno:
${guadagno} GGC


💳 Saldo attuale:

${user.ggc} GGC
`;





await sock.sendMessage(

    id,

    {
        text:testo
    }

);



}


};