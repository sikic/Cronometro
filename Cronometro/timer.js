"use strict";
var ss = 0, hh = 0, mm = 0;
var cont, id;

//funcion que se encarga de transformar los segundos en minutos ,segundos y horas
function formato() {
  //variables axiliares
  var hha = 0, mma = 0, ssa = 0, nna = cont;

  //si la cuenta es menos de 60 segundos
  if (nna < 60) {
    if (nna < 10) nna = "0" + nna;
    $(".tiempo").text("00:00:" + nna);
    ss = nna;
  } else {//mas de 60 segundos, hacemos el cambio de horas
      
        ss = Math.trunc(cont % 60);
        mm = Math.trunc(cont / 60);
        if (mm > 59){
          hh = Math.trunc(mm / 60);
          mm = Math.trunc(mm % 60);
        }
 
    if (hh < 10) hha = "0" + hh;
    if (mm < 10) mma = "0" + mm;
    if (ss < 10) ssa = "0" + ss;

    $(".tiempo").text(hha + ":" + mma + ":" + ssa);
  }
}

//se encarga de hacer la cuenta atras
function decrementar() {
  if(ss == 0 && mm == 0 && hh == 0){
    clearInterval(id);
    $(".tiempo").text(`00:00:00`);
    $("#start").prop("disabled",false);
  }else{
    ss--;
    if(ss == 0 && mm > 0 && hh == 0){ //hay que restar uno a los minutos
      ss = 59;
      mm--;
    }else if(ss == 0 && mm == 0 && hh > 0){
      hh--;
      mm=59;
      ss = 59;
    }

    var aux1 ="",aux2="",aux3="";
    if (hh < 10) aux1 = "0";
    if (mm < 10) aux2 = "0";
    if (ss < 10) aux3 = "0";

    $(".tiempo").text(aux1 + hh + ":" + aux2 +mm + ":" + aux3 + ss);
  }
}
function inicializar() {
  //audio = new Audio();
  //le damos a empezar
  $("#start").on("click", function () {
    cont = $("#segundos").val();
    //comprobamos si hay algo escrito en el input
    if(cont == "" || cont < 0)
      alert("Inserte un numero mayor que 0")
    else{
      $("#start").prop('disabled',true);
      formato(cont, hh, mm, ss);
      console.log(hh + " h "+ mm + " m " + ss +" s " );
      id = setInterval(decrementar, 1000);
    }
  });

  $("#reset").on("click", function () {
    clearInterval(id);
    $(".tiempo").text(`00:00:00`);
    $("#start").prop("disabled",false);
    $("#segundos").val("");
  });
}
$(inicializar);
