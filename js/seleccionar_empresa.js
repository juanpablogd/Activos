var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
// Start with the map page
$(window).load(function () {
		/*
		var idcorredor = localStorage.idcorredor;		 	
		var nombre = localStorage.nombre;
		var idinscripcion = localStorage.idinscripcion;	//console.log("Nombre: "+nombre+"   Insss: "+idinscripcion);
		*/
		//if (nombre != null && nombre != "" && idinscripcion != null && idinscripcion != "") window.location = "main.html";
		 /* db.transaction(AlmacenaUsr);
		db.transaction(CargarAtletas); */
		
});

function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		//console.log("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
}

/****************************************************************************************************************************************************************/
/**CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS****CARGAR ITEMS**/ 
function ConsultaItems(tx) {
		tx.executeSql('select idempresa,nombre from publicempresa order by nombre', [], ConsultaItemsCarga,errorCB);
}
function ConsultaItemsCarga(tx, results) {
	var len = results.rows.length;	//console.log(len);
	for (i = 0; i < len; i++){
		var nombre = results.rows.item(i).nombre;
		var id = results.rows.item(i).idempresa;
		$('#empresa').append('<option value="'+id+'">'+nombre+'</option>');
   	}
	if (len == 1) {
		localStorage.idempresa = id;
		localStorage.empresa = nombre;
		$("#nom_empresa").html('<strong>'+nombre+'</strong>');
	}	

	/*Refresca estilo para cada uno de los controles*/

}
/****************************************************************************************************************************************************************/

$(document).ready(function() {
	// CARGAR ITEMS DE LA BASE DE DATOS
	db.transaction(ConsultaItems);
	
	$("#empresa").change(function() {
		var nombre = $("#empresa option:selected").text();
		var id = $(this).val();

		localStorage.idempresa = id;
		localStorage.empresa = nombre;
		
		$("#nom_empresa").html('<strong>'+nombre+'</strong>');
	});
	
});