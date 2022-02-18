$(document).ready(function () {
    arrSrc.sort(function () { return Math.random() - 0.5 });
    $('#godplayer').html(localStorage.getItem("topUsuario"));
    $('#godmistakes').html(localStorage.getItem("topErrores"));
    let contadorBg = 0;
    $('.cartas').each(function () {
        $(this).data("imagen", arrSrc[contadorBg])
        contadorBg++;
    })
});

let sel1 = '';
let sel2 = '';
let puntuacion = 0;
let errores = 0;


$('#btnESP').click(cargarIdiomaES);
$('#btnENG').click(cargarIdiomaEN);

var xmlhttp = new XMLHttpRequest();


function cargarIdiomaEN() {
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            cambiarIdioma(myArr);
        }
    };
    xmlhttp.open("GET", "idiomas/idiomas.json", true);
    xmlhttp.send();
    localStorage.setItem('lenguaje', 'eng');
}
function cargarIdiomaES() {
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            cambiarIdioma(myArr);
        }
    };
    xmlhttp.open("GET", "idiomas/idiomas.json", true);
    xmlhttp.send();
    localStorage.setItem('lenguaje', 'esp');
}

function cambiarIdioma(arr) {
    let idioma;
    if (localStorage.getItem('lenguaje') == 'eng') {
        idioma = arr["lang"]["EN"];
    } else {
        idioma = arr["lang"]["ES"];
    }
    $("#titulo").html(idioma["TITLE"]);
    $("#puntuacion").html(idioma["SCORE"]);
    $("#fallosml").html(idioma["ERRORS"]);
    $("#jugadorxml").html(idioma["TOPPLAYER"]);
    $("#erroresjugador").html(idioma["TOPERROS"]);
    $("#idiomas").html(idioma["LANGUAJE"]);
    $("#informacion").html(idioma["INFO"]);

}
$("#lesgo").click(comenzar);

function comenzar(){
    
    let nombre = $("#usuarioForm").val();
    $("#usuario").html(nombre);

}



const arrSrc = [
    "url(imagenes/mtg1.jpg)", "url(imagenes/mtg2.jpg)", "url(imagenes/mtg3.jpg)",
    "url(imagenes/mtg4.jpg)", "url(imagenes/mtg5.jpg)", "url(imagenes/mtg6.jpg)",
    "url(imagenes/mtg7.jpg)",
    "url(imagenes/mtg1.jpg)", "url(imagenes/mtg2.jpg)", "url(imagenes/mtg3.jpg)",
    "url(imagenes/mtg4.jpg)", "url(imagenes/mtg5.jpg)", "url(imagenes/mtg6.jpg)",
    "url(imagenes/mtg7.jpg)", "url(imagenes/bombastic.jpg)"
];

$('.cartas').click(comparar);

function comparar(e) {
    if($(e.target).data("imagen")=="url(imagenes/bombastic.jpg)"){
       
        setTimeout(()=>{
        $(".cartas").css("background-image","url(imagenes/dorso.png)");
        $(this).css("background-image","url(imagenes/dorso.png)");
        $(".audio")[0].play();
    },500);
    
    }


    if (sel1 == '') {

        sel1 = e.target;
        $(sel1).css("background-image", $(sel1).data("imagen"))

    } else if (sel1 == e.target) {

    } else {

        sel2 = e.target;
        $(sel2).css("background-image", $(sel2).data("imagen"))
        if ($(sel1).data("imagen") == $(sel2).data("imagen")) {
            $('#informacion').html("son pareja");

            sel1.classList.add("sombras");
            sel2.classList.add("sombras");
            sel1 = '';
            sel2 = '';
            puntuacion++;
            $('#marcador').val(puntuacion);

            if (marcador.value == 6) {

                if (localStorage.getItem("topErrores") == null || localStorage.getItem("topErrores") > errores) {
                    localStorage.setItem("topUsuario", $('#usuario').html());
                    localStorage.setItem("topErrores", errores);

                    $('#godplayer').html($('#usuario').html());
                    $('#godmistakes').html(errores);
                }

                alert("Has ganado máquina con un total de: " + errores);
                location.reload();
            }
        } else {

            setTimeout(() => {
                $(sel1).css("background-image", "url(../imagenes/dorso.png)");
                $(sel2).css("background-image", "url(../imagenes/dorso.png)");

                sel1 = '';
                sel2 = '';
                let info = document.getElementById("informacion");
                errores++;
                $('#fallos').val(errores);
            }, 500);
            //TODO que no se pueda hacer nada mientras se muestran las dos 

        }
    }
}















