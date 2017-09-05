var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);

function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
}

function GuardaElemento(tx) {
	
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
	
	
	//FECHA - ID_ENVIO
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
	var id_envio = fecha_captura+'-'+id_usr;
	
	console.log('INSERT INTO publicusuarios (cc,nombres,apellidos,telefono,correo,id_envio) values ("'+cc+'","'+nombres+'","'+apellidos+'","'+telefonos+'","'+correo+'","'+id_envio+'")');
	tx.executeSql('INSERT INTO publicusuarios (cc,nombres,apellidos,telefono,correo,id_envio) values ("'+cc+'","'+nombres+'","'+apellidos+'","'+telefonos+'","'+correo+'","'+id_envio+'")');

	alert("Elemento Guardado exitosamente");
	window.location = "principal.html";
}

$(document).ready(function() {
	
	$("#btn_ok").click(function(){
	  	db.transaction(GuardaElemento);
	});
	
});

