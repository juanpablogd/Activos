/**
 * |author
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var busqueda=localStorage.persona_valor;
var res = busqueda.split("|");
// Start with the map page	FIRMA!!!
var firma_defecto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApYAAAFkCAYAAACaQHuFAAAT8UlEQVR4Xu3YwY0bQRAEwVsPpRdt5EvnIeVEEugCggYUBrH9SPD58SNAgAABAgQIECAQCDzBhgkCBAgQIECAAAECP8LSERAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QAB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";

function txtOk(t){	console.log(t);
	if (t != "undefined" && t != undefined){
		t = t.trim();
		return t.replace(/'/g , "").replace(/"/g , "").replace(/\|/g , " ");
	}else{
		return t;
	}
}

function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alerta (
		    "Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message,  // message
		    function(){},         // callback
		    'Activos',            // title
		    'Ok'                  // buttonName
		);
	}
}
function successCB() {
    //console.log("Ok!");
}

/* BUSQUEDA EN LA TABLA PERSONA*/
function CargarListado(tx) {
	if(busqueda!=null){
		var val_ordenar = $('input:radio[name=radio-choice-h-2]:checked').val();		//console.log(ordenar);
		if( val_ordenar  == "Plaqueta" ) {
			var order = "placa_nueva";
		}else{
			var order = "art.nom_articulo";
		}
		$.mobile.loading( 'show', { text: 'Buscando... ', textVisible: true, theme: 'b', html: "" }); 
		  console.log('SELECT id_inventariodet,   sub.nom_sublinea sublinea,   art.nom_articulo,   art.referencia,   art.serie,   inv_det.observacion,   asignacion,   art.id_articulo,   placa_nueva,   art.rowid,   id_envio_art,   inv_det.id_envio,   inv.firma,   sar.nom_estado estado  FROM publicinventario inv  INNER JOIN publicinventario_det inv_det  ON ((   inv.id_inventario = inv_det.id_inventario)   OR (   inv.id_envio = inv_det.id_envio    AND  inv.id_envio != ""))  INNER JOIN publicarticulo art  ON ((   art.id_articulo = inv_det.id_articulo)   OR (   Cast(art.id_envio AS TEXT) = Cast(inv_det.id_envio_art AS TEXT)   AND  art.id_envio != ""))  LEFT JOIN  publicestado_articulo sar  ON sar.id_estado_art = art.id_estado  LEFT JOIN  publicsublinea sub  ON sub.id_sublinea = art.id_sublinea  WHERE  inv.cc_responsable = "'+res[0]+'" order by ' + order + ' limit 128');		  
	    tx.executeSql('SELECT id_inventariodet,   sub.nom_sublinea sublinea,   art.nom_articulo,   art.referencia,   art.serie,   inv_det.observacion,   asignacion,   art.id_articulo,   placa_nueva,   art.rowid,   id_envio_art,   inv_det.id_envio,   inv.firma,   sar.nom_estado estado  FROM publicinventario inv  INNER JOIN publicinventario_det inv_det  ON ((   inv.id_inventario = inv_det.id_inventario)   OR (   inv.id_envio = inv_det.id_envio    AND  inv.id_envio != ""))  INNER JOIN publicarticulo art  ON ((   art.id_articulo = inv_det.id_articulo)   OR (   Cast(art.id_envio AS TEXT) = Cast(inv_det.id_envio_art AS TEXT)   AND  art.id_envio != ""))  LEFT JOIN  publicestado_articulo sar  ON sar.id_estado_art = art.id_estado  LEFT JOIN  publicsublinea sub  ON sub.id_sublinea = art.id_sublinea  WHERE  inv.cc_responsable = "'+res[0]+'" order by ' + order + ' limit 128', [], MuestraItems);
	}
}

function abrir(id){	//console.log(id);
	localStorage.elemento_valor = id;
	window.location = "elemento_editar.html";
}


