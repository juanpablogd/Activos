/**
 * |author LONJA
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);

function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alert("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
	}
}
function successCB() {
    //alert("Ok!");
}

function editarPersona(cod){	console.log(cod);
	localStorage.persona_valor = cod;
	window.location = "editar_encargado.html";
}

/* BUSQUEDA EN LA TABLA PERSONA*/
function CargarListado(tx) {
	var busqueda=localStorage.busqueda;
	console.log("Busqueda: "+busqueda+"!"); //alert("Busqueda: "+busqueda);
	if(busqueda!=null){
	    tx.executeSql("SELECT cc,nombres,apellidos,telefono,correo,rowid FROM publicusuarios where cc like '%"+busqueda+"%' or nombres like '%"+busqueda+"%' or apellidos like '%"+busqueda+"%'", [], MuestraItems);
   }
}
/* RESULTADO DE LA TABLA PERSONA*/
function MuestraItems(tx, results) {
    var li = "";
	 	//li += '<li data-role="searchpage-list">Resultados </li>';				//<span class="ui-li-count">2</span>
	var encontrados = results.rows.length;		//alert(encontrados);
    for (var i=0;i<encontrados;i++)
	{

	 	var id = results.rows.item(i).cc;
	 	var nombres = results.rows.item(i).nombres;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
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
    } console.log(li);
	$("ul#lista").empty().append(li).listview("refresh");
    if(encontrados==0){
    	if (confirm("No se encontró la persona!! Desea crear una nueva PERSONA") == true) {
		    window.location="nuevo_encargado.html";
		}
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
		$("#btn2").removeAttr("disabled");
		
	}

}