/**
 * |author LONJA
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var busqueda=localStorage.elemento_valor;
var res = busqueda.split("|");
var lineas,sublineas,id_estados,vid_envio,vid_articulo,vida;

function txtOk(t){	console.log(t);
	if (t != "undefined" && t != undefined){
		t = t.trim();
		return t.replace(/'/g , "").replace(/"/g , "").replace(/\|/g , " ");
	}else{
		return t;
	}
}

function leer(ident){
	console.log(ident);
	cordova.plugins.barcodeScanner.scan(
		function(result) {
			if(result.text != ""){
				ident.value = result.text;	
			}
			//$("#"+ident).textinput();					
		},
		function (error){
			alerta (
			    "Error processing SQL: "+error.message,  		// message
			    function(){ },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
		}
	);
	return false;
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

/**CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS**/ 
function ConsultaItemSelect(tx) { console.log("ConsultaItemSelect");
		//console.log('select iddependencia,nombre from publicdependencias order by nombre');
		//tx.executeSql('select iddependencia,nombre from publicdependencias order by nombre', [], ConsultaItemSelectCarga,errorCB);
		tx.executeSql('select id_estado,nombre from publicestadoarticulo order by nombre', [], ConsultaLoadEstado,errorCB);
		tx.executeSql('select idlinea,nombre from publiclineas order by nombre', [], ConsultaLineaCarga,errorCB);
}

function ConsultaLoadEstado(tx, results) {
	var len = results.rows.length;	//console.log(len);
	var seleccionado;
	for (i = 0; i < len; i++){
		seleccionado = "";
		var nombre = results.rows.item(i).nombre;
		var id = results.rows.item(i).id_estado;
		if(id_estados == id) seleccionado = "selected";		//console.log(id_estados + " " + id);
		$('#es'+vida).append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');
		//console.log(i);
   	}
	/*Refresca estilo para cada uno de los controles*/
	//console.log("refresh");
	$('#es'+vida).selectmenu('refresh');

}
/****************************************************************************************************************************************************************/
/****************************************************************************************************************************************************************/
/**CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR LÍNEA****CARGAR ITEMS**/ 
function ConsultaLineaCarga(tx, results) {
	var lenl = results.rows.length;	//console.log(lenl);
	var seleccionado;
	for (l = 0; l < lenl; l++){
		seleccionado = "";
		var nombre = results.rows.item(l).nombre;
		var id = results.rows.item(l).idlinea;
		if(lineas == id) seleccionado = "selected";	//id_estados
		$('#li'+vida).append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');
   	}
   	if(lenl>0){
   		$('#li'+vida).change(function() {
			var nombre = $("#li"+vida+" option:selected").text();
			var id = $(this).val();
			localStorage.busqueda = id;
			// CARGAR ITEMS SECCIONES SEGÚN DEPENDENCIAS
			db.transaction(ConsultaSubLinea);
		});

		localStorage.busqueda = $('#li'+vida).val();
		// CARGAR ITEMS SECCIONES SEGÚN DEPENDENCIAS
		db.transaction(ConsultaSubLinea);
   	}
   	$('#li'+vida).selectmenu('refresh');

}
/****************************************************************************************************************************************************************/

