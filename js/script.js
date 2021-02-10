// MILESTONE 1:        DONE
// Creare un layout base con una searchbar
// (una input e un button) in cui possiamo
// scrivere completamente o parzialmente
// il nome di un film. Possiamo, cliccando il  bottone,
// cercare sull’API tutti i film che contengono ciò che
// ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare
// a schermo i seguenti valori per ogni film trovato: 
//   - Titolo
//   - Titolo Originale
//   - Lingua
//   - Voto

// Milestone 2:
// Trasformiamo il voto da 1 a 10 decimale in un numero
// intero da 1 a 5, così da permetterci di stampare a schermo
// un numero di stelle piene che vanno da 1 a 5, lasciando
// le restanti vuote (troviamo le icone in FontAwesome).
// Arrotondiamo sempre per eccesso all’unità successiva,
// non gestiamo icone mezze piene (o mezze vuote :P)
// Trasformiamo poi la stringa statica della lingua in una vera
// e propria bandiera della nazione corrispondente, gestendo
// il caso in cui non abbiamo la bandiera della nazione
// ritornata dall’API (le flag non ci sono in FontAwesome).

// Allarghiamo poi la ricerca anche alle serie tv.
// Con la stessa azione di ricerca dovremo prendere
// sia i film che corrispondono alla query, sia le serie tv,
// stando attenti ad avere alla fine dei valori simili


new Vue({
    el: '#root',
    data: {
        userSearch: '',
        movies: []
    },
    methods: {
        clickSearch: function(){
            const self=this;
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=52c28cec98a2cf64e2b1f42536f8682a&query=' + this.userSearch)
            .then(function(resp){
                self.movies=resp.data.results;
                self.movies.forEach((element)=>{
                    if(element.vote_average%1!==0){
                        element.vote_average=Math.ceil(element.vote_average/2)
                    }else{
                        element.vote_average=element.vote_average/2
                    }
                })
            })
        }
    }
});
Vue.config.devtools=true