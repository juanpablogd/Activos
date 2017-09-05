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
	if(localStorage.elemento_valor !=  "" && localStorage.elemento_valor !=  undefined && localStorage.elemento_valor !=  "null" && localStorage.persona_valor !=  "" && localStorage.persona_valor !=  undefined && localStorage.persona_valor !=  "null" )
	{
		$val = localStorage.elemento_valor; 
		var res = $val.split("@");
		$val = localStorage.persona_valor; 
		var res_persona = $val.split("@");
		//$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+res[1]+" -  "+res[2]+'</h4>');
		$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+'Ref: '+res[2]+'</h4>');
		$("#btn5").removeAttr("disabled");
	}
	
/*	//HABILITA BOTON GUARDAR
	var firma = localStorage.firma;
	if(firma != "" && firma != undefined && firma != "null"){
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
	
	//EVENTO CLICK DE LA LISTA DE COLABORADORES
	$('#lista').on('click', 'li', function(){
		var $this = $(this);
		console.log("Valor" + $this.attr('value'));
		console.log($this.text() + ' \nIndex ' + $this.index());
		
		$val = localStorage.elemento_valor;		//id@referencia@nombre
		var res = $val.split("@");

		$val = $this.attr('value'); 			//id@referencia@nombre
		localStorage.persona_valor = $val; 
		var res_persona = $val.split("@");
		
		//$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+res[1]+'</h4>');
		$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+'Ref: '+res[2]+'</h4>');
		$("#btn4").removeAttr("disabled");
		
		

	});
	
	$('#btn5').click(function() {
		window.location= 'p5_guardar.html';
	});
});

