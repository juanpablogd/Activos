/**
 * @author LONJA
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var busqueda=localStorage.persona_valor;
var res = busqueda.split("@");
// Start with the map page	FIRMA!!!
var firma_defecto = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApYAAAFkCAYAAACaQHuFAAAT8UlEQVR4Xu3YwY0bQRAEwVsPpRdt5EvnIeVEEugCggYUBrH9SPD58SNAgAABAgQIECAQCDzBhgkCBAgQIECAAAECP8LSERAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QAB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";

function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
}
function successCB() {
    //alert("Ok!");
}

/* BUSQUEDA EN LA TABLA PERSONA*/
function CargarListado(tx) {
	if(busqueda!=null){
		var val_ordenar = $('input:radio[name=radio-choice-h-2]:checked').val();		//alert(ordenar);
		if( val_ordenar  == "Plaqueta" ) {
			var order = "plaqueta_af";
		}else{
			var order = "art.nombre";
		} 
		console.log('SELECT idinventariodet,sub.nombre sublinea,art.nombre,art.referencia,art.numero_serie_af,observacion,asignacion,art.idarticulo,plaqueta_af,art.rowid,id_envio_art FROM publicinventario inv inner join publicinventario_det inv_det on ((inv.idinventario = inv_det.idinventario) or (inv.id_envio = inv_det.id_envio and inv.id_envio != "")) inner join publicarticulos art on ((art.idarticulo  = inv_det.idarticulo and (inv.id_envio = "" or inv_det.id_envio_art ="")) or (CAST(art.id_envio as text) = CAST(inv_det.id_envio_art as text) and art.id_envio != "")) left join publicsublineas sub on sub.idslinea = art.idslinea where inv.cc_responsable ="'+res[0]+'" order by ' + order);		  
	    tx.executeSql('SELECT idinventariodet,sub.nombre sublinea,art.nombre,art.referencia,art.numero_serie_af,observacion,asignacion,art.idarticulo,plaqueta_af,art.rowid,id_envio_art FROM publicinventario inv inner join publicinventario_det inv_det on ((inv.idinventario = inv_det.idinventario) or (inv.id_envio = inv_det.id_envio and inv.id_envio != "")) inner join publicarticulos art on ((art.idarticulo  = inv_det.idarticulo and (inv.id_envio = "" or inv_det.id_envio_art ="")) or (CAST(art.id_envio as text) = CAST(inv_det.id_envio_art as text) and art.id_envio != "")) left join publicsublineas sub on sub.idslinea = art.idslinea where inv.cc_responsable ="'+res[0]+'" order by ' + order, [], MuestraItems);
	}
}

function abrir(id){
	//alert(id);
	localStorage.elemento_valor = id;
	window.location = "elemento_editar.html";
}

