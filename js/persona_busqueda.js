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
	if($val !== undefined){
		var res_persona = $val.split("|");
		//$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+" - "+res[1]+" -  "+res[2]+'</h4>');
		$("#seleccionado").html('<h4 align="center">'+res_persona[1]+" "+res_persona[2]+'</h4>');
		$("#btn2").removeAttr("disabled");
		localStorage.busqueda = res_persona[0];
		db.transaction(CargarListado);		
	}
	
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
        if ( value && value.length > 5 ) {
			console.log("encontrados: " + $("#lista li").size());
            localStorage.busqueda=$input.val().trim();
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
	
	$('#btn2').click(function() {
		window.location= 'p2_elemento_buscar.html';
	});
	
});
