var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
//VALIDA SI NO HAY EMPRESA CREADA

if (localStorage.idempresa == "" || localStorage.idempresa === undefined){
	alerta (
	    "No hay empresa seleccionada, creela y sincronice de nuevo",  		// message
	    function(){ window.location = "principal.html"; },         	// callback
	    'Activos',            	// title
	    'Ok'                  	// buttonName
	);
} 

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
		tx.executeSql('select iddependencia,nombre from publicdependencias order by nombre', [], ConsultaItemsCarga,errorCB);
		tx.executeSql('select id_estado,nombre from publicestadoarticulo order by nombre', [], ConsultaLoadEstado,errorCB);
}
function ConsultaItemsCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	var viddependencia = localStorage.iddependencia;
	var seleccionado;
	for (i = 0; i < len; i++){
		seleccionado = "";
		var nombre = results.rows.item(i).nombre;
		var id = results.rows.item(i).iddependencia;
		if(viddependencia == id) seleccionado = "selected";
		$('#dependencia').append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');
   	}
	/*Refresca estilo para cada uno de los controles*/
	$("#dependencia").selectmenu('refresh'); //console.log(viddependencia);
	if(viddependencia != ""){
		localStorage.busqueda = viddependencia;
		db.transaction(ConsultaSecciones);
	}
}
function ConsultaLoadEstado(tx, results) {
	var len = results.rows.length;	//console.log(len);

	for (i = 0; i < len; i++){
		var nombre = results.rows.item(i).nombre;
		var id = results.rows.item(i).id_estado;
		$('#id_estado').append('<option value="'+id+'">'+nombre+'</option>');
   	}
	/*Refresca estilo para cada uno de los controles*/
	$("#id_estado").selectmenu('refresh'); //console.log(viddependencia);

}
/****************************************************************************************************************************************************************/

/****************************************************************************************************************************************************************/
/**CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES**/ 
function ConsultaSecciones(tx) {
		//tx.executeSql('select id,tipo from publicp_tipo_elemento order by tipo', [], ConsultaItemsCarga,errorCB);
		tx.executeSql('select idseccion,nombre from publicsecciones where iddependencia = "'+localStorage.busqueda+'" order by nombre', [], ConsultaSeccionesCarga,errorCB);
}
function ConsultaSeccionesCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	var vidseccion = localStorage.idseccion;
	var seleccionado;
	$('#seccion').empty();
	$('#seccion').append('<option value="" >Seleccione...</option>');
	for (i = 0; i < len; i++){
		seleccionado = "";
		var nombre = results.rows.item(i).nombre;
		var id = results.rows.item(i).idseccion;
		if(vidseccion == id) seleccionado = "selected";
		$('#seccion').append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');
   	}
	$("#seccion").selectmenu('refresh');
}
/****************************************************************************************************************************************************************/


/****************************************************************************************************************************************************************/
/**CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR ITEMS**/ 
function ConsultaLinea(tx) {
		tx.executeSql('select idlinea,nombre from publiclineas order by nombre', [], ConsultaLineaCarga,errorCB);
}
function ConsultaLineaCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	for (i = 0; i < len; i++){
		var nombre = results.rows.item(i).nombre;
		var id = results.rows.item(i).idlinea;
		$('#linea').append('<option value="'+id+'">'+nombre+'</option>');
   	}
   	$('#linea').selectmenu('refresh');
}
/****************************************************************************************************************************************************************/

/****************************************************************************************************************************************************************/
/**CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA**/ 
function ConsultaSubLinea(tx) {
		tx.executeSql('select idslinea,nombre from publicsublineas where idlinea = "'+localStorage.busqueda+'" order by nombre', [], ConsultaSubLineaCarga,errorCB);
}
function ConsultaSubLineaCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	
	$('#sublinea').empty();
	
	for (i = 0; i < len; i++){
		var nombre = results.rows.item(i).nombre;
		var id = results.rows.item(i).idslinea;
		$('#sublinea').append('<option value="'+id+'">'+nombre+'</option>');
   	}
   	$('#sublinea').selectmenu('refresh');
	/*Refresca estilo para cada uno de los controles*/
    //$("#items").trigger("create");
}
/****************************************************************************************************************************************************************/

