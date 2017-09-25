var NomIdimage=null; //id de la imagen disponible 
var i_foto=0;
var foto_calidad;
var foto_tamano;


if(localStorage.foto_calidad=="" || localStorage.foto_calidad == undefined){
	foto_calidad = "30";
}else{
	foto_calidad = localStorage.foto_calidad;
}	//alert(foto_calidad);


function elimina_foto(num){											console.log(num);
	if($("#cameraImage"+num).attr('src') != "" && $("#cameraImage"+num).attr('src') != undefined){
		var str = $("#cameraImage"+num).attr('src'); //LLAMA LA URL DE LA IMAGEN 
		$("#cameraImage"+num).attr('src')=="";		//LIMPIA EL CUADRO DE IMAGEN
		if (localStorage.getItem('Fotos')!=""){
				var arr_tmp_fotos = JSON.parse(localStorage.getItem('Fotos'));
				var index = 0;
				//BUSCA LA IMAGEN SELECCIONADA
					$.each(arr_tmp_fotos, function(i, item) {		console.log(i);		console.log(item);
					    var arr_str = arr_tmp_fotos[i];				//arr_tmp_fotos[i].substring(arr_tmp_fotos[i].length-20,arr_tmp_fotos[i].length); 
					    console.log(str+" "+arr_str);
					    if(str==arr_str){ console.log("iguales");
					    	return false;
					    }
					    index++;
					});
				//alert(index);
				if (index > -1) {
				    arr_tmp_fotos.splice(index, 1);
				}
				localStorage.setItem('Fotos', JSON.stringify(arr_tmp_fotos));
				arr_tmp_fotos.length=0;
		}
		
	}	
	$("#bloque"+num).remove();
	$("#api-camera").trigger("create");
		
}

function onFail(message) {
	$("img").each(function() {
		if($(this).attr('src')=="" || $(this).attr('src')==null){
			$(this).remove();
		}
	});		
	alert('Falló al capturar Foto'); //message
}
    
// api-camera
function onPhotoDataSuccess(imageData) {	
	//alert("Foto Capturada");
	//VERIFICA SI EXISTEN ELEMENTOS IMG, SI HAY VERIFICA SI HAY DISPONIBILIDAD PARA CAPTURA DE FOTOGRAFÍA
	var img_disponible = false;
	//ARRAY DE FOTOS
	$("img").each(function() {
		if($(this).attr('src')=="" || $(this).attr('src')==null){
			NomIdimage=$(this).attr('id');
			img_disponible = true;
			return false; 											//Espacio Disponible
		}
	});																	
	//SI NO EXISTE CREA EL ELEMENTO IMG PARA ALMACENAR LA FOTO
	if(img_disponible==false){
		$("#lista_fotos").append('<div id="bloque'+i_foto+'"><img id="cameraImage'+i_foto+'" src="" width="320" height="210" align="center"/><button onclick="elimina_foto('+i_foto+')" id="btn_elimina'+i_foto+'" data-theme="a" data-icon="arrow-u" data-mini="true" data-iconpos="left" value="0">Eliminar Foto</button></div>');
		$("#api-camera").trigger("create");
		$("#lista_fotos").trigger("create");
		$("#"+NomIdimage).trigger("create");							//alert('Calidad: '+foto_calidad+' FTW: ' + foto_tamano); */
		NomIdimage = "cameraImage"+i_foto;
		i_foto++;
	}												//var imageData = "img/prueba.jpeg";
	//LLAMA OBJETO IMG EL CUAL SE VA A LLENAR
    image = document.getElementById(NomIdimage);
    image.style.display = 'block';					//MUESTRA OBJETO	//alert(imageData);
    $("#"+NomIdimage).attr("src",imageData);		//ASIGNA RUTA DE LA IMAGEN AL OBJETO IMG	//alert(imageData);
    var arr_tmp_fotos = new Array();				//CREA NUEVO ARRAY PARA LAS FOTOS
    if(localStorage.getItem('Fotos')!=""){ var arr_tmp_fotos = JSON.parse(localStorage.getItem('Fotos'));}
    arr_tmp_fotos.push(imageData); 									//guarda URL de la imagen en array
    imageData = null; //lIMPIA LA VARIABLE DE LA IMAGEN
    localStorage.setItem('Fotos', JSON.stringify(arr_tmp_fotos));
    arr_tmp_fotos.length=0;		//alert(localStorage.Fotos);
	$("#api-camera").trigger("create");
	$("#lista_fotos").trigger("create");
	$("#"+NomIdimage).trigger("create");							//alert('Calidad: '+foto_calidad+' FTW: ' + foto_tamano); */
	return false;
}

