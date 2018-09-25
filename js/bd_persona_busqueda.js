/**
 * |author LONJA
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);

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

function editarPersona(cod){	console.log(cod);
	localStorage.persona_valor = cod;
	window.location = "editar_encargado.html";
}
/****************************************************************************************************************************************************************/
/**CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS**/ 
function ConsultaItems(tx) {	//tx.executeSql('select id,tipo from publicp_tipo_elemento order by tipo', [], ConsultaItemsCarga,errorCB);
		tx.executeSql('select id_dependencia,nom_dependencia from activosdependencia order by nom_dependencia', [], ConsultaItemsCarga,errorCB);
}
function ConsultaItemsCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	var viddependencia = localStorage.id_dependencia;
	var seleccionado;
	for (i = 0; i < len; i++){
		seleccionado = ""; 
		var nombre = results.rows.item(i).nom_dependencia;
		var id = results.rows.item(i).id_dependencia;
		if(viddependencia == id) seleccionado = "selected";
		$('#dependencia').append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');
   	}
	/*Refresca estilo para cada uno de los controles*/
	$("#dependencia").selectmenu('refresh'); //console.log(viddependencia);
	if(viddependencia != "" && viddependencia != undefined){
		localStorage.busqueda = viddependencia;
		db.transaction(ConsultaSecciones);
	}
}
/****************************************************************************************************************************************************************/
/**CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES****CARGAR SECCIONES**/ 
function ConsultaSecciones(tx) {

			var InputBuscar=sessionStorage.getItem("txtBuscarSeccion");
			var where=' ';
		
			if(InputBuscar=== null){
				console.log("no existe");
			}else{
				where=where+ " and UPPER(nom_seccion) like '%"+InputBuscar.toUpperCase()+"%' ";	
			}

		//console.log('select id_seccion,nom_seccion from activosseccion where id_dependencia = "'+localStorage.busqueda+'" '+where+' order by nom_seccion');
		tx.executeSql('select id_seccion,nom_seccion from activosseccion where id_dependencia = "'+localStorage.busqueda+'" '+where+' order by nom_seccion', [], ConsultaSeccionesCarga,errorCB);
}
function ConsultaSeccionesCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	var vidseccion = localStorage.id_seccion;
	var seleccionado;
	$('#seccion').empty();
	$('#seccion').append('<option value="" >Seleccione...</option>');
	for (i = 0; i < len; i++){
		seleccionado = "";
		var nombre = results.rows.item(i).nom_seccion;
		var id = results.rows.item(i).id_seccion;
		if(vidseccion == id) seleccionado = "selected";
		$('#seccion').append('<option value="'+id+'" '+seleccionado+'>'+nombre+'</option>');

   	}
   	$("#seccion").selectmenu('refresh');
   	localStorage.busqueda = "";
}
/****************************************************************************************************************************************************************/
/* BUSQUEDA EN LA TABLA PERSONA*/
function CargarListado(tx) {
	var busqueda=localStorage.busqueda;
	console.log("Busqueda: "+busqueda+"!"); //console.log("Busqueda: "+busqueda);
	if(busqueda!=null && busqueda.trim() != ""){	console.log("SELECT cedula,nombres,apellidos,telefono,correo,rowid FROM activosusuario where cc = '"+busqueda+"' limit 1");
	    tx.executeSql("SELECT cedula,nombres,apellidos,telefono,correo,rowid FROM activosusuario where cedula = '"+busqueda+"' limit 1", [], MuestraItems);
   }
}
/* RESULTADO DE LA TABLA PERSONA*/
function MuestraItems(tx, results) {
    var li = "";
	 	//li += '<li data-role="searchpage-list">Resultados </li>';				//<span class="ui-li-count">2</span>
	var encontrados = results.rows.length;		//console.log(encontrados);
    for (var i=0;i<encontrados;i++)
	{
	 	var id = results.rows.item(i).cedula;
	 	var nombres = results.rows.item(i).nombres;					//console.log( "nombre = " + sessionStorage.getItem("nombre"));
	 	var apellidos = results.rows.item(i).apellidos;
	 	var telefono = results.rows.item(i).telefono;
	 	var correo = results.rows.item(i).correo;
	 	var rowid = results.rows.item(i).rowid;

	    li += "<li value='"+id+"|"+nombres+"|"+apellidos+"|"+telefono+"|"+correo+"|"+rowid+"'>"+
			    	"<div class='ui-block'>"+
				        "<h2>"+nombres+" "+apellidos+"</h2>"+
				        "<p>CC: "+id+"</p>"+
				        "<p>Tel: "+telefono+"</p>"+
				        "<p>Correo: "+correo+"</p>"+
				        "<a href='#' onclick=\"editarPersona('"+id+"|"+nombres+"|"+apellidos+"|"+telefono+"|"+correo+"|"+rowid+"');\"><h2>Editar</h2></a>"+
					"</div>"+  
			  "</li>";
    } //console.log(li);
	$("ul#lista").empty().append(li).listview("refresh");
    if(encontrados==0){
		confirmar (
		    "No se encontró la persona!! Desea crear una nueva PERSONA",  // message
		    function(buttonIndex){	console.log(buttonIndex);
		    	if(buttonIndex == undefined || buttonIndex =="2"){
		    		window.location="nuevo_encargado.html"; 	
		    	}
		    },         				// callback
		    'Activos',            	// title
		    ['Si','No']           	// buttonName
		);
    }else if(encontrados==1){
		console.log("Seleccionar:" + $('#lista li').attr('value'));
		if(localStorage.elemento_valor !== undefined){
			$val = localStorage.elemento_valor;		//id|referencia|nombre
			var res = $val.split("|");
		}
		$val = $('#lista li').attr('value'); //id|nombres|apellidos
		localStorage.persona_valor = $val; 
		var res_persona = $val.split("|");
		
		$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+'</h4>');
		//$("#btn2").removeAttr("disabled");
		
	}

}