function desasignar(videnvio,nombre){ console.log(videnvio+" - "+nombre)
	confirmar('Seguro que desea DESASIGNAR: "'+nombre+'"?',
		    function(buttonIndex){	console.log(buttonIndex);
		    	if(buttonIndex == undefined || buttonIndex =="2"){
					db.transaction(function(tx) {
						  console.log('DELETE FROM publicinventario_det where id_envio = "'+videnvio+'"');
						tx.executeSql('DELETE FROM publicinventario_det where id_envio = "'+videnvio+'"');
					}, function errorCBdelete(err) {	console.log("Error processing SQL: "+err.code); }
					,function successCBdelete() {	console.log("Eliminado inventario Detalle: "+videnvio); }
					);
					db.transaction(function(tx) {
						  console.log('DELETE FROM publicinventario where id_envio = "'+videnvio+'"');
						tx.executeSql('DELETE FROM publicinventario where id_envio = "'+videnvio+'"');
					}, function errorCBdeleteok(err) {	console.log("Error processing SQL: "+err.code); }
					,function successCBdeleteok() {	console.log("Eliminado inventario: "+videnvio); 
						console.log("Elemento Desasignado exitosamente");
						alerta (
						    "Elemento Desasignado exitosamente",  		// message
						    function(){ 
								setTimeout(function() { 
									window.location = "persona_verificar.html";
								}, 300);
						    },         	// callback
						    'Activos',            	// title
						    'Ok'                  	// buttonName
						);
					}
					);
		    	}
		    }  
			,'Activos',['Si','No'] );
}