/****************************************************************************************************************************************************************/
/**CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA****CARGAR SUBLÍNEA**/ 
function ConsultaSubLinea(tx) {
		tx.executeSql('select idslinea,nombre from publicsublineas where idlinea = "'+localStorage.busqueda+'" order by nombre', [], ConsultaSubLineaCarga,errorCB);
}
function ConsultaSubLineaCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	var seleccionado;
	$('#sb'+vida).empty();
	
	for (i = 0; i < len; i++){
		seleccionado = "";
		var nombre = results.rows.item(i).nombre;
		var id = results.rows.item(i).idslinea;
		if(sublineas == id) seleccionado = "selected";
		$('#sb'+vida).append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');

   	}
	/*Refresca estilo para cada uno de los controles*/
    $('#sb'+vida).selectmenu('refresh');
}
/****************************************************************************************************************************************************************/
/****************************************************************************************************************************************************************/
/* BUSQUEDA EN LA TABLA PERSONA*/
function CargarListado(tx) {
	if(busqueda!=null){	
	      console.log("SELECT sub.idlinea,sub.idslinea,art.nombre,art.referencia,art.numero_serie_af,plaqueta_af,plaqueta_anterior1_af,art.id_envio,marca_af,id_estado,art.idarticulo FROM publicarticulos art left join publicsublineas sub on sub.idslinea = art.idslinea  where art.rowid ='"+res[3]+"'");
	    tx.executeSql("SELECT sub.idlinea,sub.idslinea,art.nombre,art.referencia,art.numero_serie_af,plaqueta_af,plaqueta_anterior1_af,art.id_envio,marca_af,id_estado,art.idarticulo FROM publicarticulos art left join publicsublineas sub on sub.idslinea = art.idslinea  where art.rowid ='"+res[3]+"'", [], MuestraItems);
	}
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
	 	var id = res[3];		//console.log("Id: "+id);
	 	var nombre = results.rows.item(i).nombre;					//console.log( "nombre = " + sessionStorage.getItem("nombre"));
	 	var sublinea = results.rows.item(i).sublinea;
	 	var referencia = results.rows.item(i).referencia;
	 	var numero_serie_af = results.rows.item(i).numero_serie_af;
	 	var plaqueta_af = results.rows.item(i).plaqueta_af;
	 	var plaqueta_anterior1_af = results.rows.item(i).plaqueta_anterior1_af;
	 	var id_envio_ant = results.rows.item(i).id_envio;	console.log("ART id_envio: "+results.rows.item(i).id_envio);
	 	vid_envio = results.rows.item(i).id_envio;
	 	var marca_af = results.rows.item(i).marca_af;
	 	lineas = results.rows.item(i).idlinea;
	 	sublineas = results.rows.item(i).idslinea;
	 	id_estados = results.rows.item(i).id_estado;
	 	vid_articulo = results.rows.item(i).idarticulo;
	 	vida = res[3];
	 	
	    li += "<li value='"+res[3]+"'>"+
			""+
		    	"<div class='ui-block'>"+
					'<div data-role="fieldcontain" class="ui-field-contain"><label for="li'+id+'" class="select">L&iacute;nea:</label><select name="li'+id+'" id="li'+id+'"><option value="">Seleccione...</option></select></div>'+
					'<div data-role="fieldcontain" class="ui-field-contain"><label for="sb'+id+'" class="select">Sub L&iacute;nea:</label><select name="sb'+id+'" id="sb'+id+'" required><option value="">Seleccione...</option></select></div>'+
					"<h3>Nombre</h3><input type='text' name='nb"+id+"' id='nb"+id+"' value='"+nombre+"' data-theme='a'>"+
			        "<a href='#' id='btn_plaqueta' OnClick='leer(p"+id+")' class='ui-btn ui-btn-inline ui-btn-icon-left ui-icon-search'>Plaqueta Nueva</a>"+
			        "<input type='text' name='p"+id+"' id='p"+id+"' value='"+plaqueta_af+"' data-theme='a'>"+
			        "<a href='#' id='btn_plaqueta_anterior' OnClick='leer(pa"+id+")' class='ui-btn ui-btn-inline ui-btn-icon-left ui-icon-search'>Plaqueta Anterior</a>"+
			        "<input type='text' name='pa"+id+"' id='pa"+id+"' value='"+plaqueta_anterior1_af+"' data-theme='a'>"+
			        "<h3>Marca</h3><input type='text' name='mr"+id+"' id='mr"+id+"' value='"+marca_af+"' data-theme='a'>"+
			        "<h3>Referencia</h3><input type='text' name='rf"+id+"' id='rf"+id+"' value='"+referencia+"' data-theme='a'>"+
			        "<a href='#' id='btn_serie' OnClick='leer(ns"+id+")' class='ui-btn ui-btn-inline ui-btn-icon-left ui-icon-search'>N. Serie</a>"+
			        "<input type='text' name='ns"+id+"' id='ns"+id+"' value='"+numero_serie_af+"' data-theme='a'>"+
					'<div data-role="fieldcontain" class="ui-field-contain"><label for="es'+id+'" class="select">Estado:</label><select name="es'+id+'" id="es'+id+'"><option value="">Seleccione...</option></select></div>'+
				"</div>"+  
			  ""
			  + "</li>";  
    }
    
    if(encontrados>0 ){
    	db.transaction(CargarFotos);
    	//$("#pie").append('<button class="ui-btn ui-corner-all ui-btn-b" id="guardar" value="guardar">Guardar</button>');
    	$("#guardar").click(function(){
    		var id = res[3];
			if(comprobarCamposRequired()){ 
				console.log("GUARDAR");	//return false;
				$.mobile.loading( 'show', { text: 'Guardando Información....', textVisible: true, theme: 'a', html: "" });
				var last_id;
				var count = 0;
				   $(':input').each(function () {	//console.log("valor:" + $(this).val() + " id: " + $(this).attr('id'));
			   			var str = $(this).attr('id');	
			    		var id = str.substr(1, str.len); console.log(last_id + " ID> " + id); 
			    		if(last_id != id){
			    			var idslinea = $("#sb"+id).val();
			    			var nombre = txtOk($("#nb"+id).val());
			    			var texto_plaqueta = txtOk($("#p"+id).val());
			    			var texto_plaquetanterior = txtOk($("#pa"+id).val());
			    			var marca_af = txtOk($("#mr"+id).val());
			    			var referencia = txtOk($("#rf"+id).val());
			    			var numero_serie_af = txtOk($("#ns"+id).val());
			    			var id_estado = $("#es"+id).val();					//console.log(JSON.stringify(res));
			    			if(texto_plaqueta != undefined && texto_plaquetanterior != undefined){
								function errorCBU(err) {
									$.mobile.loading( 'hide' );
									if (err.code != "undefined" && err.message != "undefined"){
										alerta (
										    "Error al guardar, revise los caracteres especiales: \n" + " Mensaje: " + err.message + err.code,  		// message
										    function(){ },         	// callback
										    'Activos',            	// title
										    'Ok'                  	// buttonName
										);
									}  
								}
								function successCBU() {
								   db.transaction(function(tx) {
								   		if(res[0]!="" && res[0]!="null"){
								   			  console.log('DELETE FROM publicarticulos_fotos WHERE idarticulo = "'+res[0]+'"');
								   			tx.executeSql('DELETE FROM publicarticulos_fotos WHERE idarticulo = "'+res[0]+'"');
								   		}else{
								   			console.log('DELETE FROM publicarticulos_fotos WHERE id_envio = "'+res[5]+'"');
								   			tx.executeSql('DELETE FROM publicarticulos_fotos WHERE id_envio = "'+res[5]+'"');
								   		}
								   		
								   });
									//GUARDA FOTOS
									var totalFotos=1;
									if(localStorage.Fotos != null && localStorage.Fotos != "" && localStorage.Fotos !== undefined && localStorage.Fotos != "undefined"){
										//CARGA FOTOS
										var data = JSON.parse(localStorage.getItem('Fotos')); console.log(data);
										totalFotos = data.length;
										$.each(data, function(i, item) {	
											db.transaction(function(tx) {	//console.log(item);
												if(res[0]!="" && res[0]!="null"){
													  //console.log('INSERT INTO publicarticulos_fotos (url,idarticulo) values ("'+item+'","'+res[0]+'")');
													tx.executeSql('INSERT INTO publicarticulos_fotos (url,idarticulo) values ("'+item+'","'+res[0]+'")');	
												}else{
													  //console.log('INSERT INTO publicarticulos_fotos (url,id_envio) values ("'+item+'","'+res[5]+'")');
													tx.executeSql('INSERT INTO publicarticulos_fotos (url,id_envio) values ("'+item+'","'+res[5]+'")');	
												}
												
											});
										});
										data.length=0;
										localStorage.Fotos = "";				
									}
								    count++;	console.log("Contador:"+count);
								    if(count==encontrados){	console.log(totalFotos);
										setTimeout(function() { //idarticulo+"|"+plaqueta_af+"|"+nombre+"|"+rowid+"|"+id_estado+"|"+id_envio
											localStorage.elemento_valor = res[0]+"|"+texto_plaqueta+"|"+nombre+"|"+res[3]+"|"+id_estado+"|"+res[5];
											console.log(localStorage.elemento_valor);
											$.mobile.loading( 'hide' );
											alerta (
											    "Elemento editado Exitosamente!",  		// message
											    function(){ window.location = "p2_elemento_buscar.html"; },         	// callback
											    'Activos',            	// title
											    'Ok'                  	// buttonName
											);
										}, totalFotos*120);
								    }
								}
				    			db.transaction(function(tx) {
				    				if(res[0]!="" && res[0]!="null"){
				    				  	  console.log('UPDATE publicarticulos SET nombre = "'+nombre+'",idslinea = "'+idslinea+'",plaqueta_af = "'+texto_plaqueta+'",plaqueta_anterior1_af = "'+texto_plaquetanterior+'",marca_af = "'+marca_af+'",referencia = "'+referencia+'",numero_serie_af = "'+numero_serie_af+'",id_estado = "'+id_estado+'",idusuario_envio="'+localStorage.id_usr+'",id_envio = "'+id_envio+'" WHERE rowid = "'+id+'"');
										tx.executeSql('UPDATE publicarticulos SET nombre = "'+nombre+'",idslinea = "'+idslinea+'",plaqueta_af = "'+texto_plaqueta+'",plaqueta_anterior1_af = "'+texto_plaquetanterior+'",marca_af = "'+marca_af+'",referencia = "'+referencia+'",numero_serie_af = "'+numero_serie_af+'",id_estado = "'+id_estado+'",idusuario_envio="'+localStorage.id_usr+'",id_envio = "'+id_envio+'" WHERE rowid = "'+id+'"');				    					
				    				}else{
				    				  	  console.log('UPDATE publicarticulos SET nombre = "'+nombre+'",idslinea = "'+idslinea+'",plaqueta_af = "'+texto_plaqueta+'",plaqueta_anterior1_af = "'+texto_plaquetanterior+'",marca_af = "'+marca_af+'",referencia = "'+referencia+'",numero_serie_af = "'+numero_serie_af+'",id_estado = "'+id_estado+'",idusuario_envio="'+localStorage.id_usr+'" WHERE rowid = "'+id+'"');
										tx.executeSql('UPDATE publicarticulos SET nombre = "'+nombre+'",idslinea = "'+idslinea+'",plaqueta_af = "'+texto_plaqueta+'",plaqueta_anterior1_af = "'+texto_plaquetanterior+'",marca_af = "'+marca_af+'",referencia = "'+referencia+'",numero_serie_af = "'+numero_serie_af+'",id_estado = "'+id_estado+'",idusuario_envio="'+localStorage.id_usr+'" WHERE rowid = "'+id+'"');				    					
				    				}
								}, errorCBU, successCBU
								);
				    			last_id = id;			    				
			    			}
			    		}
				   });
			}
		});

		$('#btn_plaqueta').click(function() {
			localStorage.busqueda = "p";
			leer();
		});
		$('#btn_plaqueta_anterior').click(function() {
			localStorage.busqueda = "a";
			leer();
		});
		
		
    }
    
	$("ul#lista").empty().append(li).listview("refresh");
	$("ul#lista").trigger("create");

	db.transaction(ConsultaItemSelect);

}

