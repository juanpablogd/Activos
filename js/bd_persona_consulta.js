/**
 * @author LONJA
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

/* BUSQUEDA EN LA TABLA ELEMENTO*/
function CargarListado(tx) {
	var busqueda=localStorage.consulta;			console.log("Busqueda: "+busqueda+""); //alert("Busqueda: "+busqueda); alert("SELECT * FROM publicp_elemento where referencia like '%"+busqueda+"%'");
	if(busqueda!=null){ console.log("SELECT cc,nombres,apellidos,telefono FROM publicusuarios te  where nombres like '%"+busqueda+"%' or apellidos like '%"+busqueda+"%' or cc like '%"+busqueda+"%' or nombres||' '||apellidos like '%"+busqueda+"%'");
	    tx.executeSql("SELECT cc,nombres,apellidos,telefono FROM publicusuarios te  where nombres like '%"+busqueda+"%' or apellidos like '%"+busqueda+"%' or cc like '%"+busqueda+"%' or nombres||' '||apellidos like '%"+busqueda+"%'", [], MuestraItems);
   }
}
/* RESULTADO DE LA TABLA ELEMENTO*/
function MuestraItems(tx, results) {
    var li = "";								//li += '<li data-role="searchpage-list">Resultados </li>';				//<span class="ui-li-count">2</span>
	var encontrados = results.rows.length;		console.log('Encontrados:'+encontrados);
    for (var i=0;i<encontrados;i++)
	{
	 	var cc = results.rows.item(i).cc;
	 	var nombres = results.rows.item(i).nombres;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	var apellidos = results.rows.item(i).apellidos;
	 	var telefono = results.rows.item(i).telefono;

	    li += "<li value='"+cc+"@"+nombres+"@"+apellidos+"'>"+
			"<a href='#'>"+
			    	"<div class='ui-block'>"+
				        "<h2>"+nombres+" "+apellidos+"</h2>"+
				        "<p>Tel.: "+telefono+"</p>"+
				        "<h2>CC: "+cc+"</h2>"+
					"</div>"+  
			  "</a>"
			  + "</li>";
		
    }
    if(encontrados==0) alert("No se encontró la persona");
	$("ul#lista").empty().append(li).listview("refresh");
	//localStorage.consulta = null;

}

$(document).ready(function() {
    $("#lista").on( "listviewbeforefilter", function ( e, data ) {
        var $ul = $( this ),	$input = $( data.input ),	value = $input.val(),	html = "";
        $ul.html( "" );
        if ( value && value.length > 4 ) {
			//console.log("encontrados: " + $("#lista li").size());
            localStorage.consulta=$input.val();
	    	db.transaction(CargarListado);
            $ul.listview( "refresh" );
            $ul.trigger( "updatelayout");
        }
    });  
    
	//EVENTO CLICK DE LA LISTA DE PERSONA
	$('#lista').on('click', 'li', function(){
		var $this = $(this);							//console.log("Valor: " + $this.attr('value'));	//console.log($this.text() + ' \nIndex ' + $this.index());
		$val = $this.attr('value'); 					//id@referencia@nombre
		localStorage.persona_valor = $val;				console.log(localStorage.persona_valor);
		window.location = "persona_verificar.html";		//console.log('<h4 align="center">'+res[1]+" -  "+res[2]+'</h4>');	//$("#btn2").removeAttr("disabled");	//$("#btn3").removeAttr("disabled");
	});
		
});

console.log("Valor Persona: "+localStorage.persona_valor);
if(localStorage.persona_valor != ""){
	var cedula = localStorage.persona_valor; console.log(cedula);
	if(cedula !== undefined){
		var res = cedula.split('@');
		localStorage.consulta = res[0];
		db.transaction(CargarListado);
	}
}