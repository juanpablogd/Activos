	var parametros = new Object();
	
	parametros['tabla'] = 'p_elemento';
	
	parametros['id'] = results.rows.item(i).idarticulo;
	parametros['idempresa'] = results.rows.item(i).idempresa;
	parametros['idseccion'] = results.rows.item(i).idseccion;
	parametros['idlinea'] = results.rows.item(i).idlinea;
	parametros['idslinea'] = results.rows.item(i).idslinea;
	parametros['idmarca'] = results.rows.item(i).idmarca;
	parametros['nombre'] = results.rows.item(i).nombre;
	parametros['referencia'] = results.rows.item(i).referencia;
	parametros['numero_serie'] = results.rows.item(i).numero_serie;
	parametros['plaqueta'] = results.rows.item(i).plaqueta;
	parametros['plaqueta_anterior'] = results.rows.item(i).plaqueta_anterior;
	parametros['id_envio'] = results.rows.item(i).id_envio;
	$("#resultado").html("<br>Articulos restantes: "+(lon-i)+".<br>"); 
	$.ajax({
		data:  parametros,
		url:'http://'+localStorage.url_servidor+'/SIG/servicios/activos_sincronizar.php',
		beforeSend: function() { $("#resultado").html('<br>Cargando Elementos....'+(lon-i)+'.<br>');  }, //Show spinner
		complete: function() { $("#resultado").html('<br>Carga Completa....'+(lon-i)+'.<br>');  },
		type:  'post',
		async: false,		//timeout: 30000,
		success: function(responser){	//console.log(responser);
			$("#resultado").text('Información registrada Exitosamente!!!');

		},
		error: function (error) {
			$("#resultado").text('Error en ingreso de Respuestas'); 
		}
	});

