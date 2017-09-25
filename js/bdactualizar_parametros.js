var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
var arr_tabla = new Array();
var arr_ListaTabla = new Array();

function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		//console.clear();
    	alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
   	}
}

function successCB() {
    //alert("TRANSACION Ok!");
}

function TablaGuardar(){
	db.transaction(TablaGuardarExe, errorCB);
	
}
function TablaGuardarExe(tx) {
	$.mobile.loading( 'show', { text: 'Almacenando Información....', textVisible: true, theme: 'a', html: "" });
	
	for(var fil = 0; fil < arr_ListaTabla.length; fil++) {																	//alert('Registro: '+fil+': '+arr_ListaTabla[fil]);				
		$.mobile.loading( 'show', { text: 'Creando '+arr_ListaTabla[fil][0], textVisible: true, theme: 'a', html: "" });	//alert('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]+';');
		tx.executeSql('DROP TABLE IF EXISTS '+arr_ListaTabla[fil][0]);														//console.log('CREATE TABLE IF NOT EXISTS '+arr_ListaTabla[fil][0]+' ('+arr_ListaTabla[fil][1]+')');
		tx.executeSql('CREATE TABLE IF NOT EXISTS '+arr_ListaTabla[fil][0]+' ('+arr_ListaTabla[fil][1]+')');
		if(arr_ListaTabla[fil][0] == "publicinventario"){
			tx.executeSql('CREATE INDEX idx_inv_publicinventario_cc_responsable ON publicinventario (cc_responsable);');	
		}
	}																														//alert("Longitud: "+arr_tabla.length);
	
	$.mobile.loading( 'show', { text: 'Ingresando datos... ', textVisible: true, theme: 'a', html: "" });

	for(var fil = 0; fil < arr_tabla.length; fil++) { //arr_tabla.length					
		//console.log('INSERT INTO '+arr_tabla[fil][0]+' ('+arr_tabla[fil][1]+') values ('+arr_tabla[fil][2]+');');
		tx.executeSql('INSERT INTO '+arr_tabla[fil][0]+' ('+arr_tabla[fil][1]+') values ('+arr_tabla[fil][2]+');'); //alert('INSERT INTO '+arr_tabla[fil][0]+' ('+arr_tabla[fil][1]+') values ('+arr_tabla[fil][2]+');');
	}
	
	$.mobile.loading( 'hide' );
	alert("Actualización exitosa");
	window.location = "principal.html";
}