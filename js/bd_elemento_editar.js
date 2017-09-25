/**
 * @author LONJA
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var busqueda=localStorage.elemento_valor;
var res = busqueda.split("@");

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
			alert("Error: " + error);
		}
	);
	return false;
}

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
	if(busqueda!=null){	console.log("SELECT sub.nombre sublinea,art.nombre,art.referencia,art.numero_serie_af,plaqueta_af,plaqueta_anterior1_af,art.id_envio FROM publicarticulos art left join publicsublineas sub on sub.idslinea = art.idslinea  where art.rowid ='"+res[3]+"'"); //alert("Busqueda: "+busqueda);
	    tx.executeSql("SELECT sub.nombre sublinea,art.nombre,art.referencia,art.numero_serie_af,plaqueta_af,plaqueta_anterior1_af,art.id_envio FROM publicarticulos art left join publicsublineas sub on sub.idslinea = art.idslinea  where art.rowid ='"+res[3]+"'", [], MuestraItems);
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
	 	var nombre = results.rows.item(i).nombre;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	var sublinea = results.rows.item(i).sublinea;
	 	var referencia = results.rows.item(i).referencia;
	 	var numero_serie_af = results.rows.item(i).numero_serie_af;
	 	var plaqueta_af = results.rows.item(i).plaqueta_af;
	 	var plaqueta_anterior1_af = results.rows.item(i).plaqueta_anterior1_af;
	 	var id_envio_ant = results.rows.item(i).id_envio;
	 	
	    li += "<li value='"+res[3]+"'>"+
			""+
		    	"<div class='ui-block'>"+
			        "<h2>"+nombre+"</h2>"+
			        "<p>"+sublinea+"</p>"+
			        "<p>Ref: "+referencia+"</p>"+
			        "<p>Serie: "+numero_serie_af+"</p>"+
			        "<a href='#' id='btn_plaqueta' OnClick='leer(p"+id+")' class='ui-btn ui-btn-inline ui-btn-icon-left ui-icon-search'>Plaqueta Nueva</a>"+
			        "<input type='text' name='p"+id+"' id='p"+id+"' value='"+plaqueta_af+"' data-theme='a'>"+
			        "<a href='#' id='btn_plaqueta_anterior' OnClick='leer(pa"+id+")' class='ui-btn ui-btn-inline ui-btn-icon-left ui-icon-search'>Plaqueta Anterior</a>"+
			        "<input type='text' name='pa"+id+"' id='pa"+id+"' value='"+plaqueta_anterior1_af+"' data-theme='a'>"+
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
				console.log("GUARDAR");
				var last_id;
				var count = 0;
				   $(':input').each(function () {	//console.log("valor:" + $(this).val() + " id: " + $(this).attr('id'));
			   			var str = $(this).attr('id');	
			    		var id = str.substr(1, str.len); console.log(last_id + " ID> " + id); 
			    		if(last_id != id){
			    			var texto_plaqueta = $("#p"+id).val();
			    			var texto_plaquetanterior = $("#pa"+id).val();
			    			if(texto_plaqueta != undefined && texto_plaquetanterior != undefined){
								function errorCBU(err) {	alert("Error al Guardar: "+err);	}
								function successCBU() {
								    count++;	console.log("Contador:"+count);
								    if(count==encontrados){
										//idarticulo+"@"+plaqueta_af+"@"+nombre+"@"+id
										localStorage.elemento_valor = res[0]+"@"+texto_plaqueta+"@"+res[2]+"@"+res[3];
										console.log(localStorage.elemento_valor);
									   alert("Registro Almacenado correctamente");
									   	if(localStorage.persona_valor != ""){
									   		//window.location = "persona_verificar.html";
										}else{
											//window.location = "principal.html";
										}
								    }
								}
				    			db.transaction(function(tx) {
				    				if (id_envio_ant == "" || id_envio_ant == null){
				    				  	console.log('UPDATE publicarticulos SET plaqueta_af = "'+texto_plaqueta+'",plaqueta_anterior1_af = "'+texto_plaquetanterior+'",id_envio = "'+id_envio+'" WHERE rowid = "'+id+'"');
										tx.executeSql('UPDATE publicarticulos SET plaqueta_af = "'+texto_plaqueta+'",plaqueta_anterior1_af = "'+texto_plaquetanterior+'",id_envio = "'+id_envio+'" WHERE rowid = "'+id+'"');				    					
				    				}else{
				    				  	console.log('UPDATE publicarticulos SET plaqueta_af = "'+texto_plaqueta+'",plaqueta_anterior1_af = "'+texto_plaquetanterior+'" WHERE rowid = "'+id+'"');
										tx.executeSql('UPDATE publicarticulos SET plaqueta_af = "'+texto_plaqueta+'",plaqueta_anterior1_af = "'+texto_plaquetanterior+'" WHERE rowid = "'+id+'"');				    					
				    				}
								}, errorCBU, successCBU
								);
				    			last_id = id;			    				
			    			}
			    		}
				   });
				   db.transaction(function(tx) {
				   	tx.executeSql('DELETE FROM publicinventario_fotos WHERE id_envio = "'+res[0]+'"');
				   });
					//GUARDA FOTOS
					if(localStorage.Fotos != null && localStorage.Fotos != "" && localStorage.Fotos !== undefined && localStorage.Fotos != "undefined"){
						//CARGA FOTOS
						var data = JSON.parse(localStorage.getItem('Fotos')); console.log(data);
						$.each(data, function(i, item) {	
							db.transaction(function(tx) {	//alert(item);
								//console.log('INSERT INTO publicinventario_fotos (url,id_envio) values ("'+item+'","'+res[0]+'")');
								tx.executeSql('INSERT INTO publicinventario_fotos (url,id_envio) values ("'+item+'","'+res[0]+'")');
							});
						});
						data.length=0;
						localStorage.Fotos = "";				
					}

			}else{
				alert("Complete todos los campos");
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
}

function CargarFotos(tx) {
	console.log("SELECT url,id_envio FROM publicinventario_fotos where id_envio ='"+res[0]+"'");
    tx.executeSql("SELECT url,id_envio FROM publicinventario_fotos where id_envio ='"+res[0]+"'", [], MuestraFotos);
}
function MuestraFotos(tx, results) {
    var li = "";
    var habilitado ="";
	 	//li += '<li data-role="searchpage-list">Resultados </li>';				//<span class="ui-li-count">2</span>
	var encontrados = results.rows.length;		console.log(encontrados);
	
	//FECHA - ID_ENVIO
	var now = new Date();
	var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
	var id_envio = fecha_captura+'-'+localStorage.id_usr;

    var arr_tmp_fotos = new Array();				//CREA NUEVO ARRAY PARA LAS FOTOS
    if(localStorage.getItem('Fotos')!=""){ var arr_tmp_fotos = JSON.parse(localStorage.getItem('Fotos'));}

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
		});																	//	alert(img_disponible);
		//SI NO EXISTE CREA EL ELEMENTO IMG PARA ALMACENAR LA FOTO
		if(img_disponible==false){
			$("#lista_fotos").append('<div id="bloque'+i_foto+'"><img id="cameraImage'+i_foto+'" src="" width="320" height="210" align="center"/><button onclick="elimina_foto('+i_foto+')" id="btn_elimina'+i_foto+'" data-theme="a" data-icon="arrow-u" data-mini="true" data-iconpos="left" value="0">Eliminar Foto</button></div>');
				//$('#btn_elimina'+i_foto+'').button();
			NomIdimage = "cameraImage"+i_foto;
			i_foto++;
		}
	
	    image = document.getElementById(NomIdimage);
	    image.style.display = 'block';	//alert(imageData);
	    image.src = src;				//alert(imageData);

	    arr_tmp_fotos.push(src); 									//guarda URL de la imagen en array
    }

    localStorage.setItem('Fotos', JSON.stringify(arr_tmp_fotos));
    arr_tmp_fotos.length=0;		//alert(localStorage.Fotos);
			
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