/****************************************************************************************************************************************************************/


function GuardaElemento(tx) {

	//OBTIENE EL ID DEL USUARIO
	var id_usr = localStorage.id_usr; 
	
	//var dependencia = $("#dependencia").val(); console.log(dependencia);
	var seccion = $("#seccion").val(); console.log(seccion);
	//var linea = $("#linea").val(); console.log(linea);
	var sublinea = $("#sublinea").val();		 console.log("sublinea" + sublinea);
	var marca = $("#marca").val(); console.log(marca);
	//OBTIENE EL ID DE LA DEPENDENCIA O AREA
	var referencia = $( "#ref" ).val();	console.log(referencia);
	//OBTIENE EL ID DE LA DEPENDENCIA O AREA
	var nombre = $( "#name" ).val();	nombre = txtOk(nombre); console.log(nombre);
		//OBTIENE EL ID DE LA DEPENDENCIA O AREA
	
	var nserie = $("#nserie").val();		console.log(nserie);
	var plaqueta = $("#plaqueta").val(); 	console.log(plaqueta);
	var plaqueta_anterior = $("#plaqueta_anterior").val(); console.log(plaqueta_anterior);	

	var id_estado = $("#id_estado").val();	console.log(id_estado);
	var dataf;	//datos de fotos
	
	if(sublinea.trim() == ""){
		alerta (
		    "Seleccione una Sublinea",  		// message
		    function(){ $("#sublinea").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		return false;
	}else if(nombre.trim() == ""){
		alerta (
		    "Digite el Nombre",  		// message
		    function(){ $("#name").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		return false;
	}else if(plaqueta.trim() == ""){
		alerta (
		    "Escanee la plaqueta",  		// message
		    function(){ $("#plaqueta").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		return false;
	}else if(id_estado.trim() == 0){
		alerta (
		    "Seleccione un estado",  		// message
		    function(){ $("#id_estado").focus(); },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
		return false;
	}
	if(localStorage.Fotos == "" || localStorage.Fotos == undefined){
			alerta (
			    "Mínimo de Fotos: "+minFotos,  		// message
			    function(){ },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
		return false;
	}else{
		dataf = JSON.parse(localStorage.getItem('Fotos')); console.log(dataf.length);
		if(dataf.length<minFotos){
			alerta (
			    "Mínimo de Fotos: "+minFotos,  		// message
			    function(){ },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
			return false;
		}else if(dataf.length>maxFotos){
			alerta (
			    "Máximo de Fotos: "+maxFotos +"\nFotos actuales: "+dataf.length,  		// message
			    function(){ },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
			return false;
		}
	}
	$.mobile.loading( 'show', { text: 'Guardando Información....', textVisible: true, theme: 'a', html: "" });
	//FECHA - ID_ENVIO
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
	var id_envio = fecha_captura+'-'+id_usr;
	
	  console.log('INSERT INTO publicarticulos (idseccion,idslinea,marca_af,nombre,referencia,numero_serie_af,plaqueta_af,plaqueta_anterior1_af,id_envio,id_estado,idusuario_envio) values ("'+localStorage.idseccion+'","'+sublinea+'","'+marca+'","'+nombre+'","'+referencia+'","'+nserie+'","'+plaqueta+'","'+plaqueta_anterior+'","'+id_envio+'","'+id_estado+'","'+id_usr+'")');
	tx.executeSql('INSERT INTO publicarticulos (idseccion,idslinea,marca_af,nombre,referencia,numero_serie_af,plaqueta_af,plaqueta_anterior1_af,id_envio,id_estado,idusuario_envio) values ("'+localStorage.idseccion+'","'+sublinea+'","'+marca+'","'+nombre+'","'+referencia+'","'+nserie+'","'+plaqueta+'","'+plaqueta_anterior+'","'+id_envio+'","'+id_estado+'","'+id_usr+'")');
	
	tx.executeSql('select rowid from publicarticulos where id_envio = "'+id_envio+'"', [], 
		           function(tx,rs){	console.log("rowidOK");
		           		var p = rs.rows.item(0);
						localStorage.elemento_valor = p.rowid+"|"+plaqueta+"|"+nombre+"|"+id_envio;		console.log(localStorage.elemento_valor);	//console.log(localStorage.elemento_valor);
								//Actualiza columna Id si tiene valor nulo
								//	console.log('UPDATE publicarticulos set idarticulo = rowid where idarticulo is null');
								//tx.executeSql('UPDATE publicarticulos set idarticulo = rowid where idarticulo is null');
								//GUARDA FOTOS
								if(localStorage.Fotos != null && localStorage.Fotos != "" && localStorage.Fotos !== undefined && localStorage.Fotos != "undefined"){
									//CARGA FOTOS
									
									$.each(dataf, function(i, item) {	
										db.transaction(function(tx) {	//console.log(item);
											//  console.log('INSERT INTO publicarticulos_fotos (url,id_envio) values ("'+item+'","'+id_envio+'")');
											tx.executeSql('INSERT INTO publicarticulos_fotos (url,id_envio) values ("'+item+'","'+id_envio+'")');
										});	//console.log(i);
										if((i+1)==dataf.length){
											console.log("Elemento Guardado exitosamente");
											setTimeout(function() { 
												dataf.length=0;
												localStorage.Fotos = "";
												$.mobile.loading( 'hide' );
												alerta (
												    "Elemento Guardado exitosamente",  		// message
												    function(){
												    	localStorage.consulta = null; 
												    	window.location = "p2_elemento_buscar.html";
												    },         	// callback
												    'Activos',            	// title
												    'Ok'                  	// buttonName
												);
											}, dataf.length*120);
										}
									});
								}
		           }
		       ,errorCB);
}

$(document).ready(function() {

	if(localStorage.consulta != null && localStorage.consulta != ""){
		$("#plaqueta").val(localStorage.consulta);
	}
	
	$("#btn_ok").click(function(){
	  	db.transaction(GuardaElemento);
	});
	
	$("#dependencia").change(function() {
		var nombre = $("#dependencia option:selected").text();
		var id = $(this).val();
		localStorage.busqueda = id;
		// CARGAR ITEMS SECCIONES SEGÚN DEPENDENCIAS
		db.transaction(ConsultaSecciones);
	});
	
	$("#linea").change(function() {
		var nombre = $("#linea option:selected").text();
		var id = $(this).val();
		localStorage.busqueda = id;
		// CARGAR ITEMS SECCIONES SEGÚN DEPENDENCIAS
		db.transaction(ConsultaSubLinea);
	});
        
	//ESCANEAR CODIGO QR
	$('#btn_serie').click(function() {
		localStorage.busqueda = "s";
		leer();
	});
	$('#btn_plaqueta').click(function() {
		localStorage.busqueda = "p";
		leer();
	});
	$('#btn_plaqueta_anterior').click(function() {
		localStorage.busqueda = "a";
		leer();
	});

    app.initialize();
	function leer(){
		cordova.plugins.barcodeScanner.scan(
			function(result) {
				//var val = result.text; //console.log($val);
				if(localStorage.busqueda == "s"){
					$("#nserie").val(result.text);		
					$('#nserie').textinput();			
				}else if(localStorage.busqueda == "a"){
					$("#plaqueta_anterior").val(result.text);
					$('#plaqueta_anterior').textinput();					
				}else { //				}else if(localStorage.busqueda == "p"){
					$("#plaqueta").val(result.text);
					$('#plaqueta').textinput();
				}
			},
			function (error){
				alerta (
				    "Error: " + error,  		// message
				    function(){ },         	// callback
				    'Activos',            	// title
				    'Ok'                  	// buttonName
				);
			}
		);
		return false;
	}
	
	// CARGAR ITEMS DE LA BASE DE DATOS
	db.transaction(ConsultaItems);
	db.transaction(ConsultaLinea);
	
});