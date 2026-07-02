const fs = require("fs");
const path = require("path");


function backup(){


    const source =
    path.join(
        __dirname,
        "../database/users.json"
    );


    const target =
    path.join(
        __dirname,
        "../database/backup/users_backup.json"
    );



    if(fs.existsSync(source)){


        fs.copyFileSync(
            source,
            target
        );


    }

}



module.exports = backup;