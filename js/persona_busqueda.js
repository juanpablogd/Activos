// Start with the map page
var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

$(window).load(function () {
		var idcorredor = localStorage.idcorredor;		 	
		var nombre = localStorage.nombre;
		var idinscripcion = localStorage.idinscripcion;	//console.log("Nombre: "+nombre+"   Insss: "+idinscripcion);
		//if (nombre != null && nombre != "" && idinscripcion != null && idinscripcion != "") window.location = "main.html";
		 /* db.transaction(AlmacenaUsr);
		db.transaction(CargarAtletas); */
		
});

$(document).ready(function() {
	$("#titulo").html(localStorage.nom_empresa);
	sessionStorage.removeItem("txtBuscarSeccion");
	//SI YA ESTÁ REGISTRADO EL ELEMENTO Y LA PERSONA ENTONCES HABILITA LA OPCIÓN DE LA FIRMA
	$val = localStorage.persona_valor;	console.log($val);
	if($val != "" && $val != undefined && $val != null && $val != "null"){
			var res_persona = $val.split("|");
			//$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+res[1]+" -  "+res[2]+'</h4>');
			$("#seleccionado").html('<h4 align="center" style="margin: 6px;">'+res_persona[1]+" "+res_persona[2]+'</h4>');
			//$("#btn2").removeAttr("disabled");
			localStorage.busqueda = res_persona[0];
			db.transaction(CargarListado);		
	}else{
		$("#seleccionado").html('<h4 align="center">Busque una persona por favor</h4>');
	}
	
    $("#bcerrar_sesion").click(function(){
    	db.transaction(EliminaUsr);
    });
    
	//BOTÓN BUSQUEDA PERSONA
    $("#btnBuscar").click(function () {
    	var input = $("#txtBuscar").val();	console.log(input);
        if ( input.trim() != "" ) {
            localStorage.busqueda=input.trim();
	    	db.transaction(CargarListado);
            $("#lista").listview( "refresh" );
            $("#lista").trigger( "updatelayout");
        }else{
			alerta (
			    "Debe digitar el número de CC/TI!",  		// message
			    function(){
			    	$("#txtBuscar").focus();
			    },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
        }
    });
	
	//EVENTO CLICK DE LA LISTA DE COLABORADORES
	$('#lista').on('click', 'li', function(){
		var $this = $(this);
		console.log("Valor" + $this.attr('value'));
		console.log($this.text() + ' \nIndex ' + $this.index());
		if(localStorage.elemento_valor !== undefined){
			$val = localStorage.elemento_valor;		console.log($val);
			var res = $val.split("|");
		}	
		$val = $this.attr('value'); 			//id|referencia|nombre
		localStorage.persona_valor = $val; 
		var res_persona = $val.split("|");
		
		//$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+res[1]+'</h4>');
		$("#seleccionado").html('<h4 align="center" style="margin: 6px;">'+res_persona[1]+" "+res_persona[2]+'</h4>');
		$("#btn4").removeAttr("disabled");
	});
	
/*	$('#btn2').click(function() {
		window.location= 'p2_elemento_buscar.html';
	}); */
	//EVENTO CUANDO SE SELECCIONA ALGUNA DEPENDENCIA
	$("#dependencia").change(function() {
		var nombre = $("#dependencia option:selected").text();
		var id = $(this).val();
		localStorage.busqueda = id;
		var valTXTsec = $("#txtBuscarSeccion").val(); console.log (valTXTsec);
		if(valTXTsec.trim() == "")	sessionStorage.removeItem("txtBuscarSeccion");

		// CARGAR ITEMS SECCIONES SEGÚN DEPENDENCIAS
		db.transaction(ConsultaSecciones);
	});
	// CARGAR ORIGEN DE LA BASE DE DATOS
	db.transaction(ConsultaItems);
	// CARGAR SECCIÓN DE LA BASE DE DATOS
	//db.transaction(ConsultaSecciones);

	//GUARDAR FORMULARIO
	$('#btn_ok').click(function() {

		if ($( "#origen" ).val()==0){
			alerta (
			    "Seleccione un Origen por favor!",  		// message
			    function(){
			    	$( "#origen" ).focus();
			    },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
			return false;
		}
		
		if ($( "#seccion" ).val()==0){
			alerta (
			    "Seleccione una Dependencia/Sección por favor!",  		// message
			    function(){
			    	$("input[data-type='search']").focus();
			    },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
			return false;
		}
		
		if(localStorage.persona_valor == undefined || localStorage.persona_valor == "") {
			alerta (
			    "Busque una persona por favor!",  		// message
			    function(){
			    	$("input[data-type='search']").focus();
			    },         	// callback
			    'Activos',            	// title
			    'Ok'                  	// buttonName
			);
			return false;
		}
		localStorage.id_origen = $( "#origen" ).val();
		localStorage.id_dependencia = $( "#dependencia" ).val(); 
		localStorage.id_seccion = $( "#seccion" ).val();
		console.log(localStorage.id_origen);
		console.log(localStorage.id_dependencia);console.log(localStorage.id_seccion);
		console.log(localStorage.persona_valor);
		console.log("GUARDAR");
		window.location = "p2_elemento_buscar.html";
	});

	$('#txtBuscarSeccion').on('keyup', function() {
		var valor=this.value;
		 delay(function(){
			//var nombre = $("#dependencia option:selected").text();
			var id = $("#dependencia option:selected").val();
			localStorage.busqueda = id;
	      	if (valor.length > 3) {		console.log("Buscaaaa:"+valor);
				sessionStorage.setItem("txtBuscarSeccion", valor);
		     	db.transaction(ConsultaSecciones);
		    }else{
		     	sessionStorage.removeItem("txtBuscarSeccion");
		     	db.transaction(ConsultaSecciones);
		    }
		    // console.log("ole papa");
    	}, 100 );
	});

	
});