function CargarFotos(tx) {
      console.log('SELECT url,id_envio FROM publicarticulos_fotos where (id_envio = "'+vid_envio+'" and id_envio != "") or (idarticulo= "'+vid_articulo+'" and idarticulo != "null")');
    tx.executeSql('SELECT url,id_envio FROM publicarticulos_fotos where (id_envio = "'+vid_envio+'" and id_envio != "") or (idarticulo= "'+vid_articulo+'" and idarticulo != "null")', [], MuestraFotos);

}
function MuestraFotos(tx, results) {
    var li = "";
    var habilitado ="";
	 	//li += '<li data-role="searchpage-list">Resultados </li>';				//<span class="ui-li-count">2</span>
	var encontrados = results.rows.length;		//console.log(encontrados);
	
	//FECHA - ID_ENVIO
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
	var id_envio = fecha_captura+'-'+localStorage.id_usr;

    var arr_tmp_fotos = new Array();	console.log(localStorage.getItem('Fotos'));				//CREA NUEVO ARRAY PARA LAS FOTOS
    //if(localStorage.getItem('Fotos')!=""){ var arr_tmp_fotos = JSON.parse(localStorage.getItem('Fotos'));}

    for (var i=0;i<encontrados;i++){
    	var src = results.rows.item(i).url;
		//VERIFICA SI EXISTEN ELEMENTOS IMG, SI HAY VERIFICA SI HAY DISPONIBILIDAD PARA CAPTURA DE FOTOGRAFÍA
		var img_disponible = false;
		//ARRAY DE FOTOS
		$("img").each(function() {
			if($(this).attr('src')=="" || $(this).attr('src')==null){
				NomIdimage=$(this).attr('id');
				img_disponible = true;
				return false; 											//Espacio Disponible
			}
		});																	//	console.log(img_disponible);
		//SI NO EXISTE CREA EL ELEMENTO IMG PARA ALMACENAR LA FOTO
		if(img_disponible==false){
			$("#lista_fotos").append('<div id="bloque'+i_foto+'"><img id="cameraImage'+i_foto+'" src="" width="320" height="210" align="center"/><button onclick="elimina_foto('+i_foto+')" id="btn_elimina'+i_foto+'" data-theme="a" data-icon="arrow-u" data-mini="true" data-iconpos="left" value="0">Eliminar Foto</button></div>');
				//$('#btn_elimina'+i_foto+'').button();
			NomIdimage = "cameraImage"+i_foto;
			i_foto++;
		}
	
	    image = document.getElementById(NomIdimage);
	    image.style.display = 'block';
	    image.src = src;

	    arr_tmp_fotos.push(src); 									//guarda URL de la imagen en array
    }

    localStorage.setItem('Fotos', JSON.stringify(arr_tmp_fotos));
    arr_tmp_fotos.length=0;		//console.log(localStorage.Fotos);
			
	$("#api-camera").trigger("create");
	$("#lista_fotos").trigger("create");
	$("#"+NomIdimage).trigger("create");	

}


