var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var datos_pendientes;
var ttal_fotos;
var ttal_respuestas;

$(document).ready(function(){
	datos_pendientes=false;
	var espanol = {
	     "sProcessing": "Procesando...",
	     "sLengthMenu": "Mostrar _MENU_ registros",
	     "sZeroRecords": "No se encontraron resultados",
	     "sInfo": "Mostrando desde _START_ hasta _END_ de _TOTAL_ registros",
	     "sInfoEmpty": "No existen registros",
	     "sInfoFiltered": "(filtrado de un total de _MAX_ líneas)",
	     "sInfoPostFix": "",
	     "sSearch": "Buscar:",
	     "sUrl": "",
			"oPaginate": {
			"sFirst":    "Primero",
			"sPrevious": "Anterior",
			"sNext":     "Siguiente",
			"sLast":     "Último"
			}
	};
	$('#listado_cargue').dataTable({
								"oLanguage": espanol,"paging":   false,
								"ordering": false,"info":     false});
	 
	$("#btn_si").click(function(event) {
		//$("#btn_si").remove();					//$("#btn_no").remove();
		$("#Lpregunta").hide();
		db.transaction(ConsultaSincronizar);
	});
	
	db.transaction(Cono_elementos);
	
	 setInterval(function(){
	 	console.log("Buscar pendientes");
	 	db.transaction(Cono_elementos);
	}, 2000);
	
});

//CONSULTA SI HAY INFORMACIÓN PENDIENTE DE ENVÍO---------------------------------------------------------------
function Cono_elementos(tx) {
	tx.executeSql('SELECT count(*) nreg FROM publicarticulos where id_envio != ""', [],
		           Cono_elementosResp,errorCB_Elemento);
}
function Cono_elementosResp(tx, results) {
	$("#no_elementos").html(results.rows.item(0).nreg);
	tx.executeSql('SELECT count(*) nreg FROM publicinventario where id_envio != ""', [], Cono_inventarioResp,errorCB_Fotos);
}
function Cono_inventarioResp(tx, results) {
	$("#no_inventario").html(results.rows.item(0).nreg);
	tx.executeSql('SELECT count(*) nreg FROM publicusuarios where id_envio != ""', [], Cono_usuariosResp,errorCB_Fotos);
}
function Cono_usuariosResp(tx, results) {
	$("#no_empleados").html(results.rows.item(0).nreg);
	tx.executeSql('SELECT count(*) nreg FROM publicinventario_det where id_envio != ""', [], Cono_inventario_detResp,errorCB_Fotos);
}
function Cono_inventario_detResp(tx, results) {
	$("#no_inventario_det").html(results.rows.item(0).nreg);
	tx.executeSql('SELECT count(*) nreg FROM publicarticulos_fotos', [], Cono_fotosResp,errorCB_Fotos);
}
function Cono_fotosResp(tx, results) {
	$("#no_fotos").html(results.rows.item(0).nreg);

}
//--------------------------------------------------------------------------------------------------------------

function ConsultaSincronizar(tx) {
	  console.log('SELECT idarticulo,idseccion,idslinea,marca_af,nombre,referencia,numero_serie_af,plaqueta_af,plaqueta_anterior1_af,id_envio,id_estado,idusuario_envio,cc_responsable_af FROM publicarticulos where id_envio != ""');
	tx.executeSql('SELECT idarticulo,idseccion,idslinea,marca_af,nombre,referencia,numero_serie_af,plaqueta_af,plaqueta_anterior1_af,id_envio,id_estado,idusuario_envio,cc_responsable_af FROM publicarticulos where id_envio != ""', [],
		           ConsultaSincronizarElemento,errorCB_Elemento);
}

