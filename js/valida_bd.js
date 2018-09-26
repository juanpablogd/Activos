/**
 * |author Sofytek
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);

function errorCBv(err) {
	alerta (
	    "Debe sincronizar la base de datos",  // message
	    function(){
			window.location = "descargar.html";	    	
	    },         // callback
	    'Activos',            // title
	    'Ok'                  // buttonName
	);
}

/* BUSQUEDA EN LA TABLA ELEMENTO*/
function probarCBv(tx) {
	tx.executeSql("SELECT * FROM publicarticulo limit 0", [], MuestraCBv,errorCBv);
}
/* RESULTADO DE LA TABLA ELEMENTO*/
function MuestraCBv(tx, results) {
}

db.transaction(probarCBv);