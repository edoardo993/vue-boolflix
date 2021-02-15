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

// Milestone 2:       DONE
// 1 - Trasformiamo il voto da 1 a 10 decimale in un numero
//      intero da 1 a 5, così da permetterci di stampare
//      a schermo un numero di stelle piene che vanno da 1 a 5,
//      lasciando le restanti vuote.
//      Arrotondiamo sempre per eccesso all’unità successiva
// 2 - Trasformiamo poi la stringa statica della lingua in una
//       vera e propria bandiera della nazione corrispondente,
//       gestendo il caso in cui non abbiamo la bandiera
//       della nazione ritornata dall’API
// 3 - Allarghiamo poi la ricerca anche alle serie tv.
//      Con la stessa azione di ricerca dovremo prendere
//      sia i film che corrispondono alla query, sia le serie tv,
//      stando attenti ad avere alla fine dei valori simili

// Milestone 3:         DONE
// In questa milestone come prima cosa aggiungiamo la copertina
// del film o della serie al nostro elenco. Ci viene passata
// dall’API solo la parte finale dell’URL, questo perché poi
// potremo generare da quella porzione di URL tante dimensioni
// diverse. 

// Milestone 4:      DONE
// 1 - Trasformiamo quello che abbiamo fatto fino ad ora in una vera
//      e propria webapp, creando un layout completo simil-Netflix:
//      Un header che contiene logo e search bar
//      Dopo aver ricercato qualcosa nella searchbar, i risultati
//      appaiono sotto forma di “card” in cui lo sfondo è
//      rappresentato dall’immagine di copertina (consiglio
//      la poster_path con w342)
// 2 - Andando con il mouse sopra una card (on hover),
//      appaiono le informazioni aggiuntive già prese nei punti
//      precedenti più la overview

// Milestone 5 (Opzionale):
// Partendo da un film o da una serie, richiedere all'API quali
// sono gli attori che fanno parte del cast aggiungendo alla
// nostra scheda Film / Serie SOLO i primi 5 restituiti dall’API
// con Nome e Cognome, e i generi associati al film con questo
// schema: “Genere 1, Genere 2, …”.

// Milestone 6 (Opzionale):
// Creare una lista di generi richiedendo quelli disponibili
// all'API e creare dei filtri con i generi tv e movie per
// mostrare/nascondere le schede ottenute con la ricerca.



new Vue({
    el: '#app',
    data: {
        userSearch: '',
        selected: '',
        totalContents: [],
        movies: [],
        series: [],
        actors: [],
        genresCode: [],
        genresNames: [],
        totalGenres: [],
        isActive: true,
        IDXGenres: [],
        logo: 'https://fontmeme.com/permalink/210210/4937b74c6317b36c509baa13669b4b20.png'
    },
    mounted(){
        axios.get(`https://api.themoviedb.org/3/genre/movie/list`,{
            params:{
                api_key: '52c28cec98a2cf64e2b1f42536f8682a'
            }
        }).then((resp)=>{
            let totalGenres=resp.data.genres;
            this.totalGenres=resp.data.genres;
            totalGenres.forEach((element)=>{
                if(!this.genresCode.includes(element.id)){
                    this.genresCode.push(element.id)
                }
                for (let x=0; x<this.genresCode.length; x++){
                    if(this.genresCode[x]===element.id){
                        this.genresNames.push(element.name)
                    }
                }
            })
        })
    },
    methods: {
        searchClick(){
            this.moviesSearch();
            this.seriesSearch(),
            console.log(this.genresCode);
            console.log(this.genresNames);
            console.log(this.totalGenres)
        },
        moviesSearch(){
            if(this.userSearch===''){
                this.movies=[],
                this.series=[],
                this.totalContents=[]
            }else{
                axios.get(`https://api.themoviedb.org/3/search/movie`,{
                    params:{
                        api_key: '52c28cec98a2cf64e2b1f42536f8682a',
                        query: this.userSearch
                    }
                }).then((resp)=>{
                    this.movies=resp.data.results;
                    this.totalContents=[...this.movies, ...this.totalContents];
                    this.movies.forEach((element)=>{
                        return element.vote_average=Math.ceil(element.vote_average/2)
                    })
                })
            }
        },
        seriesSearch(){
            if(this.userSearch===''){
                this.movies=[],
                this.series=[]
            }else{
                axios.get(`https://api.themoviedb.org/3/search/tv`,{
                    params:{
                        api_key: '52c28cec98a2cf64e2b1f42536f8682a',
                        query: this.userSearch
                    }
                }).then((resp)=>{
                    this.series=resp.data.results;
                    this.totalContents=[...this.series, ...this.totalContents];
                    this.series.forEach((element)=>{
                        return element.vote_average=Math.ceil(element.vote_average/2)
                    })
                })
            }
        },
        flagIcon(element){
            if(element.original_language==='en'){
                element.original_language='gb'
            }
            if(element.original_language==='ja'){
                element.original_language='jp'
            }
            if(element.original_language==='da'){
                element.original_language='dk'
            }
            if(element.original_language==='hi'){
                element.original_language='in'
            }
            if(element.original_language==='cs'){
                element.original_language='cz'
            }
            if(element.original_language==='ko'){
                element.original_language='kr'
            }
            if(element.original_language==='fa'){
                element.original_language='ir'
            }
            if(element.original_language==='ta'){
                element.original_language='th'
            }
            if(element.original_language==='zh'){
                element.original_language='cn'
            }
            if(element.original_language==='nb'){
                element.original_language='nl'
            }
            if(element.original_language==='xx'){
                return ''
            }
            return `https://lipis.github.io/flag-icon-css/flags/4x3/${element.original_language}.svg`;
        },
        getIMG(element){
            return `https://image.tmdb.org/t/p/w500${element.poster_path}`
        },
        getBackground(url){
            return `background-image:url('https://image.tmdb.org/t/p/w500${url}')`
        },
        getActors(IDX){
            return axios.get(`https://api.themoviedb.org/3/movie/${IDX}/credits`,{
                params:{
                    api_key: '52c28cec98a2cf64e2b1f42536f8682a'
                }
            })
            .then((resp)=>{
                let currentActors=[];
                resp.data.cast.forEach((element)=>{
                    currentActors.push(element.name)
                });
                let actors=[];
                for(let x=0; x<5; x++){
                    actors.push(` ${currentActors[x]}`)
                }
                return this.actors=actors.toString()
            })
        },
        getGenre(genreIDX){
            let currentGenre=[];
            this.totalGenres.forEach((element)=>{
                for(let x=0; x<genreIDX.length; x++){
                    if(element.id===genreIDX[x]){
                        currentGenre.push(` ${element.name}`)
                    }
                }
            });
            console.log(currentGenre)
            return this.IDXGenres=currentGenre.toString()
        },
        deleteClick(){
            this.userSearch='';
            this.movies=[];
            this.series=[];
            this.totalContents=[]
        }
    }
});
Vue.config.devtools=true