function ConsultaSincronizarElemento(tx, results) {
	var lon = results.rows.length;		//alert("Rta Elemento: " + lon);		//alert("Respuestas: "+lon);  //$("#resultado").before("<br>Cuestionarios encontrados: "+len+".<br>");	
	if(lon==0){	console.log('SELECT idseccion,idusuario,cc_responsable,firma,id_envio,idinventario FROM publicinventario where id_envio != ""');
	   	      tx.executeSql('SELECT idseccion,idusuario,cc_responsable,firma,id_envio,idinventario FROM publicinventario where id_envio != ""', [],
	          	ConsultaSincronizarInventario,errorCB_Inventario);
	}else{
		for (i = 0; i < lon; i++){
			var parametros = new Object();
			
			parametros['tabla'] = 'p_elemento';
			
			parametros['id'] = results.rows.item(i).idarticulo;					//			parametros['idempresa'] = results.rows.item(i).idempresa;
			parametros['idseccion'] = results.rows.item(i).idseccion;			//			parametros['idlinea'] = results.rows.item(i).idlinea;
			parametros['idslinea'] = results.rows.item(i).idslinea;
			parametros['marca_af'] = results.rows.item(i).marca_af;
			parametros['nombre'] = results.rows.item(i).nombre;
			parametros['referencia'] = results.rows.item(i).referencia;
			parametros['numero_serie'] = results.rows.item(i).numero_serie_af;
			parametros['plaqueta'] = results.rows.item(i).plaqueta_af;
			parametros['plaqueta_anterior'] = results.rows.item(i).plaqueta_anterior1_af;
			parametros['id_envio'] = results.rows.item(i).id_envio;
			parametros['id_estado'] = results.rows.item(i).id_estado;
			parametros['idusuario_envio'] = results.rows.item(i).idusuario_envio;
			parametros['cc_responsable_af'] = results.rows.item(i).cc_responsable_af;
			$("#resultado").html("<br>Articulos restantes: "+(lon-i)+".<br>"); $("#resultado").trigger("create");
			$.ajax({
				data:  parametros,
				url:'http://'+localStorage.url_servidor+'/SIG/servicios/activos_sincronizar.php',
				beforeSend: function() { $("#resultado").html('<br>Cargando Elementos....'+(lon-i)+'.<br>'); $("#resultado").trigger("create"); }, //Show spinner
            	complete: function() { $("#resultado").html('<br>Carga Completa....'+(lon-i)+'.<br>'); $("#resultado").trigger("create"); },
				type:  'post',
				async: false,		//timeout: 30000,
				success: function(responser){	console.log("Articulo:"+responser);
					//db.transaction(function(tx) {
						var respr = responser.trim();		console.log(respr);	
						var res=respr.split("|");			//res[0]=>Id del Elemento en el servidor	res[1]=>Id Envío	res[2]=>Id temporal en la base de datos Local
							console.log('update publicarticulos set idarticulo = "'+res[0]+'" where id_envio = "'+res[1]+'"');			
						tx.executeSql('update publicarticulos set idarticulo = "'+res[0]+'" where id_envio = "'+res[1]+'"');		//tx.executeSql('DELETE from publicp_elemento where id_envio = "'+res+'"');
							console.log('update publicinventario_det set idarticulo = "'+res[0]+'" where id_envio_art = "'+res[1]+'"');
						tx.executeSql('update publicinventario_det set idarticulo = "'+res[0]+'" where id_envio_art = "'+res[1]+'"');
							console.log('update publicarticulos set id_envio = "" where id_envio = "'+res[1]+'"');
						tx.executeSql('update publicarticulos set id_envio = "" where id_envio = "'+res[1]+'"');		//tx.executeSql('DELETE from publicp_elemento where id_envio = "'+res+'"');
					//});
					//CONTINUA CON LOS NUEVOS ELEMENTOS REGISTRADOS EN EL SISTEMA
					if((i+1) == lon) { //alert("continue a rtas");
					   	tx.executeSql('SELECT idseccion,idusuario,cc_responsable,firma,id_envio,idinventario FROM publicinventario where id_envio != ""', [],
					           ConsultaSincronizarInventario,errorCB_Inventario);
					}
				},
				error: function (error) {
					$("#resultado").text('Error en ingreso de Respuestas'); $("#resultado").trigger("create");
					//CONTINUA CON LOS NUEVOS ELEMENTOS REGISTRADOS EN EL SISTEMA
					if((i+1) == lon) { //alert("continue a rtas");
						  console.log('SELECT idseccion,idusuario,cc_responsable,firma,id_envio,idinventario FROM publicinventario where id_envio != ""');
					   	tx.executeSql('SELECT idseccion,idusuario,cc_responsable,firma,id_envio,idinventario FROM publicinventario where id_envio != ""', [],
					           ConsultaSincronizarInventario,errorCB_Inventario);
					}
			    }
			});
	   	}
	}
}

