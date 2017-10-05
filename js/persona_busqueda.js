// Start with the map page

$(window).load(function () {
		var idcorredor = localStorage.idcorredor;		 	
		var nombre = localStorage.nombre;
		var idinscripcion = localStorage.idinscripcion;	//alert("Nombre: "+nombre+"   Insss: "+idinscripcion);
		//if (nombre != null && nombre != "" && idinscripcion != null && idinscripcion != "") window.location = "main.html";
		 /* db.transaction(AlmacenaUsr);
		db.transaction(CargarAtletas); */
		
});

$(document).ready(function() {
	//SI YA ESTÁ REGISTRADO EL ELEMENTO Y LA PERSONA ENTONCES HABILITA LA OPCIÓN DE LA FIRMA
	$val = localStorage.persona_valor;	console.log($val);
	if($val != "" && $val != undefined && $val != null && $val != "null"){
			var res_persona = $val.split("|");
			//$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+res[1]+" -  "+res[2]+'</h4>');
			$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+'</h4>');
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
        	alert("Debe digitar el número de CC/TI");
        	$("#txtBuscar").focus();
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
		$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+'</h4>');
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
		// CARGAR ITEMS SECCIONES SEGÚN DEPENDENCIAS
		db.transaction(ConsultaSecciones);
	});
	// CARGAR ITEMS DE LA BASE DE DATOS
	db.transaction(ConsultaItems);

	//GUARDAR FORMULARIO
	$('#btn_ok').click(function() {
		if ($( "#seccion" ).val()==0){
			alert("Seleccione una Dependencia/Sección por favor");
			$("#seccion").focus();
			return false;
		}
		
		if(localStorage.persona_valor == undefined || localStorage.persona_valor == ""){
			alert("Busque una persona por favor!");
			$("input[data-type='search']").focus();
			return false;
		}
		localStorage.iddependencia = $( "#dependencia" ).val(); 
		localStorage.idseccion = $( "#seccion" ).val();
		console.log(localStorage.iddependencia);
		console.log(localStorage.idseccion);
		console.log(localStorage.persona_valor);
		console.log("GUARDAR");
		window.location = "p2_elemento_buscar.html";
/*		if ($( "#select-native-1" ).val()==0){
			alert("Seleccione un estado por favor");
			$("#select-native-1").focus();
			return false;
		}
		db.transaction(GuardaElemento); */
	});
	
});

