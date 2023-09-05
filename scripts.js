function validar() {
    let control_seguir = 0;
    control_seguir += campo_vacio("day");
    control_seguir += campo_vacio("month");
    control_seguir += campo_vacio("year");
    let anyo_actual = new Date().getFullYear();
    control_seguir += valor_rango("day", 31);
    control_seguir += valor_rango("month", 12);
    control_seguir += valor_rango("year", anyo_actual);
    let anyo = document.getElementById("year");
    let mes = document.getElementById("month");
    let dia = document.getElementById("day");
    console.log(anyo.value + mes.value + dia.value)
    if (control_seguir == 0) {
        if (fechaValida(anyo.value, mes.value, dia.value)) {
            calcularDiferenciaFecha(anyo.value, mes.value, dia.value)

        } else {
            console.log("fecha mala");
            let fallo = document.getElementById("fallo_day");
            fallo.innerHTML = "Must be a valid date";
            anyo.classList.add("input_error")
            dia.classList.add("input_error")
            mes.classList.add("input_error")
        }

    }


}
function calcularDiferenciaFecha(anyo, mes, dia) {

    // Obtén la fecha actual
    var fechaActual = new Date();
    var fecha = new Date(anyo+"/"+mes+"/"+dia);
    // Calcula la diferencia en milisegundos
    var diferenciaEnMilisegundos = fechaActual - fecha;

    // Convierte la diferencia en días
    var dias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    dias=Math.ceil(dias)
    console.log(dias);
    var anyos = 0;
    var meses = 0;
    var diasRestantes = dias;
  
    while (diasRestantes >= 365) {
      if (añoBisiesto(anyos)) {
        if (diasRestantes >= 366) {
          anyos++;
          diasRestantes -= 366;
        } else {
          break;
        }
      } else {
        anyos++;
        diasRestantes -= 365;
      }
    }
  
    while (diasRestantes >= 30) {
      meses++;
      diasRestantes -= diasEnMes(anyos, meses);
    }
    mostrarResultados(anyos,"Anyos")
    mostrarResultados(meses,"Meses")
    mostrarResultados(diasRestantes,"Dias")
  console.log({
    anyos: anyos,
    meses: meses,
    días: diasRestantes
  })
    return {
      anyos: anyos,
      meses: meses,
      días: diasRestantes
    };




}
function mostrarResultados(valor,id){
    let lugar=document.getElementById("diferencia"+id);
    lugar.innerHTML=valor
}
function añoBisiesto(año) {
    return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
  }
  
  function diasEnMes(año, mes) {
    var diasPorMes = [31, añoBisiesto(año) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return diasPorMes[mes - 1];
  }
  
function fechaValida(anyo, mes, dia) {
    if (mes == 2) {
        if (anyo % 4 == 0) {
            if (dia <= 29) {
                return true;
            }
        } else {
            if (dia <= 28) {
                return true;
            }
        }
    } else {
        if (mes % 2 == 0) {
            if (dia <= 30) {
                return true;
            }
        } else {
            if (dia <= 31) {
                return true;
            }
        }
    }
    return false;

}
function campo_vacio(id) {
    let entrada_campo = document.getElementById(id);
    let campo_error = document.getElementById("fallo_" + id)
    if (!entrada_campo.value || entrada_campo.value == "") {
        campo_error.innerHTML = "This field is required";
        entrada_campo.classList.add("input_error")
        return 1;
    } else {
        campo_error.innerHTML = "";
        entrada_campo.classList.remove("input_error")
    }
    return 0;
}
function valor_rango(id, limite) {
    let entrada_campo = document.getElementById(id);
    let campo_error = document.getElementById("fallo_" + id)
    if (isNaN(entrada_campo.value) || entrada_campo.value > limite) {
        console.log("mayor limite " + id);
        if (id != "year") {
            campo_error.innerHTML = "Must be a valid " + id;
        } else {
            campo_error.innerHTML = "Must be in the past";
        }

        entrada_campo.classList.add("input_error")
        return 1
    }
    return 0;
}