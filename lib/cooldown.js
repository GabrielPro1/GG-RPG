function checkCooldown(user, type, tempo) {


    if(!user.cooldown){

        user.cooldown = {};

    }


    const ora = Date.now();


    const ultimo =
        user.cooldown[type] || 0;


    const differenza =
        ora - ultimo;



    if(differenza < tempo){


        const rimanente =
            Math.ceil(
                (tempo - differenza) / 1000
            );


        return rimanente;

    }



    user.cooldown[type] = ora;


    return 0;

}



module.exports = {
    checkCooldown
};