var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var tipo = '';
function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
}

function GuardaElemento(tx) {
	tipo = 'guarda';
	//OBTIENE EL ID DEL USUARIO
	var id_usr = localStorage.id_usr; 
	//OBTIENE EL ID DE LA CEDULA
	var cc = $( "#cc" ).val();
	//OBTIENE EL ID DE LOS NOMBRES
	var nombres = $( "#nombres" ).val();
		//OBTIENE EL ID DE LOS APELLIDOS
	var apellidos = $( "#apellidos" ).val();

	if(cc.trim() == ""){
		alert("Digite N° Documento");
		$("#cc").focus();
		$.mobile.loading( 'hide' );
		return false;
	}else if(nombres.trim() == ""){
		alert("Digite Nombres");
		$("#nombres").focus();
		$.mobile.loading( 'hide' );
		return false;
	}else if(apellidos.trim() == ""){
		alert("Digite Apellidos");
		$("#apellidos").focus();
		$.mobile.loading( 'hide' );
		return false;
	}
	localStorage.busqueda = cc.trim();	//console.log(cc);
	db.transaction(consultaPersona);

}

/* BUSQUEDA EN LA TABLA PERSONA*/
function consultaPersona(tx) {
	var busqueda=localStorage.busqueda;
	console.log("Busqueda: "+busqueda+"!"); //alert("Busqueda: "+busqueda);	3084556|EDGAR ARNULFO|SANABRIA ALDANA
	//if(busqueda!=null){
	    tx.executeSql("SELECT cc,nombres,apellidos FROM publicusuarios where cc = '"+busqueda+"'", [], resultadoCC);
	//}
}
/* RESULTADO DE LA TABLA PERSONA*/
function resultadoCC(tx, results) { console.log('MuestraItems');
	var encontrados = results.rows.length;	//console.log(encontrados);
	if(encontrados>0){
	 	var id = results.rows.item(0).cc;
	 	var nombres = results.rows.item(0).nombres;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	var apellidos = results.rows.item(0).apellidos;
		localStorage.persona_valor = id+"|"+nombres+"|"+apellidos;
		alert("Número de cédula ya existe: " +nombres+" "+apellidos );
	}else{
		if(tipo=='guarda'){
			//OBTIENE EL ID DEL USUARIO
			var id_usr = localStorage.id_usr; 
			
			//OBTIENE EL ID DE LA CEDULA
			var cc = $( "#cc" ).val();
			//OBTIENE EL ID DE LOS NOMBRES
			var nombres = $( "#nombres" ).val();
				//OBTIENE EL ID DE LOS APELLIDOS
			var apellidos = $( "#apellidos" ).val();
			//OBTIENE EL ID DE LOS TELEFONOS
			var telefonos = $( "#telefonos" ).val();
			//OBTIENE EL ID DEL CORREO
			var correo = $( "#correo" ).val();
			//FECHA - ID_ENVIO
			var now = new Date();
			var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
			var id_envio = fecha_captura+'-'+id_usr;
			
			console.log('INSERT INTO publicusuarios (cc,nombres,apellidos,telefono,correo,id_envio) values ("'+cc+'","'+nombres+'","'+apellidos+'","'+telefonos+'","'+correo+'","'+id_envio+'")');
			tx.executeSql('INSERT INTO publicusuarios (cc,nombres,apellidos,telefono,correo,id_envio) values ("'+cc+'","'+nombres+'","'+apellidos+'","'+telefonos+'","'+correo+'","'+id_envio+'")');
			localStorage.persona_valor = cc+"|"+nombres+"|"+apellidos;
			alert("Persona registrada exitosamente");
			setTimeout(function() {
				window.location = "p1_persona_buscar.html";
			}, 200);
		}
	}
}

$(document).ready(function() {
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
});

