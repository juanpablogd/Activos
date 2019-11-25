/**
 * |author LONJA
 * |Fecha 20140218
 */
var id_usuario = window.localStorage.id_usr;

function descargar()
{
	//console.log('http://'+localStorage.url_servidor+'/SIG/servicios/activos_actualizar_parametros.php?id_usuario='+id_usuario);
	cargando = true;
		$.mobile.loading( 'show', { text: 'Buscando Información....', textVisible: true, theme: 'a', html: "" });
		$.ajax({
			url:'http://'+localStorage.url_servidor+'/SIG/servicios/activos_actualizar_parametros.php?id_usuario='+id_usuario,
			dataType: 'json',
			success: function(data){
				if (data[0].encontrado == "true"){
						$.mobile.loading( 'show', { text: 'Descargando Información....', textVisible: true, theme: 'a', html: "" });
						arr_ListaTabla = new Array();
						arr_tabla = new Array();
						var ttal_reg = 0;
						
					 	for(var json in data){ 						
						 	json++; 							//Omite el registro 'encontrado'
						    for(var i in data[json]){			//Por cada  Tabla

								var ValTabla="";				
								var columnas="";			
						    	for(var j in data[json][i]){ 	//Por cada reg	//console.log(j+':'+data[json][i][j]);
						    		if(j==0){
						    			columnas = data[json][i][j];
						    		}else
						    		{
						    			var col_valores="";
						    			
						    			for(var k in data[json][i][j]){ //Codifica cada dato para su inserción
											if (col_valores==""){
								        		col_valores = '"'+data[json][i][j][k]+'"';
								        	}else col_valores = col_valores+',"'+data[json][i][j][k]+'"';
						    			}

										arr_tabla[ttal_reg] = [];
										arr_tabla[ttal_reg][0] = i;
										arr_tabla[ttal_reg][1] = columnas;
										arr_tabla[ttal_reg][2] = col_valores;
										ttal_reg++;
						    		}
						    	}	//console.log(i);
								if (i != "" && i != null) {
									var numm  = json-1;								//console.log('MMM: '+numm);
									arr_ListaTabla[json-1] = [];
									arr_ListaTabla[json-1][0] = i;					//console.log('Reg: '+json-1+': '+arr_ListaTabla[json-1][0]);
									arr_ListaTabla[json-1][1] = columnas;			//console.log('Reg: '+json-1+': '+arr_ListaTabla[json-1][1]);
								}
							} 
						}

						TablaGuardar();
				}else{
					$.mobile.loading( 'hide' );
						alerta (
						    'No hay Actualizaciones pendientes!',  // message
						    function(){
								//window.location = "principal.html";	    	
						    },         // callback
						    'Activos',            // title
						    'Ok'                  // buttonName
						);
				}
			},
			error: function (error) {
				$.mobile.loading( 'hide' );
				alerta (
				    'No hay conexión en el servidor Principal!',  // message
				    function(){
						window.location = "principal.html";	    	
				    },         // callback
				    'Activos',            // title
				    'Ok'                  // buttonName
				);
            }
		});
}

function Consulta(tx) {
	tx.executeSql('SELECT count(*) nreg FROM publicseccion where sec_id_envio != ""', [], ConsultaSeccion);
}
function ConsultaSeccion(tx, results) {	console.log(results.rows.item(0).nreg);
	if(results.rows.item(0).nreg != 0){
		alerta (
		    'Debe Enviar la información Pendiente antes de Descargar!',  // message
		    function(){
				window.location = "cargar.html";
		    },         // callback
		    'Activos',            // title
		    'Ok'                  // buttonName
		);
	}else{
		tx.executeSql('SELECT count(*) nreg FROM publicarticulo where id_envio != ""', [], ConsultaCarga);
	}
}
function ConsultaCarga(tx, results) {	console.log(results.rows.item(0).nreg);
	if(results.rows.item(0).nreg != 0){
		alerta (
		    'Debe Enviar la información Pendiente antes de Descargar!',  // message
		    function(){
				window.location = "cargar.html";
		    },         // callback
		    'Activos',            // title
		    'Ok'                  // buttonName
		);
	}else{
		tx.executeSql('SELECT count(*) nreg FROM publicusuario where id_envio != ""', [], ConsultaCargaUsuario);
	}
}
function ConsultaCargaUsuario(tx, results) {	console.log(results.rows.item(0).nreg);
	if(results.rows.item(0).nreg != 0){
		alerta (
		    'Debe Enviar la información Pendiente antes de Descargar!',  // message
		    function(){
				window.location = "cargar.html";
		    },         // callback
		    'Activos',            // title
		    'Ok'                  // buttonName
		);
	}else{
		tx.executeSql('SELECT count(*) nreg FROM publicarticulo_foto where id_envio != ""', [], ConsultaCargaFoto);
	}
}
function ConsultaCargaFoto(tx, results) {	console.log(results.rows.item(0).nreg);
	if(results.rows.item(0).nreg > 1){
		alerta (
		    'Debe Enviar la información Pendiente antes de Descargar!',  // message
		    function(){
				window.location = "cargar.html";
		    },         // callback
		    'Activos',            // title
		    'Ok'                  // buttonName
		);
	}
}

$( document ).ready(function() {
	$("#titulo").html(localStorage.nom_empresa);
    //$("#btn_si").click(function( event ) {
	//$('#btn_si').on('click', function() { 
/*    	$("#btn_si").remove();
    	$("#btn_no").remove();*/
	$("#btn_si").click(function( event ) {
    	console.log("SIiiii!!!");
		$('#btn_si').button();
 		descargar();
	});
	$('#btn_si2').on('click', function() { 
    	console.log("SIiiii!!!");
		$('#btn_si2').button();
 		descargar();
	});
	$(document).on('click', '#btn_si3', function (event) {
	//$("#btn_si3").click(function(){
    	console.log("SIiiii!!!");
		$('#btn_si3').button();
 		descargar();
	});
    //$("#btn_no").click(function( event ) {
	//$("#btn_no").live('click', function(){
	$('#btn_no').on('click',  function() { 
    	console.log("NOOoooo!!!");
 		window.location = "principal.html";
	});
	

	//verifica si hay datos pendientes por envío
	db.transaction(Consulta);
 });