function ConsultaSincronizarInventario(tx, results) {
	var lon = results.rows.length;		//alert("N Inventario: " + lon);		//alert("Respuestas: "+lon);  //$("#resultado").before("<br>Cuestionarios encontrados: "+len+".<br>");
	if(lon==0){ //SI NO HAY INVENTARIO NOTIFICA AL USUARIO
			  console.log('SELECT cc,nombres,apellidos,telefono,correo,id_envio FROM publicusuarios where id_envio != ""');
		   	tx.executeSql('SELECT cc,nombres,apellidos,telefono,correo,id_envio FROM publicusuarios where id_envio != ""', [],
		           ConsultaSincronizarPersonas,errorCB_Personas);
	}else{
		for (i = 0; i < lon; i++){
			var parametros = new Object();
			
			parametros['tabla'] = 't_inventario';
			
			//parametros['idempresa'] = results.rows.item(i).idempresa;
			parametros['idseccion'] = results.rows.item(i).idseccion;
			parametros['idusuario'] = results.rows.item(i).idusuario;
			parametros['cc_responsable'] = results.rows.item(i).cc_responsable;
			parametros['firma'] = results.rows.item(i).firma;
			parametros['id_envio'] = results.rows.item(i).id_envio;
			parametros['idinventario'] = results.rows.item(i).idinventario;		//alert(parametros['idinventario']);
			
			$("#resultado").html("<br>Datos restantes: "+(lon-i)+".<br>"); $("#resultado").trigger("create");
			$.ajax({
				data:  parametros,
				url:'http://'+localStorage.url_servidor+'/SIG/servicios/activos_sincronizar.php',
				type:  'post',
				async: false,		//timeout: 30000,
				beforeSend: function() { $("#resultado").html('<br>Cargando Inventario....'+(lon-i)+'.<br>'); $("#resultado").trigger("create"); }, //Show spinner
            	complete: function() { $("#resultado").html('<br>Carga Completa....'+(lon-i)+'.<br>'); $("#resultado").trigger("create"); },
				success: function(responser){	//alert("Inventario: "+responser);
					//db.transaction(function(tx) {
						var respr = responser.trim();		//alert(respr);	//var res=respr.split("|");
						
						var res=respr.split("|");
						tx.executeSql('UPDATE publicinventario SET idinventario = "'+res[1]+'" where id_envio = "'+res[0]+'"');		//tx.executeSql('DELETE from publicp_elemento where id_envio = "'+res+'"');
						tx.executeSql('UPDATE publicinventario SET id_envio = "" where id_envio = "'+res[0]+'"');
							
						//alert('delete from publicinventario where id_envio = "'+respr+'"');	
						//tx.executeSql('delete from publicinventario where id_envio = "'+respr+'"');		//tx.executeSql('DELETE from publicp_elemento where id_envio = "'+res+'"');
					//});
					//CUANDO TERMINA DE SINCRONIZAR NOTIFICA AL USUARIO
					if((i+1) == lon) { //alert("continue a rtas");
						//CONTINUA CON LAS NUEVAS PERSONAS REGISTRADAS EN EL SISTEMA
						  console.log('SELECT cc,nombres,apellidos,telefono,correo,id_envio FROM publicusuarios where id_envio != ""');
					   	tx.executeSql('SELECT cc,nombres,apellidos,telefono,correo,id_envio FROM publicusuarios where id_envio != ""', [],
					           ConsultaSincronizarPersonas,errorCB_Personas);
					}
				},
				error: function (error) {
					$("#resultado").text('Error en carga del inventario');	$("#resultado").trigger("create");
					//CUANDO TERMINA DE SINCRONIZAR NOTIFICA AL USUARIO
					if((i+1) == lon) { //alert("continue a rtas");
						//CONTINUA CON LAS NUEVAS PERSONAS REGISTRADAS EN EL SISTEMA
						  console.log('SELECT cc,nombres,apellidos,telefono,correo,id_envio FROM publicusuarios where id_envio != ""');
					   	tx.executeSql('SELECT cc,nombres,apellidos,telefono,correo,id_envio FROM publicusuarios where id_envio != ""', [],
					           ConsultaSincronizarPersonas,errorCB_Personas);
					}
			    }
			});
	   	}
	}
}

