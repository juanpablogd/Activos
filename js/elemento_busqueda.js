// Start with the map page
$(window).load(function () {
		/*var idcorredor = localStorage.idcorredor;		 	
		var nombre = localStorage.nombre;
		var idinscripcion = localStorage.idinscripcion;	//alert("Nombre: "+nombre+"   Insss: "+idinscripcion);
		//if (nombre != null && nombre != "" && idinscripcion != null && idinscripcion != "") window.location = "main.html";
		  db.transaction(AlmacenaUsr);
		db.transaction(CargarAtletas); */
});

$(document).ready(function() {
	var activo = false;
    app.initialize();
	function leer(){
		cordova.plugins.barcodeScanner.scan(
			function(result) {			//$val = result.text; alert($val); //var res = $val.split("|");
				localStorage.busqueda = result.text; 
				db.transaction(CargarListado);
			},
			function (error){
				alert("Error: " + error);
			}
		);
	}
	
	localStorage.busqueda = "";
	
	//HABILITA BOTON 2 - ELEMENTO
	var persona_valor = localStorage.persona_valor; 	console.log(persona_valor); 
	if(persona_valor != "" && persona_valor != undefined && persona_valor != null && persona_valor != "null" )
	{
		$val = localStorage.persona_valor;				console.log(localStorage.persona_valor);
		var res_persona = $val.split("|");
		if(localStorage.elemento_valor !== undefined){
			var elemento_valor = localStorage.elemento_valor;
			var res = elemento_valor.split("|");	//alert(res[1]);
		}
		if(elemento_valor != "" && elemento_valor != undefined && elemento_valor != null && elemento_valor != "null" )
		{
			$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+'Ref: '+res[1]+" -  "+res[2]+'</h4>');
		} else{
			$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+' Busque un elemento por favor</h4>');			
		}
		$("#btn2").removeAttr("disabled");
		$("#btn3").removeAttr("disabled");
		if(localStorage.elemento_valor !== undefined){
			if(res[1] == "" ){
				alert("Registre la plaqueta por favor");
				window.location = "elemento_editar.html";			
			}else if(res[0] != "" ){
				localStorage.busqueda=res[1];
				db.transaction(CargarListado);
			}
		}
	}
	//HABILITA BOTON 3 - PERSONA RESPONSABLE
	var persona_valor = localStorage.persona_valor;
	if(persona_valor != "" && persona_valor != undefined && persona_valor != "null" && localStorage.elemento_valor != "" && elemento_valor != "" && elemento_valor != undefined && elemento_valor != null && elemento_valor != "null"){
		$("#btn5").removeAttr("disabled");
	}

/*	//HABILITA BOTON GUARDAR
	var firma = localStorage.firma;
	console.log("Log: "+localStorage.elemento_valor);
	if(firma != "" && firma != undefined && firma != "null" && localStorage.elemento_valor != ""){
		$("#btn5").removeAttr("disabled");
	}	*/
	
	
    $("#bcerrar_sesion").click(function(){
    	db.transaction(EliminaUsr);
    });
    
	//BOTÓN BUSQUEDA ELEMENTO
    $("#btnBuscar").click(function () {
    	var input = $("#txtBuscar").val();	console.log(input);
        if ( input.trim() != "" ) {
            localStorage.busqueda=input.trim();
	    	db.transaction(CargarListado);
            $("#lista").listview( "refresh" );
            $("#lista").trigger( "updatelayout");
        }else{
        	alert("Debe digitar el número de Placa o Serial");
        	$("#txtBuscar").focus();
        }
    });

	//EVENTO CLICK DE LA LISTA DE ARTICULOS
	$('#lista').on('click', 'li', function(){
		var $this = $(this);
		//console.log("Valor" + $this.attr('value'));
		//console.log($this.text() + ' \nIndex ' + $this.index());
		
		$val = $this.attr('value'); //id|referencia|nombre
		localStorage.elemento_valor = $val; 
		var res = $val.split("|");
		$("#seleccionado").html('<h4 align="center">'+res[2]+" -  "+res[1]+'</h4>');
		$("#btn2").removeAttr("disabled");
		//$("#btn3").removeAttr("disabled");

	});
