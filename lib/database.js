const fs = require("fs");
const path = require("path");


const databasePath =
path.join(
    __dirname,
    "../database/users.json"
);



function initDatabase(){

    if(!fs.existsSync(databasePath)){

        fs.writeFileSync(
            databasePath,
            "{}"
        );

    }

}



function loadUsers(){

    initDatabase();

    const data =
        fs.readFileSync(
            databasePath,
            "utf-8"
        );


    return JSON.parse(data || "{}");

}



function saveUsers(users){

    initDatabase();


    fs.writeFileSync(

        databasePath,

        JSON.stringify(
            users,
            null,
            4
        )

    );

}



function createUser(id){


    const users =
        loadUsers();



    if(!users[id]){


        users[id] = {


            id: id,


            nome:
            "Avventuriero",


            ggc:
            100,


            level:
            1,


            xp:
            0,


            inventario:
            [],


            pesci:
            [],


            statistiche: {

                pescati: 0,

                venduti: 0,

                guadagnati: 0

            },


            cooldown: {

                pesca: 0,

                lavoro: 0,

                daily: 0

            }


        };



        saveUsers(users);


    }



    return users[id];

}



module.exports = {

    loadUsers,
    saveUsers,
    createUser

};