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

/* BUSQUEDA EN LA TABLA ELEMENTO*/
function CargarListado(tx) {
	var busqueda=localStorage.consulta.trim(); //console.log("Busqueda: "+busqueda+"!"); //alert("Busqueda: "+busqueda); alert("SELECT * FROM publicp_elemento where referencia like '%"+busqueda+"%'");
	if(busqueda!=null){ console.log('SELECT el.idarticulo,el.rowid as id,el.referencia,el.numero_serie_af,plaqueta_af,plaqueta_anterior1_af,el.nombre,te.nombres||" "||te.apellidos as responsable,idusuario_envio,el.id_envio FROM publicarticulos el left join publicusuarios te on (el.cc_responsable_af = te.cc and el.cc_responsable_af != "") where referencia like "%'+busqueda+'%" or nombre like "%'+busqueda+'%" or numero_serie_af like "%'+busqueda+'%" or plaqueta_af like "%'+busqueda+'%" or plaqueta_anterior1_af like "%'+busqueda+'%" limit 200');
	                  tx.executeSql('SELECT el.idarticulo,el.rowid as id,el.referencia,el.numero_serie_af,plaqueta_af,plaqueta_anterior1_af,el.nombre,te.nombres||" "||te.apellidos as responsable,idusuario_envio,el.id_envio FROM publicarticulos el left join publicusuarios te on (el.cc_responsable_af = te.cc and el.cc_responsable_af != "") where referencia like "%'+busqueda+'%" or nombre like "%'+busqueda+'%" or numero_serie_af like "%'+busqueda+'%" or plaqueta_af like "%'+busqueda+'%" or plaqueta_anterior1_af like "%'+busqueda+'%" limit 200', [], MuestraItems);
   }
}
/* RESULTADO DE LA TABLA ELEMENTO*/
function MuestraItems(tx, results) {
    var li = "";								//li += '<li data-role="searchpage-list">Resultados </li>';				//<span class="ui-li-count">2</span>
	var encontrados = results.rows.length;		console.log('Encontrados: '+encontrados);
	$("ul#lista").empty();
    for (var i=0;i<encontrados;i++)
	{
	 	var id = results.rows.item(i).id;
	 	var idarticulo = results.rows.item(i).idarticulo;
	 	var referencia = results.rows.item(i).referencia;
	 	var nombre = results.rows.item(i).nombre;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	var responsable = results.rows.item(i).responsable;	if(responsable==null) responsable = "";
	 	var numero_serie_af = results.rows.item(i).numero_serie_af;
	 	var plaqueta_af = results.rows.item(i).plaqueta_af;
	 	var plaqueta_anterior1_af = results.rows.item(i).plaqueta_anterior1_af;
	 	var bid_envio = results.rows.item(i).id_envio;
	 	var idusuario_envio = results.rows.item(i).idusuario_envio;
	 	var cod_id;
	 	if(idarticulo != null && idarticulo != "null" && idarticulo != ""){
	 		cod_id = idarticulo;
	 	}else{
	 		cod_id = bid_envio;
	 	}	console.log(cod_id);

	    li = "<li value='"+idarticulo+"|"+plaqueta_af+"|"+nombre+"|"+id+"'>"+
			"<a href='#'>"+
			    	"<div class='ui-block'>"+
				        "<h2>"+nombre+"</h2>"+
				        "<p>Responsable: "+responsable+"</p>"+
				        "<p>N° Serie: "+numero_serie_af+"</p>"+
				        "<h2>N° Actual: "+plaqueta_af+"</h2>"+
				        "<p>N° Anterior: "+plaqueta_anterior1_af+"</p>"+
				        "<p id='usr"+cod_id+"'></p>"+
					"</div>"+  
			  "</a>"
			  + "</li>";
		$("ul#lista").append(li);
		if(idusuario_envio != null && idusuario_envio != "null" && idusuario_envio != ""){
			  console.log('SELECT usuario as usr, "'+cod_id+'" as rowid FROM publicusuarios where idusuario ="'+idusuario_envio+'"');
			tx.executeSql('SELECT usuario as usr, "'+cod_id+'" as rowid FROM publicusuarios where idusuario ="'+idusuario_envio+'"', [], 
				function ConsultaCargueusr(tx, resultnf) {	console.log(resultnf.rows.length);
					if(resultnf.rows.length>0){
						$("#usr"+resultnf.rows.item(0).rowid).html("Usuario: "+resultnf.rows.item(0).usr);	
					}
				}
			);
		}
    }
	$("ul#lista").listview("refresh");

	localStorage.consulta = null;
    if(encontrados==0){
    	if (confirm("No se encontró el ELEMENTO!! Desea crear uno nuevo?") == true) {
		    window.location="nuevo_elemento.html";
		}
    }
}

$(document).ready(function() {

	//BOTÓN BUSQUEDA ELEMENTO
    $("#btnBuscar").click(function () {
    	var input = $("#txtBuscar").val();	console.log(input);
        if ( input.trim() != "" ) {
            localStorage.consulta=input.trim();
	    	db.transaction(CargarListado);
            $("#lista").listview( "refresh" );
            $("#lista").trigger( "updatelayout");
        }else{
        	alert("Debe digitar el número de Placa o Serial");
        	$("#txtBuscar").focus();
        }
    });
    
	//EVENTO CLICK DE LA LISTA DE ARTICULOS
	$('#lista').on('click', 'li', function(){
		var $this = $(this);							//console.log("Valor: " + $this.attr('value'));	//console.log($this.text() + ' \nIndex ' + $this.index());
		$val = $this.attr('value'); 					//id|referencia|nombre
		localStorage.elemento_valor = $val;				console.log(localStorage.persona_valor);
		window.location = "elemento_editar.html";		//console.log('<h4 align="center">'+res[1]+" -  "+res[2]+'</h4>');	//$("#btn2").removeAttr("disabled");	//$("#btn3").removeAttr("disabled");
	});
      
});

console.log("Valor ELEMENTO: "+localStorage.elemento_valor);
if(localStorage.elemento_valor != ""){
	var elemento_valor = localStorage.elemento_valor; //console.log(elemento_valor);
	if(elemento_valor !== undefined){
		var res = elemento_valor.split('|');
		localStorage.consulta = res[1];
		db.transaction(CargarListado);
	}
}