function ConsultaSincronizarPersonas(tx, results) {
	var lon = results.rows.length;	//alert("Rta Personas: " + lon);								//alert(lon);//$("#resultado").before("<br>Cuestionarios encontrados: "+len+".<br>");	
	if(lon==0){	//SI NO HAY PERSONAS PARA ENVIAR CONTINUA CON LOS ELEMENTOS
			  console.log('SELECT idinventario,idinventariodet,idarticulo,id_estado,id_envio,id_envio_art,observacion,asignacion FROM publicinventario_det where id_envio != ""');
		   	tx.executeSql('SELECT idinventario,idinventariodet,idarticulo,id_estado,id_envio,id_envio_art,observacion,asignacion FROM publicinventario_det where id_envio != ""', [],
		           ConsultaSincronizarInventarioDetalle,errorCB_Inventario);
	}else{
		for (i = 0; i < lon; i++){
			var parametros = new Object();
			
			parametros['tabla'] = 'p_persona';
			parametros['documento'] = results.rows.item(i).cc;
			parametros['nombres'] = results.rows.item(i).nombres;
			parametros['apellidos'] = results.rows.item(i).apellidos;
			parametros['telefono'] = results.rows.item(i).telefono;
			parametros['correo'] = results.rows.item(i).correo;
			parametros['id_envio'] = results.rows.item(i).id_envio;

			$("#resultado").html("<br>Cargando Empleados: "+(lon-i)+".<br>");		$("#resultado").trigger("create");
			$.ajax({
				data:  parametros,
				url:'http://'+localStorage.url_servidor+'/SIG/servicios/activos_sincronizar.php',
				type:  'post',
				async: false,
				beforeSend: function() { $("#resultado").html('<br>Cargando Empleados....'+(lon-i)+'.<br>'); $("#resultado").trigger("create"); }, 
            	complete: function() { $("#resultado").html('<br>Carga Completa....'+(lon-i)+'.<br>'); $("#resultado").trigger("create"); },
				success: function(responsea){				//alert("Funcionarios: "+responsea);
					//db.transaction(function(tx) {
						var respa = responsea.trim();  
			          	tx.executeSql('update publicusuarios set id_envio = "" where id_envio = "'+respa+'"');
			        //});
					//CUANDO TERMINA DE SINCRONIZAR NOTIFICA AL USUARIO
					if((i+1) == lon) { //alert("continue a rtas");
						  console.log('SELECT idinventario,idinventariodet,idarticulo,id_estado,id_envio,id_envio_art,observacion,asignacion FROM publicinventario_det where id_envio != ""');
					   	tx.executeSql('SELECT idinventario,idinventariodet,idarticulo,id_estado,id_envio,id_envio_art,observacion,asignacion FROM publicinventario_det where id_envio != ""', [],
					           ConsultaSincronizarInventarioDetalle,errorCB_Inventario);
					}
				},
				error: function (error) {
					$("#resultado").text('Error en ingreso de Empleados');			$("#resultado").trigger("create");
					//CUANDO TERMINA DE SINCRONIZAR NOTIFICA AL USUARIO
					if((i+1) == lon) { //alert("continue a rtas");
						  console.log('SELECT idinventario,idinventariodet,idarticulo,id_estado,id_envio,id_envio_art,observacion,asignacion FROM publicinventario_det where id_envio != ""');
					   	tx.executeSql('SELECT idinventario,idinventariodet,idarticulo,id_estado,id_envio,id_envio_art,observacion,asignacion FROM publicinventario_det where id_envio != ""', [],
					           ConsultaSincronizarInventarioDetalle,errorCB_Inventario);
					}
			    }
			});
	   	}
	}
}	


