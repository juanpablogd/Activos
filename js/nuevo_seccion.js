var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
//VALIDA SI NO HAY EMPRESA CREADA
if (localStorage.id_empresa == "" || localStorage.id_empresa === undefined){
	alerta (
	    "No hay empresa seleccionada, creela y sincronice de nuevo",  		// message
	    function(){ window.location = "principal.html"; },         	// callback
	    'Activos',            	// title
	    'Ok'                  	// buttonName
	);
} 

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

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
/****************************************************************************************************************************************************************/
/**CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS**/ 
function ConsultaItems(tx) {
		//tx.executeSql('select id,tipo from publicp_tipo_elemento order by tipo', [], ConsultaItemsCarga,errorCB);
		tx.executeSql('select id_dependencia,nom_dependencia from publicdependencia order by nom_dependencia', [], ConsultaItemsCarga,errorCB);
}
function ConsultaItemsCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	var viddependencia = localStorage.id_dependencia;
	var seleccionado;
	for (i = 0; i < len; i++){
		seleccionado = "";
		var nombre = results.rows.item(i).nom_dependencia;
		var id = results.rows.item(i).id_dependencia;
		if(viddependencia == id) seleccionado = "selected";
		$('#dependencia').append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');
   	}
	/*Refresca estilo para cada uno de los controles*/
	$("#dependencia").selectmenu('refresh'); //console.log(viddependencia);
/*	if(viddependencia != ""){
		localStorage.busqueda = viddependencia;
		//Si tiene Filtro
		var valTXTsub = $("#txtBuscarSublinea").val(); console.log (valTXTsub);
		if(valTXTsub.trim() == "")	sessionStorage.removeItem("txtBuscarSublinea");
		db.transaction(ConsultaSecciones);
	} */
}

/****************************************************************************************************************************************************************/

/****************************************************************************************************************************************************************/
/**CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES**/ 
function ConsultaSecciones(tx) {	//tx.executeSql('select id,tipo from publicp_tipo_elemento order by tipo', [], ConsultaItemsCarga,errorCB);
		  console.log('select id_seccion,nom_seccion from publicseccion where id_dependencia = "'+localStorage.busqueda+'" order by nom_seccion');
		tx.executeSql('select id_seccion,nom_seccion from publicseccion where id_dependencia = "'+localStorage.busqueda+'" order by nom_seccion', [], ConsultaSeccionesCarga,errorCB);
}
function ConsultaSeccionesCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	var vidseccion = localStorage.id_seccion;
	var seleccionado;
	$('#seccion').empty();
	$('#seccion').append('<option value="" >Seleccione...</option>');
	for (i = 0; i < len; i++){
		seleccionado = "";
		var nombre = results.rows.item(i).nom_seccion;
		var id = results.rows.item(i).id_seccion;
		if(vidseccion == id) seleccionado = "selected";
		$('#seccion').append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');
   	}
	$("#seccion").selectmenu('refresh');
}
/****************************************************************************************************************************************************************/

/****************************************************************************************************************************************************************/
function GuardaElemento(tx) {

	//OBTIENE EL ID DEL USUARIO
	var id_usr = localStorage.id_usr; 
	
	var dependencia = $("#dependencia").val(); console.log(dependencia);
	var nom_seccion = $("#nom_seccion").val();		 console.log("nom_seccion" + nom_seccion);
	
	if(dependencia.trim() == 0){
		alerta (
		    "Seleccione una dependencia",  		// message
		    function(){ $("#dependencia").trigger('mousedown'); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		return false;
	}else if(nom_seccion.trim() == ""){
		alerta (
		    "Digite el nombre",  		// message
		    function(){ $("#nom_seccion").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		return false;
	}

	$.mobile.loading( 'show', { text: 'Guardando Información....', textVisible: true, theme: 'a', html: "" });
	//FECHA - ID_ENVIO
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
	var id_envio = fecha_captura+'-'+id_usr;
	
	  console.log('INSERT INTO publicseccion (id_dependencia,nom_seccion,sec_id_envio) values ("'+dependencia+'","'+nom_seccion+'","'+id_envio+'")');
	tx.executeSql('INSERT INTO publicseccion (id_dependencia,nom_seccion,sec_id_envio) values ("'+dependencia+'","'+nom_seccion+'","'+id_envio+'")');

	console.log("Elemento Guardado exitosamente");
	setTimeout(function() { 
		localStorage.Fotos = "";
		$.mobile.loading( 'hide' );
		alerta (
		    "Elemento Guardado exitosamente",  		// message
		    function(){
		    	localStorage.consulta = null; 
		    	window.location = "p1_persona_buscar.html";
		    },			// callback
		    'Activos',	// title
		    'Ok'        // buttonName
		);
	}, 1*99);	

}

$(document).ready(function() {
	$("#titulo").html(localStorage.nom_empresa);
	sessionStorage.removeItem("txtBuscarSublinea");

	$("#btn_ok").click(function(){
	  	db.transaction(GuardaElemento);
	});

    app.initialize();
	
	// CARGAR ITEMS DE LA BASE DE DATOS
	db.transaction(ConsultaItems);

});