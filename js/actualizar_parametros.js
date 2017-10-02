/**
 * |author LONJA
 * |Fecha 20140218
 */
var id_usuario = window.localStorage.id_usr;

function descargar()
{
	//alert('http://'+localStorage.url_servidor+'/SIG/servicios/activos_actualizar_parametros.php?id_usuario='+id_usuario);
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
						    	for(var j in data[json][i]){ 	//Por cada reg	//alert(j+':'+data[json][i][j]);
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
						    	}
								//alert(i);
								if (i != "" && i != null) {
									var numm  = json-1;								//alert('MMM: '+numm);
									arr_ListaTabla[json-1] = [];
									arr_ListaTabla[json-1][0] = i;					//alert('Reg: '+json-1+': '+arr_ListaTabla[json-1][0]);
									arr_ListaTabla[json-1][1] = columnas;			//alert('Reg: '+json-1+': '+arr_ListaTabla[json-1][1]);
								}
							} 
						}

						TablaGuardar();
				}else{
					$.mobile.loading( 'hide' );
					alert("No hay Actualizaciones pendientes");
				}
			},
			error: function (error) {
					$.mobile.loading( 'hide' );
                  	alert("No hay conexión en el servidor Principal");
					window.location = "principal.html";
            }
		});
}


$( document ).ready(function() {
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
 });