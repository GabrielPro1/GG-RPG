const fs = require("fs");
const path = require("path");


function loadCommands(){


    const commands = {};



    const folder =
    path.join(
        __dirname,
        "../commands"
    );



    const files =
    fs.readdirSync(folder);



    files.forEach(file=>{


        if(file.endsWith(".js")){


            const command =
            require(
                path.join(
                    folder,
                    file
                )
            );



            commands[command.name] =
            command;



            console.log(
                "✅ Comando caricato:",
                command.name
            );


        }


    });



    return commands;


}



module.exports = loadCommands;