/* RESULTADO DE LA TABLA PERSONA*/
function MuestraItems(tx, results) {
    var li = "";
    var habilitado ="";
	var encontrados = results.rows.length;		console.log(encontrados);
	
	//FECHA - ID_ENVIO
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
	var id_envio = fecha_captura+'-'+localStorage.id_usr;
	localStorage.firma = "";
    for (var i=0;i<encontrados;i++)
	{
	 	var id = results.rows.item(i).id_inventariodet;		//console.log("Id: "+id);
	 	var nombre = results.rows.item(i).nom_articulo;					//console.log( "nombre = " + sessionStorage.getItem("nombre"));
	 	var sublinea = results.rows.item(i).sublinea;
	 	var referencia = results.rows.item(i).referencia;
	 	var numero_serie_af = results.rows.item(i).serie;
	 	var observacion = results.rows.item(i).observacion;
	 	var seleccionado = results.rows.item(i).asignacion; var selR = ""; 	var selN = "";	var selP = "";
	 	var idarticulo = results.rows.item(i).id_articulo;
	 	var plaqueta_af = results.rows.item(i).placa_nueva;
	 	var rowid = results.rows.item(i).rowid;
	 	var id_envio_art = results.rows.item(i).id_envio_art;
	 	var inv_det_id_envio = results.rows.item(i).id_envio;
	 	var firma = results.rows.item(i).firma;
	 	var estado = results.rows.item(i).estado;
	 	var desasignar="";
		//console.log($("#firma_ok").attr('src'));console.log(firma);
		//if($("#firma_ok").attr('src') == undefined){	//console.log("indefinido");
			if(firma != null && firma != ""){	console.log("set firma");
				localStorage.firma = firma;
				console.log("firma OK");
			}
		//}

	 	habilitado = ""; if(id==null || id=="" || id===undefined) habilitado = "disabled";
	 	if(seleccionado == "R"){
	 		selR = "selected";
	 	}else if(seleccionado == "N"){
	 		selN = "selected";
	 	}else
	 	{
	 		selP = "selected";
	 	}
	 	var color = "077803";
	 	if(id_envio_art == "" || id_envio_art == null){
	 		color = "BC0404";
	 	}
	 	var cod_id;
	 	if(id == null){
	 		cod_id = inv_det_id_envio;
	 	}else{
	 		cod_id = id;
	 	}	//console.log(cod_id);
	 	if (id==null || id=="" || id===undefined){
	 		desasignar	= '<div class="ui-input-btn ui-btn ui-icon-delete ui-btn-icon-left">Desasignar<input type="button" onclick="desasignar(\''+cod_id+'\',\''+nombre+'\');" data-enhanced="true" value="Enhanced - Left"></div>';
	 	}
	 	
	    li += "<li value='"+cod_id+"'>"+
			""+
		    	"<div class='ui-block'>"+
			        "<a href='#' onclick=\"abrir('"+idarticulo+"|"+plaqueta_af+"|"+nombre+"|"+rowid+"');\"><h2>"+nombre+"</h2></a>"+
			        "<p style='color:#"+color+"'>"+sublinea+"</p>"+
			        "<p style='color:#"+color+"'>Plaq: "+plaqueta_af+"</p>"+
			        "<p style='color:#"+color+"'>Serie: "+numero_serie_af+"</p>"+
			        "<h1 style='color:#"+color+";font-size: 0.9em;font-weight: 100;'>Estado: "+estado+"</h1>"+
			        "<label for='t"+cod_id+"' style='color:#"+color+"'>Observación:</label><input type='text' name='t"+cod_id+"' id='t"+cod_id+"' style='color:#"+color+"' value='"+observacion+"' "+habilitado+">"+
			        "<p style='color:#"+color+"'>Fotos actualizadas: <label id='nf"+cod_id+"'><label></p>"+
					"<label for='s"+cod_id+"'></label><select class='componentSelect' name='s"+cod_id+"' id='s"+cod_id+"' "+habilitado+"><option value=''></option><option value='N' "+selN+">No reportado</option><option value='P' "+selP+">Pendiente</option><option value='R' "+selR+">Reportado</option></select>" +
					desasignar+
//					'<br><input type="checkbox" name="checkbox-mini-'+cod_id+'" id="checkbox-mini-'+cod_id+'" data-mini="true">'+'<label for="checkbox-mini-'+cod_id+'">Revisado</label>'+
				"</div>"+  
			  ""
			  + "</li>";
			  //(id_envio = "'+results.rows.item(0).id_envio+'" and id_envio != "") or (idarticulo= "'+results.rows.item(0).id+'" and idarticulo != "null")
		if(inv_det_id_envio != "null" && inv_det_id_envio != "" && inv_det_id_envio != undefined && inv_det_id_envio != null){
			  console.log('SELECT count(*) as c, "'+cod_id+'" as rowid FROM publicarticulo_foto where (id_envio ="'+id_envio_art+'" and id_envio != "") or (id_articulo= "'+idarticulo+'" and id_articulo != "null")');
			tx.executeSql('SELECT count(*) as c, "'+cod_id+'" as rowid FROM publicarticulo_foto where (id_envio ="'+id_envio_art+'" and id_envio != "") or (id_articulo= "'+idarticulo+'" and id_articulo != "null")', [], 
				function ConsultaSincronizarInventario(tx, resultnf) {
					$("#nf"+resultnf.rows.item(0).rowid).html(resultnf.rows.item(0).c);
				}	//nf2017-10-4-11_12_29-1
			);
		}
    } //console.log("hab: " + habilitado);
    $.mobile.loading( 'hide');
    if(encontrados>0 ){
    	$("#Lencontrado").append('');
    	if($('#div_firma').is(':visible')){
			if(!$('#firma_ok').is(':visible')) $("#img_firma").append('<img id="firma_ok" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApYAAAFkCAYAAACaQHuFAAAT8UlEQVR4Xu3YwY0bQRAEwVsPpRdt5EvnIeVEEugCggYUBrH9SPD58SNAgAABAgQIECAQCDzBhgkCBAgQIECAAAECP8LSERAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QAB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" width="100%"  height="300px">');
			if(!$('#chkEditarfirma').is(':visible')) $("#div_firma").append('<form><label><input type="checkbox" name="chkEditarfirma" id="chkEditarfirma">Editar Firma</label></form><br><p id="contenidoFirma" style="display: none;">Escriba su firma a continuación:<br><iframe id="firmar" src="firma.html" width="680px" frameborder="0"></iframe></p>');
		    $('#chkEditarfirma').change(function() {
		        if($(this).is(":checked")) {
		            console.log("checked");
		            $("#contenidoFirma").show();
		            $("#guardar").focus();
		        }else{
		        	console.log("NO checked");
		        	$("#contenidoFirma").hide();
		        }
		        
		    });
		}	//console.log($("#guardar").length);
		if ($("#guardar").length == 0  ) {
			$("#pie").append('<button class="ui-btn ui-corner-all ui-btn-b" id="guardar" value="guardar">Guardar</button>');
		}
    	
    	$("#guardar").click(function(){		//console.log(comprobarCamposRequired());
			if(comprobarCamposRequired()){
				if($('#div_firma').is(':visible')){
					if(!(localStorage.firma != "" && localStorage.firma !== undefined && firma_defecto != localStorage.firma)){
						alerta (
						    "Debe registrar una Firma antes de continuar",  		// message
						    function(){ },         	// callback
						    'Activos',            	// title
						    'Ok'                  	// buttonName
						);
						return false;
					}	
				}
				console.log("GUARDAR");
				$.mobile.loading( 'show', { text: 'Guardando Información....', textVisible: true, theme: 'a', html: "" });
				if($('#div_firma').is(':visible')){
					db.transaction(function(tx) {
						tx.executeSql('SELECT rowid,id_envio FROM publicinventario inv where inv.cc_responsable ="'+res[0]+'"', [], 
							function rsp(tx, resultado){	//console.log(resultado.rows.length);	//results.rows.length
								var num_found = resultado.rows.length;
								var have_idenvio = false;
								var last_rowid=999999;
								for (var l=0;l<num_found;l++){
									if(resultado.rows.item(l).id_envio!= "") have_idenvio=true;
									if((l+1)==num_found) last_rowid = resultado.rows.item(l).rowid;
								}
								if(have_idenvio){
									db.transaction(function(tx) {
										  console.log('UPDATE publicinventario SET firma = "'+localStorage.firma+'" where rowid = "'+last_rowid+'"');
										tx.executeSql('UPDATE publicinventario SET firma = "'+localStorage.firma+'" where rowid = "'+last_rowid+'"');
									}, function errorCB(err) {
											$.mobile.loading( 'hide' );	
											alerta (
											    "Error processing SQL: "+err.code,  		// message
											    function(){ },         	// callback
											    'Activos',            	// title
											    'Ok'                  	// buttonName
											);
									}
									,function successCB() {	localStorage.firma = ""; }
									);
								}else{
									db.transaction(function(tx) {
								  		  console.log('UPDATE publicinventario SET firma = "'+localStorage.firma+'",id_envio = "'+id_envio+"-"+id+'" where rowid = "'+last_rowid+'"');
										tx.executeSql('UPDATE publicinventario SET firma = "'+localStorage.firma+'",id_envio = "'+id_envio+"-"+id+'" where rowid = "'+last_rowid+'"');
									}, function errorCB(err) {
										$.mobile.loading( 'hide' );	
										alerta (
										    "Error processing SQL: "+err.code,  		// message
										    function(){ },         	// callback
										    'Activos',            	// title
										    'Ok'                  	// buttonName
										);
									}
									,function successCB() {	localStorage.firma = ""; }
									);
								}
							});
					});
				}
				var last_id;
				var j =0;
				var encontrados = $('li.ui-li-static').size();	//console.log(encontrados);
			   $('li.ui-li-static').each(function () {			//console.log("valor:" + $(this).val() + " id: " + $(this).attr('value'));
			   		var condicion,tmp_idenvio;
					var id = $(this).attr('value');							//console.log("iD: " + id);
					var tipo = id.split("_");						console.log(tipo.length); //return false;
					var texto = txtOk($("#t"+id).val());
			    	var seleccion = $("#s"+id).val();
			    	if(tipo.length==1){
			    		tmp_idenvio = id_envio+"-"+id;
			    		condicion = 'id_inventariodet = "'+id+'"';
			    	}else{
			    		tmp_idenvio = id;
			    		condicion = 'id_envio = "'+id+'"';
			    	}
			    	       console.log('UPDATE publicinventario_det SET observacion = "'+texto+'",asignacion = "'+seleccion+'",id_envio = "'+tmp_idenvio+'" WHERE '+condicion);
			    	db.transaction(function(txu) {
						txu.executeSql('UPDATE publicinventario_det SET observacion = "'+texto+'",asignacion = "'+seleccion+'",id_envio = "'+tmp_idenvio+'" WHERE '+condicion,[]
							,function successCBU() { //console.log("Web SQL - update ok");
								j++;	console.log("Registro: " + j + " de " + encontrados);
		    					if(j==encontrados){
		    						setTimeout(function() {
		    							$.mobile.loading( 'hide' );
										alerta (
										    "Verificación Exitosa!",  		// message
										    function(){
										    	window.location = "p1_persona_buscar.html";
										    },         	// callback
										    'Activos',            	// title
										    'Ok'                  	// buttonName
										);								   		
								   	}, 480);
		    					}	
							}, function errorCBU(err) {	
								$.mobile.loading( 'hide' );
								alerta (
								    "Error processing SQL: "+err.code,  		// message
								    function(){ },         	// callback
								    'Activos',            	// title
								    'Ok'                  	// buttonName
								);
							}
						)
					});
			   });

			}
		});

		//HABILITA BOTON GUARDAR
		var firma = localStorage.firma;
		if(firma != "" && firma != undefined && firma != "null" && localStorage.firma != firma_defecto && localStorage.elemento_valor != ""){
			$("#firma_ok").attr("src",localStorage.firma);
			//$("#btn5").removeAttr("disabled");
			console.log("Inicializa!!!");
		}
		
		//ACTUALIZA LA FIRMA
		setInterval(function(){
		 	var src = $("#firma_ok").attr("src");
			if(localStorage.firma != src ){
				    var image = $("#firma_ok");
					image.attr("src", localStorage.firma);
					//localStorage.src = localStorage.firma;
					//console.log("Js Firma Destino");
			}
		}, 100);
		
    }else{
    	console.log("Elem Encontrados: "+encontrados);
    	$("#Lencontrado").append('<h4>NO HAY ELEMENTOS ENCONTRADOS!</h4>');
    }
    
	$("ul#lista").empty().append(li).listview("refresh");
	$("ul#lista").trigger("create");
	$('select').on('change', function() {
		var id = this.id.split("s"); 
	  	$('#t'+id[1]).focus();
	});
}


