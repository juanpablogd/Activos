// Start with the map page

$(window).load(function () {
		/*var idcorredor = localStorage.idcorredor;		 	
		var nombre = localStorage.nombre;
		var idinscripcion = localStorage.idinscripcion;	//alert("Nombre: "+nombre+"   Insss: "+idinscripcion);
		//if (nombre != null && nombre != "" && idinscripcion != null && idinscripcion != "") window.location = "main.html";
		  db.transaction(AlmacenaUsr);
		db.transaction(CargarAtletas); */
});

$(document).ready(function() {
    app.initialize();
	function leer(){
		cordova.plugins.barcodeScanner.scan(
			function(result) {			//$val = result.text; alert($val); //var res = $val.split("@");
				localStorage.busqueda = result.text; 
				db.transaction(CargarListado);
			},
			function (error){
				alert("Error: " + error);
			}
		);
	}
	
	localStorage.busqueda = "";
	
	//HABILITA BOTON 2 - ELEMENTO
	var elemento_valor = localStorage.elemento_valor; console.log(elemento_valor); 
	if(elemento_valor != "" && elemento_valor != undefined && elemento_valor != null && elemento_valor != "null" )
	{
		var res = elemento_valor.split("@");	//alert(res[1]);
		$("#seleccionado").html('<h4 align="center">'+res[1]+" -  "+res[2]+'</h4>');
		$("#btn2").removeAttr("disabled");
		$("#btn3").removeAttr("disabled");
		if(res[1] == "" ){
			alert("Registre la plaqueta por favor");
			window.location = "elemento_editar.html";			
		}
	}
	//HABILITA BOTON 3 - PERSONA RESPONSABLE
	var persona_valor = localStorage.persona_valor;
	if(persona_valor != "" && persona_valor != undefined && persona_valor != "null" && localStorage.elemento_valor != "" && elemento_valor != "" && elemento_valor != undefined && elemento_valor != null && elemento_valor != "null"){
		$("#btn5").removeAttr("disabled");
	}

/*	//HABILITA BOTON GUARDAR
	var firma = localStorage.firma;
	console.log("Log: "+localStorage.elemento_valor);
	if(firma != "" && firma != undefined && firma != "null" && localStorage.elemento_valor != ""){
		$("#btn5").removeAttr("disabled");
	}	*/
	
	
    $("#bcerrar_sesion").click(function(){
    	db.transaction(EliminaUsr);
    });
    
	//CUANDO SE DIGITA UN CARACTER FILTRA EN LA LISTA
    $("#lista").on( "listviewbeforefilter", function ( e, data ) {
	        var $ul = $( this ),
	            $input = $( data.input ),
	            value = $input.val(),
	            html = "";
	        $ul.html( "" );
	        if ( value && value.length > 3 ) {
				console.log("encontrados: " + $("#lista li").size());
	            localStorage.busqueda=$input.val();
		    	db.transaction(CargarListado);
	            $ul.listview( "refresh" );
	            $ul.trigger( "updatelayout"); 
	        }
        
    });
      
	//EVENTO CLICK DE LA LISTA DE ARTICULOS
	$('#lista').on('click', 'li', function(){
		var $this = $(this);
		console.log("Valor" + $this.attr('value'));
		console.log($this.text() + ' \nIndex ' + $this.index());
		
		$val = $this.attr('value'); //id@referencia@nombre
		localStorage.elemento_valor = $val; 
		var res = $val.split("@");
		$("#seleccionado").html('<h4 align="center">'+res[2]+" -  "+res[1]+'</h4>');
		$("#btn2").removeAttr("disabled");
		$("#btn3").removeAttr("disabled");

	});
	
	//Opción Escanear
    $("#escanear").click(function(){
    	leer();
    });
	
	//DIRECCIONA OPCION FOTO
	$('#btn2').click(function() {
		window.location= 'p2_foto.html';
	});
	//DIRECCIONA SELECCIONAR PERSONA
	$('#btn3').click(function() {
		window.location= 'p3_persona_buscar.html';
	});
	//DIRECCIONA OPCION PERSONA
	$('#btn4').click(function() {
		window.location= 'p4_firma.html';
	});
	//DIRECCIONA OPCION GUARDAR
	$('#btn5').click(function() {
		window.location= 'p5_guardar.html';
	});

});