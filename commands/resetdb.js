const fs = require("fs");


const {
    owners
} = require("../config");



module.exports = {


name:"resetdb",



execute: async(sock,msg)=>{


    const id =
    msg.key.remoteJid;



    if(!owners.includes(id)){


        await sock.sendMessage(
            id,
            {
                text:
"❌ Non hai il permesso di usare questo comando."
            }
        );


        return;

    }





    fs.writeFileSync(

        "./database/users.json",

        "{}"

    );





    await sock.sendMessage(

        id,

        {
            text:
`🗑️ DATABASE RESETTATO

Tutti i giocatori sono stati azzerati.`
        }

    );


}


};