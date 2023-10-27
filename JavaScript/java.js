/*_________________Codi del Carrusel_________________*/
//Funció que es 'cridarà' quan la finestra s'hagi carregat;
    //Aquesta funció permetrà que les imatges vagin passant
    //I amb uns controls les podràs anar passant o veure l'anterior.

let numeroImatge = 0;
mostraImatges(numeroImatge);

//Funció que canviara el valor de numeroImatge i cridara a la funció mostraImatges, per a que mostri l'anterior o l'imatge posterior.
function canviImatge(n) {
  mostraImatges(numeroImatge += n);
}

//Funció que mostrara les imatges
function mostraImatges(n) {
    let imatges = document.getElementsByClassName('imatges');

    //Estructura que controla que n sigui un numero en el qual existeix una imatge a mostrar, en cas contrari se li asignara un nou valor.
    if (n > imatges.length){
        numeroImatge = 1;
    }else if(n <= (-1)){
        numeroImatge = imatges.length - 1;
    }

    //Amagara totes les imatges una a una amb display none.
    for (let i = 0; i < imatges.length; i++) {
        imatges[i].style.display = 'none';  
    }

    //Codi que comprova que numeroImatge no és més gran que imatges.length, per a que no intenti mostrar una imatge que no hi és i per tant que torni a l'inici.
    numeroImatge++;
    if (numeroImatge > imatges.length) {
        numeroImatge = 1;
    }

    //Mostra la imatge final!
    imatges[numeroImatge-1].style.display = 'block';
}

//fa que es canvii les imatges cada 3s
let canviAuto = setInterval(mostraImatges, 3000);




/*____________________________________________Codi del formulari______________________________________*/

//Funció que limita la selecció dels checkbox dels actors i actores a màxim 3. Es cridarà cada cop que a un checkbox dels actors se li canvï el valor és a dir, cada cop que seleccionis i deselecionis una opció
function limitCheckbox(){
    /*Declaració i inicialització de la següent funció*/
    var checkboxes = document.querySelectorAll('.actors');
    var seleccionats = 0;
    
    /*Bucle que recorre tots els chechbox dels autors per a comprovar quants d'aquests estan seleccionats*/
    for (let i = 0; i <checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            seleccionats++;
        }
    }
    
    //Condicional que imperdira que votin més de tres actors.
    if (seleccionats >= 3) {
        for (let i = 0; i <checkboxes.length; i++){
            if (!checkboxes[i].checked) {
                checkboxes[i].disabled = true;
            }
        }
    }else{ //else que fara tots els checkbox no marcats, disponibles, si l'usuari vol canviar els seus vots
        for (let i = 0; i <checkboxes.length; i++){
            if (!checkboxes[i].checked) {
                checkboxes[i].disabled = false;
            }
        }
    }
}


/*Funció per a validar que els camps estan plens -> els camps obligatoris seràn els del nom i cognom, correu i les votacions de pel·lícules i sèries*/
/*Aquesta funció mostrara al usuari els camps que li falten.*/
function validacio(){
    /*Declaració de variants:*/
    /*Aquestes son els que agafaran les dades del formulari per a despres utilitzar-les*/
    let nom = document.getElementById('nomCognom').value;
    let correu = document.getElementById('correu').value;
    let pelisSeleccionadas = document.getElementsByName('millorPeli');
    let seriesSeleccionades = document.getElementsByName('millorSerie');
    let actorsNominats = document.getElementsByClassName('actors');
    let actors = false;
    let pelis = false;
    let series = false;


    /*Aquestes variants s'inicialitzen...*/
    let peliVotada = '';
    let serieVotada='';
    let actorsVotats='';

    /*Validació de que l'usuari ha seleccionat com a mínim una peli i una sèrie.*/
    for (let i = 0; i < pelisSeleccionadas.length; i++) {
        if (pelisSeleccionadas[i].checked) {
            peliVotada = 'ha votat ' +  pelisSeleccionadas[i].value + ' com a millor película, ';
            pelis = true;
            break;
        }
    }
    
    //En cas que pelis continui sent false, es considerarà que cap película ha estat seleccionada.
    if(!pelis){
            peliVotada = 'ha de votar com a miním una pel·lícula, ';
    }

    for (let i =0; i < seriesSeleccionades.length; i++) {

        if (seriesSeleccionades[i].checked) {
            serieVotada = 'i ha votat ' + seriesSeleccionades[i].value + ' com a millor sèrie.';
            series = true;
            break;
        }   
    }
    
    //En cas que series continui sent false, es considerarà que cap película ha estat seleccionada.
    if(!series){
        serieVotada = 'i ha de votar com a mínim una sèrie.';
    }
    
    for(let i=0; i < actorsNominats.length; i++){
        if(actorsNominats[i].checked){
            actorsVotats = actorsVotats + '\n' + actorsNominats[i].value;
        }
    }
    
    //Comprovació de la votació dels actors, que com a mínim han votat a 1
    if(actorsVotats === ''){
        actorsVotats= ' Ha de votar com a mínim 1 actor.';
    }else{
        actorsVotats = ' Els actors seleccionats són els següents:' + actorsVotats;
        actors = true;
    }

    //Informació recollida es mostrarà en pantalla.
    window.alert('Vostè amb nom ' + nom + ' i el correu ' + correu + ', '+ peliVotada + serieVotada + actorsVotats);
    
    //Si tot està complet s'enviarà el formulari.
    if(actors && pelis && series && nom!='' && correu!=''){
        document.getElementById('formulari').submit();
    }
}