/*	$("input[data-type='search']").keydown(function() {
	  	activo=false; 		console.log(activo);
		setTimeout(function() { 
			activo=true;	console.log(activo);
		}, 2*1000);
	});	*/
	
	//Opción Escanear
    $("#escanear").click(function(){
    	leer();
    });
	
	//DIRECCIONA OPCION FOTO
	$('#btn2').click(function() {
		window.location= 'p2_elemento_buscar.html';
	});
	//GUARDAR FORMULARIO
	$('#btn_ok').click(function() {
		$val = localStorage.persona_valor;
		var id_usr = localStorage.id_usr;
		var cc = $val.split("|");
		var observaciones = $( "#observaciones" ).val();
		//OBTIENE EL ELEMENTO A MOSTRAR
		$val = localStorage.elemento_valor; 
		var id_elemento = $val.split("|");
		//FECHA - ID_ENVIO
		var now = new Date();
		var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
		var id_envio = fecha_captura+'-'+id_usr;
		var seccion = localStorage.idseccion;

		db.transaction(function(tx) {
			console.log('select nombres,apellidos from publicinventario inv inner join publicinventario_det inv_det on ((inv.idinventario = inv_det.idinventario) or (inv.id_envio = inv_det.id_envio and inv.id_envio != "")) left join publicusuarios usr on usr.cc = inv.cc_responsable where (id_envio_art = "'+id_elemento[5]+'" and id_envio_art != "" and id_envio_art != "null") or (idarticulo = "'+id_elemento[0]+'" and idarticulo != "" and idarticulo != "null") order by inv.rowid desc limit 1'); 
			tx.executeSql('select nombres,apellidos from publicinventario inv inner join publicinventario_det inv_det on ((inv.idinventario = inv_det.idinventario) or (inv.id_envio = inv_det.id_envio and inv.id_envio != "")) left join publicusuarios usr on usr.cc = inv.cc_responsable where (id_envio_art = "'+id_elemento[5]+'" and id_envio_art != "" and id_envio_art != "null") or (idarticulo = "'+id_elemento[0]+'" and idarticulo != "" and idarticulo != "null") order by inv.rowid desc limit 1', [],
				function consultaEle(tx, results) {
					var encontrados = results.rows.length; console.log("Encontrados: " + encontrados);
					if(encontrados>0) {
				    	if (confirm("El elemento ya se encuentra asignado a "+results.rows.item(0).nombres+" "+results.rows.item(0).apellidos+" Desea Reasignarlo?") == false) {
				    		console.log("NO GUARDAR");
							return false;						    
						}
					}
					console.log("GUARDAR");
					db.transaction(function guardarInv(tx){
						//INFO GENERAL DEL ELEMENTO		
						 console.log('INSERT INTO publicinventario (idseccion,idusuario,cc_responsable,id_envio,activo) values ("'+seccion+'","'+id_usr+'","'+cc[0]+'","'+id_envio+'","1")');
						tx.executeSql('INSERT INTO publicinventario (idseccion,idusuario,cc_responsable,id_envio,activo) values ("'+seccion+'","'+id_usr+'","'+cc[0]+'","'+id_envio+'","1")');
						//DETALLE DEL ELMENTO
						console.log('INSERT INTO publicinventario_det (idarticulo,observacion,asignacion,id_estado,id_envio,id_envio_art)' + 
						'values ("'+id_elemento[0]+'","'+observaciones+'","R","'+id_elemento[4]+'","'+id_envio+'","'+id_elemento[5]+'")');
						tx.executeSql('INSERT INTO publicinventario_det (idarticulo,observacion,asignacion,id_estado,id_envio,id_envio_art)' + 
						'values ("'+id_elemento[0]+'","'+observaciones+'","R","'+id_elemento[4]+'","'+id_envio+'","'+id_elemento[5]+'")');
						//ASIGNA RESPONSABLE AL articulo
						if(id_elemento[0]!="" && id_elemento[0]!="null"){
			              console.log('UPDATE publicarticulos set cc_responsable_af = "'+cc[0]+'" where idarticulo = "'+id_elemento[0]+'"');
			              tx.executeSql('UPDATE publicarticulos set cc_responsable_af = "'+cc[0]+'" where idarticulo = "'+id_elemento[0]+'"');
						}else{
			              console.log('UPDATE publicarticulos set cc_responsable_af = "'+cc[0]+'" where id_envio = "'+id_elemento[5]+'"');
			              tx.executeSql('UPDATE publicarticulos set cc_responsable_af = "'+cc[0]+'" where id_envio = "'+id_elemento[5]+'"');
						}
						
					});
					setTimeout(function() {
						localStorage.firma = "";
						localStorage.elemento_valor = "";
						localStorage.Fotos = "";
						localStorage.busqueda = "";
						db.transaction(function(tx) {
							console.log('select * from publicinventario_det where id_envio = "'+id_envio+'"');
							tx.executeSql('select * from publicinventario_det where id_envio = "'+id_envio+'"', [],
								function MuestraItems(tx, results) {
									var encontrados = results.rows.length; console.log("Encontrados: " + encontrados);
									if(encontrados>0) {
										window.location = "p2_elemento_buscar.html";
										alert("Elemento Guardado exitosamente");
									}else
									{
										alert("Espere un momento por favor!");
										alert("Elemento Guardado exitosamente");
									}
								}	
							);
						} /*, function errorCB(err) {	alert("Error processing SQL: "+err.code); }
						,function successCB() {	localStorage.firma = ""; }	*/
						);
					}, 300);
				}	
			);	
			return false;
		});
		return false;


/*		if ($( "#seccion" ).val()==0){
			alert("Seleccione una Dependencia/Sección por favor");
			$("#seccion").focus();
			return false;
		}
		
		if(localStorage.persona_valor == undefined || localStorage.persona_valor == ""){
			alert("Busque una persona por favor!");
			$("input[data-type='search']").focus();
			return false;
		}
		localStorage.iddependencia = $( "#dependencia" ).val(); 
		localStorage.idseccion = $( "#seccion" ).val();
		console.log(localStorage.iddependencia);
		console.log(localStorage.idseccion);
		console.log(localStorage.persona_valor);
		console.log("GUARDAR");
		window.location = "p2_elemento_buscar.html";	*/


/*		if ($( "#select-native-1" ).val()==0){
			alert("Seleccione un estado por favor");
			$("#select-native-1").focus();
			return false;
		}
		db.transaction(GuardaElemento); */
	});
	//DIRECCIONA SELECCIONAR PERSONA
	$('#btn3').click(function() {
		window.location = "persona_verificar.html";		//console.log('<h4 align="center">'+res[1]+" -  "+res[2]+'</h4>');	//$("#btn2").removeAttr("disabled");	//$("#btn3").removeAttr("disabled");
	});
/*	//DIRECCIONA OPCION PERSONA
	$('#btn4').click(function() {
		window.location= 'p4_firma.html';
	});
	//DIRECCIONA OPCION GUARDAR
	$('#btn5').click(function() {
		window.location= 'p5_guardar.html';
	}); */

});