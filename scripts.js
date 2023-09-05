function validar(){
    let control_seguir=0;
    control_seguir+=campo_vacio("day");
    control_seguir+=campo_vacio("month");
    control_seguir+=campo_vacio("year");
    let anyo_actual = new Date().getFullYear(); 
    control_seguir+=valor_rango("day",31);
    control_seguir+=valor_rango("month",12);
    control_seguir+=valor_rango("year", anyo_actual);
    let anyo=document.getElementById("year").value;
    let mes=document.getElementById("month").value;
    let dia=document.getElementById("day").value;
    console.log(anyo + mes+dia)
    if(control_seguir==0){
        if(fechaValida(anyo,mes,dia)){
            console.log("fecha buena");
        }else{
            console.log("fecha mala");
        }
       
    }
    
   
}

function fechaValida(anyo,mes,dia){
    if(mes==2){
        if(anyo%4==0){
            if(dia<=29){
                return true;
            }
        }else{
            if(dia<=28){
                return true;
            }
        }
    }else{
        if(mes%2==0){
            if(dia<=30){
                return true;
            }
        }else{
            if(dia<=31){
                return true;
            }
        }
    }
    return false;
    
}
function campo_vacio(id){
    let entrada_campo=document.getElementById(id);
    let campo_error=document.getElementById("fallo_"+id)
    if(!entrada_campo.value||entrada_campo.value==""){
        campo_error.innerHTML="This field is required";
        entrada_campo.classList.add("input_error")
        return 1;
    }else{
        campo_error.innerHTML="";
        entrada_campo.classList.remove("input_error")
    }
    return 0;
}
function valor_rango(id,limite){
    let entrada_campo=document.getElementById(id);
    let campo_error=document.getElementById("fallo_"+id)
    if(isNaN(entrada_campo.value)||entrada_campo.value>limite){
        console.log("mayor limite "+id);
        if(id!="year"){
            campo_error.innerHTML="Must be a valid "+id;
        }else{
            campo_error.innerHTML="Must be in the past";
        }
        
        entrada_campo.classList.add("input_error")
        return 1
    }
    return 0;
}