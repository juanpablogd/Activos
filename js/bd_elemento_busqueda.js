/**
 * |author LONJA
 **/
var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);

function editarElemento(cod){	console.log(cod);
	localStorage.elemento_valor = cod;
	window.location = "elemento_editar.html";
}

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
	var busqueda=localStorage.busqueda;				//alert("Busqueda: "+busqueda+"!"); //console.log("SELECT el.idarticulo id,el.referencia,el.plaqueta,el.nombre,se.nombre seccion,sl.nombre clasificacion FROM publicarticulos el inner join publicsecciones se on se.idseccion = el.idseccion inner join publicsublineas sl on sl.idslinea = el.idslinea where numero_serie like '%"+busqueda+"%' or plaqueta like '%"+busqueda+"%' or plaqueta_anterior like '%"+busqueda+"%' or el.nombre like '%"+busqueda+"%' order by el.nombre");
	
	if(busqueda!=null){
		  console.log("SELECT el.idarticulo id,el.referencia,el.plaqueta_af,el.nombre,se.nombre seccion,sl.nombre clasificacion,el.id_envio,el.rowid,el.id_estado FROM publicarticulos el inner join publicsecciones se on se.idseccion = el.idseccion inner join publicsublineas sl on sl.idslinea = el.idslinea where numero_serie_af = '"+busqueda+"' or plaqueta_af = '"+busqueda+"' or plaqueta_anterior1_af = '"+busqueda+"' order by id_envio desc,el.idarticulo desc limit 1");
	    tx.executeSql("SELECT el.idarticulo id,el.referencia,el.plaqueta_af,el.nombre,se.nombre seccion,sl.nombre clasificacion,el.id_envio,el.rowid,el.id_estado FROM publicarticulos el inner join publicsecciones se on se.idseccion = el.idseccion inner join publicsublineas sl on sl.idslinea = el.idslinea where numero_serie_af = '"+busqueda+"' or plaqueta_af = '"+busqueda+"' or plaqueta_anterior1_af = '"+busqueda+"' order by id_envio desc,el.idarticulo desc limit 1", [], MuestraItems);
   }
}
/* RESULTADO DE LA TABLA ELEMENTO*/
function MuestraItems(tx, results) {
	//alert("Busqueda MuestraItems: "+localStorage.busqueda+"!");
	//CORRIGE BUG
	if(localStorage.busqueda == "") return false;
	
    var li = "";
	 	//li += '<li data-role="searchpage-list">Resultados </li>';				//<span class="ui-li-count">2</span>
	var encontrados = results.rows.length;		console.log('Encontrados:'+encontrados); //alert('Encontrados:'+encontrados);
    for (var i=0;i<encontrados;i++)
	{
	 	var id = results.rows.item(i).id;
	 	var referencia = results.rows.item(i).referencia;
	 	var plaqueta = results.rows.item(i).plaqueta_af; var plaqueta = plaqueta.trim();
	 	var nombre = results.rows.item(i).nombre;					//alert( "nombre = " + sessionStorage.getItem("nombre"));
	 	var seccion = results.rows.item(i).seccion;
	 	var clasificacion = results.rows.item(i).clasificacion;
	 	var id_envio_art = results.rows.item(i).id_envio;
	 	var id_estado = results.rows.item(i).id_estado;
	 	var rowid = results.rows.item(i).rowid;
	 	
	    li += "<li value='"+id+"|"+plaqueta+"|"+nombre+"|"+rowid+"|"+id_estado+"'>"+
		    	"<div class='ui-block'>"+
			        "<h2>"+nombre+"</h2>"+
			        "<p>Ref: "+referencia+"</p>"+
			        "<p>"+seccion+" - "+plaqueta+"</p>"+
			        "<h2>"+clasificacion+"</h2>"+
			        "<p>Fotos actualizadas: <label id='nf"+rowid+"'><label></p>"+
			        "<a href='#' id='btnEditar' onclick=\"editarElemento('"+id+"|"+plaqueta+"|"+nombre+"|"+rowid+"');\"><h2>Editar</h2></a>"+
				"</div>"+  
			  "</li>";
    }
    if(encontrados==0){
    	if (confirm("No se encontró el ELEMENTO!! Desea crear uno nuevo?") == true) {
		    window.location="nuevo_elemento.html";
		}
    }else{ console.log('SELECT rowid,url,id_envio FROM publicarticulos_fotos where id_envio = "'+results.rows.item(0).id_envio+'" or id_envio = "'+results.rows.item(0).id+'"');
    	tx.executeSql('SELECT rowid,url,id_envio FROM publicarticulos_fotos where id_envio = "'+results.rows.item(0).id_envio+'" or id_envio = "'+results.rows.item(0).id+'"', [], 
    		function ConsultaSincronizarInventario(tx, resFotos) {
    			var numFotos = resFotos.rows.length;		console.log('numFotos: '+numFotos); //alert('Encontrados:'+encontrados);
			    for (var f=0;f<numFotos;f++)
				{
					$("#lista_fotos").append('<div id="bloque'+resFotos.rows.item(f).rowid+'"><img id="cameraImage'+resFotos.rows.item(f).rowid+'" src="'+resFotos.rows.item(f).url+'" width="320" height="210" align="center"/></div>');
					
				}	console.log(results.rows.item(0).rowid);
				$("#nf"+results.rows.item(0).rowid).html(numFotos);
				if(numFotos>0 && numFotos<4){
					$("#btn_ok").show();
				}else{
					alert("Debe adicionar las fotos del elemento!");
					console.log($("#btnEditar").attr("onclick"));
					var par = $("#btnEditar").attr("onclick").split("'");
					editarElemento(par[1]);
				}
    		}
    		,
    		function errorCB_Fotos(err) {
				if (err.code === undefined || err.message === undefined){
					console.log("<br>Error al buscar las fotografias<br>");
				}else
				{ 
					console.log("Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message);
				}
			}
    	);
    }
    //console.log(li); //alert(li);
	$("ul#lista").empty().append(li).listview("refresh");
	
		if(encontrados==1){
			console.log("Seleccionar:" + $('#lista li').attr('value'));
			$val = $('#lista li').attr('value'); //id|referencia|nombre
			localStorage.elemento_valor = $val; 
			var res = $val.split("|");
			$("#seleccionado").html('<h4 align="center"> '+res[2]+" -  "+res[1]+'</h4>');
			$("#btn2").removeAttr("disabled");
			//$("#btn3").removeAttr("disabled");
	//		alert(plaqueta);
			 
		}	
}