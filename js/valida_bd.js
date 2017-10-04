/**
 * |author Sofytek
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);

function errorCBv(err) {
	alert("Debe sincronizar la base de datos");
	window.location="descargar.html";
}

/* BUSQUEDA EN LA TABLA ELEMENTO*/
function probarCBv(tx) {
	tx.executeSql("SELECT * FROM publicarticulos limit 0", [], MuestraCBv,errorCBv);
}
/* RESULTADO DE LA TABLA ELEMENTO*/
function MuestraCBv(tx, results) {
}

db.transaction(probarCBv);