/**
 * |author LONJA
 * |Fecha 20130831
 * |Fecha 20130930
 */
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var nombre = window.localStorage.nombre;
function LimpiarUsuario(tx) {
	tx.executeSql('UPDATE usuario set conectado = ""');
	window.location = "index.html";
}
function descargar()
{
	localStorage.clear();
	setTimeout(function(){ db.transaction(LimpiarUsuario); }, 99);
}


$( document ).ready(function() {
    $("#btn_si").click(function( event ) {
    	$("#btn_si").remove();
    	$("#btn_no").remove();
 		descargar();
	});
    $("#btn_no").click(function( event ) {
 		window.location = "principal.html";
	});
	$("#Lpregunta").text(nombre+'! Seguro que desea cerrar sesión?');
 });