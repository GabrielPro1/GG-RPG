function scegliPesce(pesci){


    let totale = 0;


    pesci.forEach(p => {

        totale += p.probabilita;

    });



    let random =
        Math.random() * totale;



    let corrente = 0;



    for(let pesce of pesci){


        corrente += pesce.probabilita;



        if(random <= corrente){

            return pesce;

        }


    }


}



module.exports = {
    scegliPesce
};