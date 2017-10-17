var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var tipo = '';
function errorInsertp(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alert("Error almacenando Persona: \n" + " Mensaje: " + err.message + err.code);
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
function txtOk(t){
	t = t.trim();
	return t.replace(/'/g , "").replace(/"/g , "").replace(/\|/g , " ");
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
			var cc = txtOk($( "#cc" ).val());
			//OBTIENE EL ID DE LOS NOMBRES
			var nombres = txtOk($( "#nombres" ).val());
				//OBTIENE EL ID DE LOS APELLIDOS
			var apellidos = txtOk($( "#apellidos" ).val());
			//OBTIENE EL ID DE LOS TELEFONOS
			var telefonos = txtOk($( "#telefonos" ).val());
			//OBTIENE EL ID DEL CORREO
			var correo = txtOk($( "#correo" ).val());
			//FECHA - ID_ENVIO
			var now = new Date();
			var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
			var id_envio = fecha_captura+'-'+id_usr;
			db.transaction(function(tx) {
				console.log('INSERT INTO publicusuarios (cc,nombres,apellidos,telefono,correo,id_envio) values ("'+cc+'","'+nombres+'","'+apellidos+'","'+telefonos+'","'+correo+'","'+id_envio+'")');
				tx.executeSql('INSERT INTO publicusuarios (cc,nombres,apellidos,telefono,correo,id_envio) values ("'+cc+'","'+nombres+'","'+apellidos+'","'+telefonos+'","'+correo+'","'+id_envio+'")');
			},errorInsertp,
				function successInsertp() {
					localStorage.persona_valor = cc+"|"+nombres+"|"+apellidos;
					alert("Persona registrada exitosamente");
					setTimeout(function() {
						window.location = "p1_persona_buscar.html";
					}, 100);
				}
			);
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
	if(localStorage.busqueda != null && localStorage.busqueda != ""){
		$("#cc").val(localStorage.busqueda.trim());
		$("#nombres").focus();
	}
});

