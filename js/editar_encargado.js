var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var tipo = '';
function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alerta (
		    "Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message,  		// message
		    function(){ },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
	}
}

function txtOk(t){	console.log(t);
	if (t != "undefined" && t != undefined){
		t = t.trim();
		return t.replace(/'/g , "").replace(/"/g , "").replace(/\|/g , " ");
	}else{
		return t;
	}
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function GuardaElemento(tx) {
	tipo = 'guarda';
	//OBTIENE EL ID DEL USUARIO
	var id_usr = localStorage.id_usr; 				
	var cc = txtOk($( "#cc" ).val());				//OBTIENE EL ID DE LA CEDULA
	var nombres = txtOk($( "#nombres" ).val());		//OBTIENE EL ID DE LOS NOMBRES
	var apellidos = txtOk($( "#apellidos" ).val());	//OBTIENE EL ID DE LOS APELLIDOS
	var cargo = txtOk($( "#cargo" ).val());         //OBTIENE EL ID DEL CARGO
	var correo = txtOk($( "#correo" ).val());

	if(cc.trim() == ""){
		alerta (
		    "Digite N° Documento",  		// message
		    function(){ $("#cc").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		$.mobile.loading( 'hide' );
		return false;
	}else if(cc.trim().length > 42){
		alerta (
		    "CC no puede tener más de 42 caracteres",  		// message
		    function(){ $("#cc").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		$.mobile.loading( 'hide' );
		return false;
	}else if(nombres.trim() == ""){
		alerta (
		    "Digite Nombres",  		// message
		    function(){ $("#nombres").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		$.mobile.loading( 'hide' );
		return false;
	}else if(apellidos.trim() == ""){
		alerta (
		    "Digite Apellidos",  		// message
		    function(){ $("#apellidos").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		$.mobile.loading( 'hide' );
		return false;
	}else if(cargo.trim() == ""){
		alerta (
		    "Digite Cargo",  		// message
		    function(){ $("#cargo").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		$.mobile.loading( 'hide' );
		return false;
	}else if(correo.trim() == ""){
		alerta (
		    "Digite Correo",  		// message
		    function(){ $("#correo").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		$.mobile.loading( 'hide' );
		return false;
	}else if(!validateEmail(correo)){
		alerta (
		    "Correo no valido",  		// message
		    function(){ $("#correo").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		$.mobile.loading( 'hide' );
		return false;
	}
	localStorage.busqueda = cc.trim();	//console.log(cc);
	db.transaction(consultaPersona);

}

/* BUSQUEDA EN LA TABLA PERSONA*/
function consultaPersona(tx) {
	var busqueda=localStorage.busqueda;
	var persona = localStorage.persona_valor;
	if (persona === undefined){
		window.location = "p1_persona_buscar.html";
	}
	var res = persona.split("|");
	console.log("Busqueda: "+busqueda+" - RowID: "+res[5] );
	    tx.executeSql("SELECT cedula,nombres,apellidos,telefono,cargo,correo,rowid FROM publicusuario where cedula = '"+busqueda+"' and id_proyecto = '"+localStorage.id_proyecto+"' and rowid != "+res[5], [], resultadoCC);
	//}
}
/* RESULTADO DE LA TABLA PERSONA*/
function resultadoCC(tx, results) { console.log('MuestraItems');
	var encontrados = results.rows.length;	//console.log(encontrados);
	if(encontrados>0){
	 	var id = results.rows.item(0).cc;
	 	var nombres = results.rows.item(0).nombres;			nombres = txtOk(nombres);					//console.log( "nombre = " + sessionStorage.getItem("nombre"));
	 	var apellidos = results.rows.item(0).apellidos;		apellidos = txtOk(apellidos);
		alerta (
		    "Número de cédula ya existe: " +nombres+" "+apellidos,  		// message
		    function(){ },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
	}else{
		if(tipo=='guarda'){
			//OBTIENE EL ID DEL USUARIO
			var id_usr = localStorage.id_usr; 
			
			//OBTIENE EL ID DE LA CEDULA
			var cc = $( "#cc" ).val();					cc = txtOk(cc);
			//OBTIENE EL ID DE LOS NOMBRES
			var nombres = $( "#nombres" ).val();		nombres = txtOk(nombres);
				//OBTIENE EL ID DE LOS APELLIDOS
			var apellidos = $( "#apellidos" ).val();	apellidos = txtOk(apellidos);
			//OBTIENE EL ID DEL CARGO
			var cargo = $( "#cargo" ).val();			cargo = txtOk(cargo);
			//OBTIENE EL ID DEL CARGO
			var correo = $( "#correo" ).val();			correo = txtOk(correo);
			var telefonos;
			//OBTIENE EL ID DE LOS TELEFONOS
			//var telefonos = $( "#telefonos" ).val();	telefonos = txtOk(telefonos);
			//OBTIENE EL ID DEL CORREO
			//var correo = $( "#correo" ).val();			correo = txtOk(correo);
			//OBTIENE EL ROWID DEL ELEMENTO A EDITAR
			var persona = localStorage.persona_valor;
			var res = persona.split("|");
			var rowid = res[5];
			//FECHA - ID_ENVIO
			var now = new Date();
			var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
			var id_envio = fecha_captura+'-'+id_usr;
			  console.log("UPDATE publicusuario SET cedula='"+cc+"',nombres='"+nombres+"',apellidos='"+apellidos+"',cargo='"+cargo+"',correo='"+correo+"',id_envio='"+id_envio+"' WHERE rowid ='"+rowid+"'");
			tx.executeSql("UPDATE publicusuario SET cedula='"+cc+"',nombres='"+nombres+"',apellidos='"+apellidos+"',cargo='"+cargo+"',correo='"+correo+"',id_envio='"+id_envio+"' WHERE rowid ='"+rowid+"'");
			localStorage.persona_valor = cc+"|"+nombres+"|"+apellidos+"|"+telefonos+"|"+correo+"|"+rowid+"|"+cargo;
			alerta (
			    "Persona registrada exitosamente",  		// message
			    function(){ window.location = "p1_persona_buscar.html"; },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
		}
	}
}

$(document).ready(function() {
	$("#titulo").html(localStorage.nom_empresa);
	$("#btn_ok").click(function(){
	  	db.transaction(GuardaElemento);
	});
	$("#cc").focusout(function(){
		tipo = 'consulta';
		//OBTIENE EL ID DE LA CEDULA
		var cc = $( "#cc" ).val();
		if(cc.trim() != ""){
			localStorage.busqueda = cc.trim();	//console.log(cc);
			db.transaction(consultaPersona);
		}
	});

	var persona = localStorage.persona_valor;
	if (persona === undefined){
		window.location = "p1_persona_buscar.html";
	}	//console.log(persona);
	var res = persona.split("|");
	$("#cc").val(res[0]);
	$("#nombres").val(res[1]);
	$("#apellidos").val(res[2]);
	$("#telefonos").val(res[3]);
	if(res[4]!='undefined') $("#correo").val(res[4]);
	$("#cargo").val(res[6]);
});