$(document).ready(function() {
	//INHABILITA FIRMA
/*	$("#div_firma").hide();
	$("#firma_ok").hide(); */
	$("#titulo").html(localStorage.nom_empresa);

	$("#seleccionado").html('<h4 align="center">CC: '+res[0]+"  - "+res[1]+' '+res[2]+'</h4>');
	db.transaction(CargarListado);
	
	
	$("input[name=radio-choice-h-2]").click(function () {
		db.transaction(CargarListado);    
    });
	
	
});

function comprobarCamposRequired(){
	var correcto=true;
/*	if(correcto==true){
	   $(':input').each(function () {	console.log("valor:" + $(this).val() + " id: " + $(this).attr('id'));
		      if($(this).val() =='' || $(this).val() === ""){		console.log("Entró");
		         correcto=false;
		         var currentId = $(this).attr('id');	console.log(currentId);
				alerta (
				    "Por favor complete el la información",  		// message
				    function(){ },         	// callback
				    'Activos',            	// title
				    'Ok'                  	// buttonName
				);
		         $("#"+currentId).focus();
		         return false;
		      }
	   });
	}	*/
/*	$('select').each(function () {	//console.log("valor:" + $(this).val() + " id: " + $(this).attr('id'));
		if(correcto==true){
	   		var valselect = $(this).val();
	   		var selectid = $(this).attr('id').substring(1);		console.log(selectid);
	   		if(valselect == "R"){
	   			var valabel = $("#nf"+selectid).text();	console.log(valabel);
	   			if(valabel == "0"){
	   				correcto=false;
					alerta (
					    "Debe capturar alguna foto para este elemento",  		// message
					    function(){ },         	// callback
					    'Activos',            	// title
					    'Ok'                  	// buttonName
					);
	   				$(this).focus();
	   				return false;
	   			}
	   		}
	   	}
	});	*/
	//console.log( correcto);
	return correcto;
}