function ConsultaSincronizarInventarioDetalle(tx, results) {
	var lon = results.rows.length;		//alert("InventarioDetalle: " + lon);		//alert("Respuestas: "+lon);  //$("#resultado").before("<br>Cuestionarios encontrados: "+len+".<br>");
	if(lon==0){ //SI NO HAY INVENTARIO NOTIFICA AL USUARIO
		  console.log('SELECT rowid,url,id_envio,idarticulo FROM publicarticulos_fotos');
		tx.executeSql('SELECT rowid,url,id_envio,idarticulo FROM publicarticulos_fotos', [], ConsultaSincronizarFotos,errorCB_Fotos);
		
	}else{
		for (i = 0; i < lon; i++){
			var parametros = new Object();
			
			parametros['tabla'] = 't_inventario_detalle';
			
			parametros['idinventario'] = results.rows.item(i).idinventario;
			parametros['idinventariodet'] = results.rows.item(i).idinventariodet;
			parametros['idarticulo'] = results.rows.item(i).idarticulo;
			parametros['id_estado'] = results.rows.item(i).id_estado;
			parametros['id_envio'] = results.rows.item(i).id_envio;
			parametros['id_envio_art'] = results.rows.item(i).id_envio_art;
			parametros['observacion'] = results.rows.item(i).observacion;
			parametros['asignacion'] = results.rows.item(i).asignacion;
			
			
			$("#resultado").html("<br>Inventario restantes: "+(lon-i)+".<br>");	$("#resultado").trigger("create");
			$.ajax({
				data:  parametros,
				url:'http://'+localStorage.url_servidor+'/SIG/servicios/activos_sincronizar.php',
				type:  'post',
				async: false,		//timeout: 30000,
				beforeSend: function() { $("#resultado").html('<br>Cargando Inventario....'+(lon-i)+'.<br>'); $("#resultado").trigger("create"); }, 
            	complete: function() { $("#resultado").html('<br>Carga Completa....'+(lon-i)+'.<br>'); $("#resultado").trigger("create"); },
				success: function(responser){	//alert(responser);
					//db.transaction(function(tx) {
						var respr = responser.trim();		//alert("Inv Detalle: "+respr);	//var res=respr.split("|");	alert('delete from publicinventario_det where id_envio = "'+respr+'"');

						var res=respr.split("|");
						tx.executeSql('UPDATE publicinventario_det SET idinventario = "'+res[1]+'",idinventariodet = "'+res[2]+'" where id_envio = "'+res[0]+'"');		//tx.executeSql('DELETE from publicp_elemento where id_envio = "'+res+'"');
						tx.executeSql('UPDATE publicinventario_det SET id_envio = "" where id_envio = "'+res[0]+'"');
					//});
					//CUANDO TERMINA DE SINCRONIZAR NOTIFICA AL USUARIO
					if((i+1) == lon) { //alert("continue a rtas");
						  console.log('SELECT rowid,url,id_envio,idarticulo FROM publicarticulos_fotos');
					   	tx.executeSql('SELECT rowid,url,id_envio,idarticulo FROM publicarticulos_fotos', [], ConsultaSincronizarFotos,errorCB_Fotos);
					}
				},
				error: function (error) {
					$("#resultado").text('Error en ingreso de Respuestas');	$("#resultado").trigger("create");
					//CUANDO TERMINA DE SINCRONIZAR NOTIFICA AL USUARIO
					if((i+1) == lon) { //alert("continue a rtas");
						  console.log('SELECT rowid,url,id_envio,idarticulo FROM publicarticulos_fotos');
					   	tx.executeSql('SELECT rowid,url,id_envio,idarticulo FROM publicarticulos_fotos', [], ConsultaSincronizarFotos,errorCB_Fotos);
					}
			    }
			});

	   	}
	}
}

