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

	if (localStorage.getItem("Fotos") === null) {localStorage.Fotos = ""; console.log("Creación var fotos");}
	
	//HABILITA BOTON 3 - PERSONA RESPONSABLE
	var persona_valor = localStorage.persona_valor;
	if(persona_valor != "" && persona_valor != undefined && persona_valor != "null"){
		$("#btn5").removeAttr("disabled");
	}

	
	$("#add_foto").click(function(){
		if (typeof cordova !== 'undefined'){
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
						{ 	quality : foto_calidad									
				    		,destinationType : Camera.DestinationType.FILE_URI
				    		,sourceType : Camera.PictureSourceType.CAMERA
				    		,encodingType: Camera.EncodingType.JPEG
				    		,saveToPhotoAlbum:true
				    		,correctOrientation:true
						}
			);	
		}else{
			onPhotoDataSuccess("data:image/jpeg;base64,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");		
		}
	});
	
	$('#btn4').click(function() {
		window.location= 'p4_firma.html';
	});

});