/** * |author DGJP * |Fecha 2014-02 */$(window).load(function () {	db.transaction(BuscaUsuarioLogueado);});$(document).ready(function(){	$("#submit").click(function() {		$("#equivocado").text('Espere por favor...');		var usr = $("#login").val();		var pas = $("#password").val();		if (usr== ""){			alerta (			    "Digite usuario por favor",  		// message			    function(){ $("#login").focus(); },         	// callback			    'Activos',            	// title			    'Ok'                  	// buttonName			);			return;		}		if (pas== ""){			alerta (			    "Digite clave por favor",  		// message			    function(){ $("#password").focus(); },         	// callback			    'Activos',            	// title			    'Ok'                  	// buttonName			);			return;		}		$.ajax({			url:'http://'+localStorage.url_servidor+'/SIG/servicios/activos_logueo.php?usr='+usr+'&pas='+pas, 			dataType: 'json',			success: function(data){	//console.log("srv Ppal");				if (data[0].encontrado == "true"){				 	var nombre = data[1].nombres + " " +  data[1].apellidos; 	console.log(nombre);				 	var activo = data[1].activo.trim();							console.log(activo);				 														 	localStorage.id_usr = data[1].id_usuario;					console.log(data[1].idusuario);				 	localStorage.nombre = nombre;				 	localStorage.activo = activo;				//console.log( "nombre: " + localStorage.nombre);				 	localStorage.id_empresa = data[1].id_empresa;					localStorage.id_proyecto = data[1].id_proyecto;					localStorage.nom_proyecto = data[1].nom_proyecto;				 	localStorage.nom_empresa = data[1].nom_empresa;				 	localStorage.foto_obligatorio = data[1].foto_obligatorio;				 	localStorage.firma_obligatoria = data[1].firma_obligatoria;					if(activo=="1"||activo=="S"){						$("#equivocado").text('Ingreso exitoso,espere por favor...');					}else{						$("#equivocado").text('Usuario Inactivo, contacte al administrador del sistema!');					}	//console.log("srv Ppal");					db.transaction(AlmacenaUsr, errorCB);												}else{					//console.log("Usuario no encontrado");					$("#equivocado").text('Usuario o contraseña no valido!');			//db.transaction(BuscaUsuario, errorCB);				} 			},			error: function (error) {	//console.log("Error srv Ppal");                db.transaction(BuscaUsuario, errorCB);									//SI NO TIENE CONEXIÓN CON EL SERVIDOR PPAL BUSCA EN LA BD INTERNA									            }		});	});});