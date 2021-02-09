// MILESTONE 1:
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
            })
        }
    }
});
Vue.config.devtools=true