$(document).ready(function() {
	$("#seleccionado").html('<h4 align="center"> '+res[0]+"  - "+res[1]+'</h4>');
	app.initialize();

	db.transaction(CargarListado);

	
});

function comprobarCamposRequired(){
	var correcto=true;
	if(correcto==true){
	   $(':input').each(function () {	console.log("valor:" + $(this).val() + " id: " + $(this).attr('id'));
	   		var currentId = $(this).attr('id');	//console.log(currentId);
			if(currentId == "sb"+vida && ($(this).val() == "" || $(this).val() ==null)){
				alerta (
				    "Seleccione una Sublinea",  		// message
				    function(){ },         	// callback
				    'Activos',            	// title
				    'Ok'                  	// buttonName
				);
				$("#sb"+vida).focus();
				correcto=false; return false;
			}else if(currentId == "nb"+vida && $(this).val().trim() == ""){
				alerta (
				    "Digite el Nombre",  		// message
				    function(){ },         	// callback
				    'Activos',            	// title
				    'Ok'                  	// buttonName
				);
				$("#nb"+vida).focus();
				correcto=false; return false;
			}else if(currentId == "p"+vida && $(this).val().trim() == ""){
				alerta (
				    "Escanee la plaqueta",  		// message
				    function(){ },         	// callback
				    'Activos',            	// title
				    'Ok'                  	// buttonName
				);
				$("#p"+vida).focus();
				correcto=false; return false;
			}else if(currentId == "es"+vida && $(this).val().trim() == ""){
				alerta (
				    "Seleccione un estado",  		// message
				    function(){ },         	// callback
				    'Activos',            	// title
				    'Ok'                  	// buttonName
				);
				$("#es"+vida).focus();
				correcto=false; return false;
			}	
	   });
	   if(correcto==true){	//console.log(localStorage.Fotos);
			if(localStorage.Fotos == "" || localStorage.Fotos == undefined || localStorage.Fotos == "[]"){
				alerta (
				    "Mínimo de Fotos: "+minFotos,  // message
				    function(){
						//window.location = "principal.html";
				    },         // callback
				    'Activos',            // title
				    'Ok'                  // buttonName
				);
				correcto=false; return false;
			}else{
				dataf = JSON.parse(localStorage.getItem('Fotos')); console.log(dataf.length);
				if(dataf.length<minFotos){
					alerta (
					    "Mínimo de Fotos: "+minFotos,  // message
					    function(){
							//window.location = "principal.html";
					    },         // callback
					    'Activos',            // title
					    'Ok'                  // buttonName
					);
					correcto=false; return false;
				}else if(dataf.length>maxFotos){
					alerta (
					    "Máximo de Fotos: "+maxFotos +"\nFotos actuales: "+dataf.length,  // message
					    function(){
							//window.location = "principal.html";
					    },         // callback
					    'Activos',            // title
					    'Ok'                  // buttonName
					);
					correcto=false; return false;
				}
			} 
		}
	}	console.log(correcto);
	return correcto;
}