//SINCRONIZAR FOTOS
function ConsultaSincronizarFotos(tx, results) {	
	var len = results.rows.length;	//alert("Fotos: " + len);
	if(len==0){ //SI NO HAY FOTOS PARA ENVIAR CONTINUA CON LAS NUEVAS PERSONAS REGISTRADAS EN EL SISTEMA
		   	salir();
	}else{
		for (i = 0; i < len; i++){

			var url_imagen = results.rows.item(i).url; //console.log(url_imagen);	console.log(typeof cordova);
			if (typeof cordova !== 'undefined'){
	          	var options = new FileUploadOptions();
	            options.fileName=url_imagen;
	            options.mimeType="image/jpeg";
	            
	          	var params = new Object();
				params.cod_envio = results.rows.item(i).id_envio;
				params.rowid = results.rows.item(i).rowid;
				params.id_usr = localStorage.id_usr;
				params.idarticulo = results.rows.item(i).idarticulo;
				params.ruta_archivo = url_imagen;

	            options.params = params;			

				//ENVIA EL FOTO	
				var ft = new FileTransfer();
				ft.onprogress = function(progressEvent) {
					if (progressEvent.lengthComputable) {
						var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
						$("#resultado").html("<br>Cargando "+(len-i)+": <strong>"+perc + "% </strong><br>"); 
					} else {
						$("#resultado").html("<br>Cargando "+(len-i)+": <strong>"+perc + "% </strong><br>"); 
					}
					if(perc >= 99) $("#resultado").html('');
					$("#resultado").trigger("create");
				};
				
		        ft.upload(url_imagen,
		            "http://"+localStorage.url_servidor+"/SIG/servicios/activos_sincronizar_imagen.php",
		            function(result) {  //$("#resultado").html("Response = " + result.response.toString()); $("#resultado").trigger("create");
		            	//RESPUESTA DEL SERVIDOR		
						var respf = result.response.toString();	console.log(respf);
		            	var n=respf.split("|");

		            	//REMOVER ARCHIVO DEL DISPOSITIVO
		            	function eliminafotodb(tx) { //alert('DELETE from publicarticulos_fotos where id_envio = "'+n[0]+'" and rowid = "'+n[1]+'"');
							if(n[0]!="null" && n[0] !=""){
								console.log('DELETE from publicarticulos_fotos where id_envio = "'+n[0]+'" and rowid = "'+n[1]+'"');
								tx.executeSql('DELETE from publicarticulos_fotos where id_envio = "'+n[0]+'" and rowid = "'+n[1]+'"');
							}else if(n[3]!="null" && n[3] !=""){
								  console.log('DELETE from publicarticulos_fotos where idarticulo = "'+n[3]+'" and rowid = "'+n[1]+'"');
								tx.executeSql('DELETE from publicarticulos_fotos where idarticulo = "'+n[3]+'" and rowid = "'+n[1]+'"');
							}
						}
		            	function sqlexitoso ()  {	//console.log(LocalFileSystem.TEMPORARY);
					      	window.resolveLocalFileSystemURL(
					      		  n[2],
							      function gotFile(fileEntry){	console.log(JSON.stringify(fileEntry));
									fileEntry.remove(pictureRemoved, notRemoved);  
							      }
						    );
							//CONTINUA CON LOS NUEVOS ELEMENTOS REGISTRADOS EN EL SISTEMA
							if((i+1) == len) { //alert("continue a rtas");
								   	salir();
							} 
						}
						function sqlfallo(){}
						function pictureNotfound(){ console.log ("El archivo no fué Encontrado!"); }
						function pictureRemoved(){ console.log ("El archivo fué eliminado!"); }
						function notRemoved(){ $("#resultado").html("<br> No se puede Eliminar el archivo, limpie el cache manualmente<br>"); $("#resultado").trigger("create");}
						function no(error) { console.log("Error al consultar el archivo: " +error.message); /* $("#resultado").html("<br> Ubicación incorrecta de la imagen<br>"); */ $("#resultado").trigger("create");}
		            	//ELIMINA DE LA BASE DE DATOS
		            	db.transaction(eliminafotodb,sqlfallo,sqlexitoso);

		            },
		            function(error) {
		            	var txtServidor;
	                	if(error.code == 1){
	                		txtServidor = "No se encontró el archivo, pudo haber sido Eliminado: " + url_imagen.substr(26);
	                	}else if(error.code == 2){
	                		txtServidor = "Error en la Url del servidor";
	                	}else if(error.code == 3){
	                		txtServidor = "Debe contar con buena conexión a internet para cargar las fotos";
	                	}else if(error.code == 4){
	                		txtServidor = "ABORT_ERR";
	                	}else if(error.code == 5){
	                		txtServidor = "NOT_MODIFIED_ERR";
	                	}else{
							txtServidor = 'Error cargando archivo ' + url_imagen + ': ' + error.code;
	                	}
		                $("#resultado").html(txtServidor);	$("#resultado").trigger("create");

						//CONTINUA CON LOS NUEVOS ELEMENTOS REGISTRADOS EN EL SISTEMA
						if((i+1) == len) { //alert("continue a rtas");
							   	salir();
						}
		            },options
				);
			}
		}
	}
}

function salir (){
	$("#resultado").html('');	$("#resultado").trigger("create");
	$("#Lpregunta").show();
	alert("Cargue exitoso");
	db.transaction(Cono_elementos);
}

function errorCB_Inventario(err) {
	if (err.code === undefined || err.message === undefined){
		$("#resultado").before("<br>Error al buscar el Inventario<br>");
	}else
	{ 
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);		
	}
}
function errorCB_items(err) {
	if (err.code === undefined || err.message === undefined){
		$("#resultado").before("<br>No hay Items para sincronizar.<br>");
	}else
	{
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);		
	}
}
function errorCB_Fotos(err) {
	if (err.code === undefined || err.message === undefined){
		$("#resultado").before("<br>Error al buscar las fotografias<br>");
	}else
	{ 
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
	
}
function errorCB_Personas(err) {
	if (err.code === undefined || err.message === undefined){
		$("#resultado").before("<br>Error al buscar las Personas<br>");
	}else
	{ 
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);		
	}
}
function errorCB_Elemento(err) {
	if (err.code === undefined || err.message === undefined){
		$("#resultado").before("<br>Error al buscar los Elementos<br>");
	}else
	{ 
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);		
	}
}
