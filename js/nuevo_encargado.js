var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var tipo = '';
function errorInsertp(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alerta (
		    "Error almacenando Persona: \n" + " Mensaje: " + err.message + err.code,  		// message
		    function(){ },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
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
	console.log("Busqueda: "+busqueda+"!"); //console.log("Busqueda: "+busqueda);	3084556|EDGAR ARNULFO|SANABRIA ALDANA
	//if(busqueda!=null){
	    tx.executeSql("SELECT cedula,nombres,apellidos FROM publicusuario where cedula = '"+busqueda+"' and id_proyecto = '"+localStorage.id_proyecto+"'", [], resultadoCC);
	//}
}
/* RESULTADO DE LA TABLA PERSONA*/
function resultadoCC(tx, results) { console.log('MuestraItems');
	var encontrados = results.rows.length;	//console.log(encontrados);
	if(encontrados>0){
	 	var id = results.rows.item(0).cedula;
	 	var nombres = results.rows.item(0).nombres;					//console.log( "nombre = " + sessionStorage.getItem("nombre"));
	 	var apellidos = results.rows.item(0).apellidos;
		localStorage.persona_valor = id+"|"+nombres+"|"+apellidos;
		alerta (
		    "Número de cédula ya existe: " +nombres+" "+apellidos,  		// message
		    function(){},         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
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
			//CARGO DEL ENCARGAO
			var cargo = txtOk($( "#cargo" ).val());
/*			//OBTIENE EL ID DE LOS TELEFONOS
			var telefonos = txtOk($( "#telefonos" ).val());
			//OBTIENE EL ID DEL CORREO
			var correo = txtOk($( "#correo" ).val()); 	*/
			//FECHA - ID_ENVIO
			var now = new Date();
			var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
			var id_envio = fecha_captura+'-'+id_usr;
			db.transaction(function(tx) {
				  console.log('INSERT INTO publicusuario (cedula,nombres,apellidos,cargo,id_envio,id_empresa,id_proyecto,nom_empresa) values ("'+cc+'","'+nombres+'","'+apellidos+'","'+cargo+'","'+id_envio+'","'+localStorage.id_empresa+'","'+localStorage.id_proyecto+'","'+localStorage.nom_empresa+'")');
				tx.executeSql('INSERT INTO publicusuario (cedula,nombres,apellidos,cargo,id_envio,id_empresa,id_proyecto,nom_empresa) values ("'+cc+'","'+nombres+'","'+apellidos+'","'+cargo+'","'+id_envio+'","'+localStorage.id_empresa+'","'+localStorage.id_proyecto+'","'+localStorage.nom_empresa+'")');
			},errorInsertp,
				function successInsertp() {
					localStorage.persona_valor = cc+"|"+nombres+"|"+apellidos;
					alerta (
					    "Persona registrada exitosamente!",  		// message
					    function(){
							setTimeout(function() {
								window.location = "p1_persona_buscar.html";
							}, 100);
					    },         	// callback
					    'Activos',            	// title
					    'Ok'                  	// buttonName
					);
				}
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
	if(localStorage.busqueda != null && localStorage.busqueda != ""){
		$("#cc").val(localStorage.busqueda.trim());
		$("#nombres").focus();
	}
});

