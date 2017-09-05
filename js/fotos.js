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
	
/*	//HABILITA BOTON GUARDAR
	var firma = localStorage.firma;
	if(firma != "" && firma != undefined && firma != "null"){
		$("#btn5").removeAttr("disabled");
	} */
	 
	//alert(localStorage.Fotos);
	if(localStorage.Fotos != "" )
	{
		var data = JSON.parse(localStorage.getItem('Fotos'));
		$.each(data, function(i, item) {	//alert(data[i]);

			//VERIFICA SI EXISTEN ELEMENTOS IMG, SI HAY VERIFICA SI HAY DISPONIBILIDAD PARA CAPTURA DE FOTOGRAFÍA
			var img_disponible = false;
			//ARRAY DE FOTOS
			$("img").each(function() {
				if($(this).attr('src')=="" || $(this).attr('src')==null){
					NomIdimage=$(this).attr('id');
					img_disponible = true;
					return false; 											//Espacio Disponible
				}
			});																	//	alert(img_disponible);
			//SI NO EXISTE CREA EL ELEMENTO IMG PARA ALMACENAR LA FOTO
			if(img_disponible==false){
				$("#lista_fotos").append('<div id="bloque'+i_foto+'"><img id="cameraImage'+i_foto+'" src="" width="320" height="210" align="center"/><button onclick="elimina_foto('+i_foto+')" id="btn_elimina'+i_foto+'" data-theme="a" data-icon="arrow-u" data-mini="true" data-iconpos="left">Eliminar Foto</button></div>');
					//$('#btn_elimina'+i_foto+'').button();
				NomIdimage = "cameraImage"+i_foto;
				i_foto++;
			}
		
		    image = document.getElementById(NomIdimage);
		    image.style.display = 'block';	//alert(imageData);
		    image.src = data[i];				//alert(imageData);
		
		});
		
		$("#api-camera").trigger("create");
		$("#lista_fotos").trigger("create");
		$("#"+NomIdimage).trigger("create");	

		data.length=0;
	}
	
	$("#add_foto").click(function(){
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
					{ 	quality : foto_calidad									
			    		,destinationType : Camera.DestinationType.FILE_URI
			    		,sourceType : Camera.PictureSourceType.CAMERA
			    		,encodingType: Camera.EncodingType.JPEG,
			    		correctOrientation:true
					}
		); 
		return false;
	});
	
	$('#btn4').click(function() {
		window.location= 'p4_firma.html';
	});

});
/*		 
	var testObject = { 'one': 1, 'two': 2, 'three': 3 };
	var mycars = new Array();
	mycars[0] = "data:image/jpeg;base64,Saab";
	mycars[1] = "data:image/jpeg;base64,Volvo";
	mycars[2] = "data:image/jpeg;base64,BMW";
	mycars.push("Renault Logan jp!");
	// Put the object into storage
	localStorage.setItem('Fotos', JSON.stringify(mycars));
	// Retrieve the object from storage
	
	//console.log('retrievedObject: ', JSON.parse(retrievedObject)); 
	var retrievedObject = localStorage.getItem('Fotos');
	var data = JSON.parse(retrievedObject);
	$.each(data, function(i, item) {
	    alert(data[i]);
	});
	//}
	
	var index = data.indexOf("data:image/jpeg;base64,BMW"); alert(index);
	if (index > -1) {
	    data.splice(index, 1);
	}
	localStorage.setItem('Fotos', JSON.stringify(data));	*/