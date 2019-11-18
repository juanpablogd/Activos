$(document).ready(function() {
	var activo = false;
    app.initialize();
    $("#titulo").html(localStorage.nom_empresa);
	function leer(){
		cordova.plugins.barcodeScanner.scan(
			function(result) {			//$val = result.text; console.log($val); //var res = $val.split("|");
				localStorage.busqueda = result.text; 
				db.transaction(CargarListado);
			},
			function (error){
				alerta (
				    "Error: " + error,  		// message
				    function(){ window.location = "elemento_editar.html"; },         	// callback
				    'Activos',            	// title
				    'Ok'                  	// buttonName
				);
			}
		);
	}
	function txtOk(t){	console.log(t);
		if (t != "undefined" && t != undefined){
			t = t.trim();
			return t.replace(/'/g , "").replace(/"/g , "").replace(/\|/g , " ");
		}else{
			return t;
		}
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
			var res = elemento_valor.split("|");	//console.log(res[1]);
		}
		if(elemento_valor != "" && elemento_valor != undefined && elemento_valor != null && elemento_valor != "null" )
		{
			$("#seleccionado").html('<h4 align="center" style="margin: 6px;">'+res_persona[1]+" "+res_persona[2]+" - "+'Ref: '+res[1]+" -  "+res[2]+'</h4>');
		} else{
			$("#seleccionado").html('<h4 align="center" style="margin: 6px;">'+res_persona[1]+" "+res_persona[2]+" - "+' Busque un elemento por favor</h4>');			
		}
		$("#btn2").removeAttr("disabled");
		$("#btn3").removeAttr("disabled");
		if(localStorage.elemento_valor !== undefined){
			if(res[1] == "" ){
				localStorage.elemento_valor = "";
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
			alerta (
			    "Debe digitar el número de Placa o Serial",  		// message
			    function(){ $("#txtBuscar").focus(); },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
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
		$("#seleccionado").html('<h4 align="center style="margin: 6px;"">'+res[2]+" -  "+res[1]+'</h4>');
		$("#btn2").removeAttr("disabled");
		//$("#btn3").removeAttr("disabled");

	});
	
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
		var observaciones = $( "#observaciones" ).val();	observaciones = txtOk(observaciones);
		//OBTIENE EL ELEMENTO A MOSTRAR
		$val = localStorage.elemento_valor; 
		var id_elemento = $val.split("|");
		//FECHA - ID_ENVIO
		var now = new Date();
		var fecha_captura = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate()+'-'+now.getHours()+'_'+now.getMinutes()+'_'+now.getSeconds();
		var id_envio = fecha_captura+'-'+id_usr;
		var seccion = localStorage.id_seccion;
		var origen = localStorage.id_origen;

		db.transaction(function(tx) {
			  console.log('select nombres,apellidos,inv.cc_responsable from publicinventario inv left join publicusuario usr on usr.cedula = inv.cc_responsable where (id_envio_art = "'+id_elemento[5]+'" and id_envio_art != "" and id_envio_art != "null") or (id_articulo = "'+id_elemento[0]+'" and id_articulo != "" and id_articulo != "null") order by inv.rowid desc limit 1'); 
			tx.executeSql('select nombres,apellidos,inv.cc_responsable from publicinventario inv left join publicusuario usr on usr.cedula = inv.cc_responsable where (id_envio_art = "'+id_elemento[5]+'" and id_envio_art != "" and id_envio_art != "null") or (id_articulo = "'+id_elemento[0]+'" and id_articulo != "" and id_articulo != "null") order by inv.rowid desc limit 1', [],
				function consultaEle(tx, results) {
					var encontrados = results.rows.length; console.log("Encontrados: " + encontrados);
					var repetido = false;
					if(encontrados>0) {	console.log(cc[0] + " " + results.rows.item(0).cc_responsable);
						if (cc[0] == results.rows.item(0).cc_responsable){
							repetido = true;
						}else{
					    	if (confirm("El elemento ya se encuentra asignado a "+results.rows.item(0).nombres+" "+results.rows.item(0).apellidos+" Desea Reasignarlo?") == false) {
					    		console.log("NO GUARDAR");
								return false;						    
							}							
						}

					}
					localStorage.firma = "";
					localStorage.elemento_valor = "";
					localStorage.Fotos = "";
					localStorage.busqueda = "";
					if(repetido){	console.log("REPETIDO");
						alerta (
						    "Asignación exitosa",  		// message
						    function(){ window.location = "p2_elemento_buscar.html"; },         	// callback
						    'Activos',            	// title
						    'Ok'                  	// buttonName
						);
					}else{	console.log("GUARDAR");
						db.transaction(function guardarInv(tx){
							//INFO GENERAL DEL ELEMENTO		
							  console.log('INSERT INTO publicinventario (id_origen,id_seccion,id_usuario,cc_responsable,id_envio,activo,id_articulo,observacion,asignacion,id_estado,id_envio_art,id_proyecto) values ("'+origen+'","'+seccion+'","'+id_usr+'","'+cc[0]+'","'+id_envio+'","1","'+id_elemento[0]+'","'+observaciones+'","R","'+id_elemento[4]+'","'+id_elemento[5]+'","'+localStorage.id_proyecto+'")');
							tx.executeSql('INSERT INTO publicinventario (id_origen,id_seccion,id_usuario,cc_responsable,id_envio,activo,id_articulo,observacion,asignacion,id_estado,id_envio_art,id_proyecto) values ("'+origen+'","'+seccion+'","'+id_usr+'","'+cc[0]+'","'+id_envio+'","1","'+id_elemento[0]+'","'+observaciones+'","R","'+id_elemento[4]+'","'+id_elemento[5]+'","'+localStorage.id_proyecto+'")');
							//ASIGNA RESPONSABLE AL articulo
							if(id_elemento[0]!="" && id_elemento[0]!="null"){
				                console.log("UPDATE publicarticulo set cc_responsable = '"+cc[0]+"' where id_articulo = '"+id_elemento[0]+"'");
				              tx.executeSql("UPDATE publicarticulo set cc_responsable = '"+cc[0]+"' where id_articulo = '"+id_elemento[0]+"'");
							}else{
				                console.log("UPDATE publicarticulo set cc_responsable = '"+cc[0]+"' where id_envio = '"+id_elemento[5]+"'");
				              tx.executeSql("UPDATE publicarticulo set cc_responsable = '"+cc[0]+"' where id_envio = '"+id_elemento[5]+"'");
							}
							
						});
						setTimeout(function() {
							db.transaction(function(tx) {
								  console.log('select * from publicinventario where id_envio = "'+id_envio+'"');
								tx.executeSql('select * from publicinventario where id_envio = "'+id_envio+'"', [],
									function MuestraItems(tx, results) {
										var encontrados = results.rows.length; console.log("Encontrados: " + encontrados);
										if(encontrados>0) {
											alerta (
											    "Asignación exitosa",  		// message
											    function(){ window.location = "p2_elemento_buscar.html"; },         	// callback
											    'Activos',            	// title
											    'Ok'                  	// buttonName
											);
										}else {
											alerta (
											    "Elemento NO Asignado",  		// message
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
						}, 350);
					}

				}	
			);	
			return false;
		});
		return false;
	});
	//DIRECCIONA SELECCIONAR PERSONA
	$('#btn3').click(function() {
		window.location = "persona_verificar.html";		//console.log('<h4 align="center">'+res[1]+" -  "+res[2]+'</h4>');	//$("#btn2").removeAttr("disabled");	//$("#btn3").removeAttr("disabled");
	});

});