var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
// Start with the map page
$(window).load(function () {
		var elemento_valor = localStorage.elemento_valor;		 	
		if (elemento_valor == null || elemento_valor == "") window.location = "p2_elemento_buscar.html";
		 /* db.transaction(AlmacenaUsr);
		db.transaction(CargarAtletas); */
		
});

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

/****************************************************************************************************************************************************************/
/**CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS**/ 
function ConsultaItems(tx) {	//tx.executeSql('select id,tipo from publicp_tipo_elemento order by tipo', [], ConsultaItemsCarga,errorCB);
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
		$('#select-native-1').append('<option value="'+id+'">'+nombre+'</option>');
   	}
	/*Refresca estilo para cada uno de los controles*/
	$("#select-native-1").selectmenu('refresh'); //console.log(viddependencia);

}
/****************************************************************************************************************************************************************/

/****************************************************************************************************************************************************************/
/**CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES**/ 
function ConsultaSecciones(tx) {
		//tx.executeSql('select idseccion,nombre from publicsecciones where iddependencia = "'+localStorage.busqueda+'" order by nombre', [], ConsultaSeccionesCarga,errorCB);
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


function GuardaElemento(tx) {
	$.mobile.loading( 'show', { text: 'Almacenando Información....', textVisible: true, theme: 'a', html: "" });
	//OBTIENE EL ID DE LA PERSONA
	$val = localStorage.persona_valor;
	var id_usr = localStorage.id_usr; 
	var cc = $val.split("|");
	
	//OBTIENE EL ELEMENTO A MOSTRAR
	$val = localStorage.elemento_valor; 
	var id_elemento = $val.split("|");
	
	//OBTIENE EL ID DE LA SECCION//
	var seccion = $( "#seccion" ).val();
																		
	//OBTIENE EL ESTADO DEL ELEMENTO
	var estado = $( "#select-native-1" ).val();
	
	//OBTIENE LAS OBSERVACIONES
	var observaciones = $( "#observaciones" ).val();
	
	//FECHA - ID_ENVIO
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
	var id_envio = fecha_captura+'-'+id_usr;

	//OBTIENE LA FIRMA 
	if(localStorage.firma != null && localStorage.firma != ""){
		var firma = localStorage.firma; 	//console.log(Firma);				//Firma = Firma.replace('/""/g','|');	seccion	dependencia
	}

	//INFO GENERAL DEL ELEMENTO		
	console.log('INSERT INTO publicinventario (idseccion,idusuario,cc_responsable,firma,id_envio,activo) values ("'+seccion+'","'+id_usr+'","'+cc[0]+'","'+firma+'","'+id_envio+'","1")');
	tx.executeSql('INSERT INTO publicinventario (idseccion,idusuario,cc_responsable,firma,id_envio,activo) values ("'+seccion+'","'+id_usr+'","'+cc[0]+'","'+firma+'","'+id_envio+'","1")');
	//DETALLE DEL ELMENTO
	console.log('INSERT INTO publicinventario_det (idarticulo,observacion,asignacion,id_estado,id_envio,id_envio_art)' + 
	'values ("'+id_elemento[0]+'","'+observaciones+'","R","'+estado+'","'+id_envio+'","'+id_elemento[3]+'")');
	tx.executeSql('INSERT INTO publicinventario_det (idarticulo,observacion,asignacion,id_estado,id_envio,id_envio_art)' + 
	'values ("'+id_elemento[0]+'","'+observaciones+'","R","'+estado+'","'+id_envio+'","'+id_elemento[3]+'")');
	//ASIGNA RESPONSABLE AL articulo
	console.log('UPDATE publicarticulos set cc_responsable_af = "'+cc[0]+'" where idarticulo = '+id_elemento[0]+' and id_envio != ""');
	console.log('UPDATE publicarticulos set cc_responsable_af = "'+cc[0]+'" where idarticulo = "'+id_elemento[0]+'" and id_envio = ""');
	tx.executeSql('UPDATE publicarticulos set cc_responsable_af = "'+cc[0]+'" where idarticulo = '+id_elemento[0]+' and id_envio != ""');
	tx.executeSql('UPDATE publicarticulos set cc_responsable_af = "'+cc[0]+'" where idarticulo = "'+id_elemento[0]+'" and id_envio = ""');

	//GUARDA FOTOS
	if(localStorage.Fotos != null && localStorage.Fotos != "" && localStorage.Fotos !== undefined && localStorage.Fotos != "undefined"){
		//CARGA FOTOS
		var data = JSON.parse(localStorage.getItem('Fotos'));
		$.each(data, function(i, item) {	//console.log(data[i]);
			tx.executeSql('INSERT INTO publicinventario_fotos (url,id_envio) values ("'+data[i]+'","'+id_envio+'")');
		});
		data.length=0;
		localStorage.Fotos = "";				
	}
	
	$.mobile.loading( 'hide' );

	localStorage.firma = "";
	localStorage.elemento_valor = "";
	//localStorage.persona_valor = "";
	localStorage.busqueda = "";
	localStorage.iddependencia = $('#dependencia').val();
	localStorage.idseccion = $("#seccion").val(); 
	
	db.transaction(function(tx) {
		console.log('select * from publicinventario_det where id_envio = "'+id_envio+'"');
		tx.executeSql('select * from publicinventario_det where id_envio = "'+id_envio+'"', [],
			function MuestraItems(tx, results) {
				var encontrados = results.rows.length; console.log("Encontrados: " + encontrados);
				if(encontrados>0) {
					alerta (
					    "Elemento Guardado exitosamente",  		// message
					    function(){ window.location = "p1_persona_buscar.html"; },         	// callback
					    'Activos',            	// title
					    'Ok'                  	// buttonName
					);
				}else
				{
					alerta (
					    "Elemento NO guardado",  		// message
					    function(){ },         	// callback
					    'Activos',            	// title
					    'Ok'                  	// buttonName
					);
				}
			}	
		);
	} /*, function errorCB(err) {	console.log("Error processing SQL: "+err.code); }
	,function successCB() {	localStorage.firma = ""; }	*/
	);
	
	
}

$(document).ready(function() {
	//INICIALIZACION DE LA PAGINA
	$val = localStorage.elemento_valor; 
	var res = $val.split("|");
	$val = localStorage.persona_valor; 
	var res_persona = $val.split("|");
	$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+'<br>'+res[1]+" - "+res[2]+'</h4>');
	
	//EVENTO CUANDO SE SELECCIONA ALGUNA DEPENDENCIA
	$("#dependencia").change(function() {
		var nombre = $("#dependencia option:selected").text();
		var id = $(this).val();
		localStorage.busqueda = id;
		// CARGAR ITEMS SECCIONES SEGÚN DEPENDENCIAS
		db.transaction(ConsultaSecciones);
	});
	
	
	//GUARDAR FORMULARIO
	$('#btn_ok').click(function() {
		if ($( "#seccion" ).val()==0){
			alerta (
			    "Seleccione una Dependencia/Sección por favor",  		// message
			    function(){ $("#seccion").focus(); },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
			return false;
		}
		if ($( "#select-native-1" ).val()==0){
			alerta (
			    "Seleccione un estado por favor",  		// message
			    function(){ $("#select-native-1").focus(); },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
			return false;
		}
		db.transaction(GuardaElemento);
	});
	
	// CARGAR ITEMS DE LA BASE DE DATOS
	db.transaction(ConsultaItems);
	
});
