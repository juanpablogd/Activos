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
	}else if(cc.trim().length > 42){
		alert("CC no puede tener más de 42 caracteres");
		$("#cc").focus();
		$.mobile.loading( 'hide' );
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
	var persona = localStorage.persona_valor;
	if (persona === undefined){
		window.location = "p1_persona_buscar.html";
	}
	var res = persona.split("|");
	console.log("Busqueda: "+busqueda+" - RowID: "+res[5] ); //alert("Busqueda: "+busqueda);	3084556|EDGAR ARNULFO|SANABRIA ALDANA
	    tx.executeSql("SELECT cc,nombres,apellidos,telefono,correo,rowid FROM publicusuarios where cc = '"+busqueda+"' and rowid != "+res[5], [], resultadoCC);
	//}
}
/* RESULTADO DE LA TABLA PERSONA*/
function resultadoCC(tx, results) { console.log('MuestraItems');
	var encontrados = results.rows.length;	//console.log(encontrados);
	if(encontrados>0){
	 	var id = results.rows.item(0).cc;
	 	var nombres = results.rows.item(0).nombres;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	var apellidos = results.rows.item(0).apellidos;
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
			//OBTIENE EL ROWID DEL ELEMENTO A EDITAR
			var persona = localStorage.persona_valor;
			var res = persona.split("|");
			var rowid = res[5];
			//FECHA - ID_ENVIO
			var now = new Date();
			var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
			var id_envio = fecha_captura+'-'+id_usr;
			  console.log('UPDATE publicusuarios SET cc="'+cc+'",nombres="'+nombres+'",apellidos="'+apellidos+'",telefono="'+telefonos+'",correo="'+correo+'",id_envio="'+id_envio+'" WHERE rowid ="'+rowid+'"');
			tx.executeSql('UPDATE publicusuarios SET cc="'+cc+'",nombres="'+nombres+'",apellidos="'+apellidos+'",telefono="'+telefonos+'",correo="'+correo+'",id_envio="'+id_envio+'" WHERE rowid ="'+rowid+'"');
			localStorage.persona_valor = cc+"|"+nombres+"|"+apellidos+"|"+telefonos+"|"+correo+"|"+rowid;
			alert("Persona registrada exitosamente");
			window.location = "p1_persona_buscar.html";
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

	var persona = localStorage.persona_valor;
	if (persona === undefined){
		window.location = "p1_persona_buscar.html";
	}
	var res = persona.split("|");
	$("#cc").val(res[0]);
	$("#nombres").val(res[1]);
	$("#apellidos").val(res[2]);
	$("#telefonos").val(res[3]);
	$("#correo").val(res[4]);
});