/* RESULTADO DE LA TABLA PERSONA*/
function MuestraItems(tx, results) {
    var li = "";
    var habilitado ="";
	 	//li += '<li data-role="searchpage-list">Resultados </li>';				//<span class="ui-li-count">2</span>
	var encontrados = results.rows.length;		console.log(encontrados);
	
	//FECHA - ID_ENVIO
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
	var id_envio = fecha_captura+'-'+localStorage.id_usr;
	
    for (var i=0;i<encontrados;i++)
	{
	 	var id = results.rows.item(i).idinventariodet;		//console.log("Id: "+id);
	 	var nombre = results.rows.item(i).nombre;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	var sublinea = results.rows.item(i).sublinea;
	 	var referencia = results.rows.item(i).referencia;
	 	var numero_serie_af = results.rows.item(i).numero_serie_af;
	 	var observacion = results.rows.item(i).observacion;
	 	var seleccionado = results.rows.item(i).asignacion; var selR = ""; 	var selN = "";	var selP = "";
	 	var idarticulo = results.rows.item(i).idarticulo;
	 	var plaqueta_af = results.rows.item(i).plaqueta_af;
	 	var rowid = results.rows.item(i).rowid;
	 	var id_envio_art = results.rows.item(i).id_envio_art;

	 	habilitado = ""; if(id==null || id=="" || id===undefined ) habilitado = "disabled";
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
	 	
	 	//idarticulo+"@"+plaqueta_af+"@"+nombre+"@"+id
	    li += "<li value='"+id+"'>"+
			""+
		    	"<div class='ui-block'>"+
			        "<a href='#' onclick=\"abrir('"+idarticulo+"@"+plaqueta_af+"@"+nombre+"@"+rowid+"');\"><h2>"+nombre+"</h2></a>"+
			        "<p style='color:#"+color+"'>"+sublinea+"</p>"+
			        "<p style='color:#"+color+"'>Plaq: "+plaqueta_af+"</p>"+
			        "<p style='color:#"+color+"'>Serie: "+numero_serie_af+"</p>"+
			        "<label for='t"+id+"' style='color:#"+color+"'>Observación:</label><input type='text' name='t"+id+"' id='t"+id+"' style='color:#"+color+"' value='"+observacion+"' "+habilitado+">"+
					"<label for='s"+id+"'></label><select class='componentSelect' name='s"+id+"' id='s"+id+"' "+habilitado+"><option value=''></option><option value='N' "+selN+">No reportado</option><option value='P' "+selP+">Pendiente</option><option value='R' "+selR+">Reportado</option></select>" +
				"</div>"+  
			  ""
			  + "</li>";  
    } //console.log("hab: " + habilitado);
    if(encontrados>0 ){
    	$("#Lencontrado").append('');
		$("#img_firma").append('<img id="firma_ok" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApYAAAFkCAYAAACaQHuFAAAT8UlEQVR4Xu3YwY0bQRAEwVsPpRdt5EvnIeVEEugCggYUBrH9SPD58SNAgAABAgQIECAQCDzBhgkCBAgQIECAAAECP8LSERAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QABAgQIECBAgEAiICwTRiMECBAgQIAAAQLC0g0QIECAAAECBAgkAsIyYTRCgAABAgQIECAgLN0AAQIECBAgQIBAIiAsE0YjBAgQIECAAAECwtINECBAgAABAgQIJALCMmE0QoAAAQIECBAgICzdAAECBAgQIECAQCIgLBNGIwQIECBAgAABAsLSDRAgQIAAAQIECCQCwjJhNEKAAAECBAgQICAs3QAB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" width="100%"  height="300px">');
		$("#div_firma").append('Escriba su firma a continuación:<br><iframe id="firmar" src="firma.html" width="680px" frameborder="0" ></iframe>');
		$("#pie").append('<button class="ui-btn ui-corner-all ui-btn-b" id="guardar" value="guardar">Guardar</button>');
    	
    	$("#guardar").click(function(){
    		console.log(comprobarCamposRequired());
			if(comprobarCamposRequired()){
				if(localStorage.firma != "" && firma_defecto != localStorage.firma){
						console.log("GUARDAR");
						db.transaction(function(tx) {
							console.log('UPDATE publicinventario SET firma = "'+localStorage.firma+'" where cc_responsable = "'+res[0]+'"');
							tx.executeSql('UPDATE publicinventario SET firma = "'+localStorage.firma+'" where cc_responsable = "'+res[0]+'"');
						}, function errorCB(err) {	alert("Error processing SQL: "+err.code); }
						,function successCB() {	localStorage.firma = ""; }
						);
						var last_id;
						var j =0;
						   $(':input').each(function () {	console.log("valor:" + $(this).val() + " id: " + $(this).attr('id'));
					   			var str = $(this).attr('id');	
					    		var id = str.substr(1, str.len); console.log(last_id + " ID> " + id);
					    		if(id != null && id != "null"){		//SI EL ELEMENTO TIENE ID DE DETALLE
						    		if(last_id != id ){
						    			var texto = $("#t"+id).val();
						    			var seleccion = $("#s"+id).val();
						    			if(texto != undefined && seleccion != undefined){
						    				function errorCB(err) 	{	console.log("Error processing SQL: "+err.code);	}
						    				function successCB(err) {
						    					j++;
						    					last_id = id;
						    					console.log("Registro: " + j + " de " + encontrados);
						    					if(j==encontrados){
												   alert("Registro Almacenado correctamente!");
												   //
												   //window.location = "principal.html";			    						
						    					}	
											}
							    			console.log('UPDATE publicinventario_det SET observacion = "'+texto+'",asignacion = "'+seleccion+'",id_envio = "'+id_envio+"-"+id+'" WHERE idinventariodet = "'+id+'"');
							    			db.transaction(function(tx) {
												tx.executeSql('UPDATE publicinventario_det SET observacion = "'+texto+'",asignacion = "'+seleccion+'",id_envio = "'+id_envio+"-"+id+'" WHERE idinventariodet = "'+id+'"');
											}, errorCB, successCB);
						    			}
						    		}
					    		}else{
			    					j++;
			    					console.log("Registro: " + j + " de " + encontrados);
			    					if(j==encontrados){
									   alert("Registro Almacenado correctamente");
									   //localStorage.firma = "";
									   //window.location = "principal.html";			    						
			    					}	
					    		}
						   });
				}else {
					alert("Debe registrar una Firma antes de continuar");
				}
			}else{
				alert("Complete todos los campos");
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
					console.log("Js Firma Destino");
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
	$("#seleccionado").html('<h4 align="center">CC: '+res[0]+"  - "+res[1]+' '+res[2]+'</h4>');
	db.transaction(CargarListado);
	
	
	$("input[name=radio-choice-h-2]").click(function () {
		db.transaction(CargarListado);    
/*        alert("La edad seleccionada es: " + $('input:radio[name=radio-choice-h-2]:checked').val());
        alert("La edad seleccionada es: " + $(this).val());	*/
    });
	
	
});

function comprobarCamposRequired(){
	var correcto=true;
	if(correcto==true){
	   $(':input').each(function () {	//console.log("valor:" + $(this).val() + " id: " + $(this).attr('id'));
		      if($(this).val() =='' || $(this).val() === ""){		//console.log("Entró");
		         correcto=false;
		         var currentId = $(this).attr('id');	//console.log(currentId);
		         $("#"+currentId).focus();
		         return false;
		      }
	   });
	}
	
	//console.log( correcto);
	return correcto;
}