const {
    createUser
} = require("../lib/database");



module.exports = {


name:"inventario",



execute: async(sock,msg)=>{


    const id =
    msg.key.remoteJid;



    const user =
    createUser(id);



    let testo =
`
🎒 INVENTARIO GG RPG

━━━━━━━━━━

`;



    if(user.pesci.length === 0){


        testo +=
`Non hai ancora pescato nulla 🐟

Vai a pescare con:

/pesca`;



    } else {



        user.pesci.forEach(
            (pesce,index)=>{


            testo +=
`
${index + 1}) 🐟 ${pesce.nome}

⭐ ${pesce.rarita}

💰 ${pesce.valore} GGC

`;

        });


        testo +=
`
━━━━━━━━━━

Totale pesci:
${user.pesci.length}

Usa /vendipesce per vendere tutto.
`;



    }





    await sock.sendMessage(

        id,

        {
            text:testo
        }

    );


}


};