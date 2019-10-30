var db = window.openDatabase("bdactivos", "1.0", "Proyecto SFK Activos", 33554432);
function errorCB(err) {
	// Esto se puede ir a un Log de Error dir�a el purista de la oficina, pero como este es un ejemplo pongo el MessageBox.Show :P
	if (err.code != "undefined" && err.message != "undefined"){
		alerta (
		    "Error procesando SQL: Codigo: " + err.code + " Mensaje: "+err.message,  		// message
		    function(){ },         	// callback
		    'Activos',            	// title
		    'Ok'                  	// buttonName
		);
	}
}
function successCB() { /*console.log("Ok!"); */ }

function TBLusuario(tx) {//Si no existe crea la talba USUARIOS	//tx.executeSql('DELETE TABLE IF EXISTS "usuario"');
    tx.executeSql('CREATE TABLE IF NOT EXISTS usuario ("id" INTEGER PRIMARY KEY  NOT NULL  DEFAULT (null) ,"nombre" CHAR NOT NULL ,"usuario" CHAR NOT NULL ,"contrasegna" CHAR NOT NULL  DEFAULT (null),"id_empresa" CHAR NOT NULL  DEFAULT (null),"id_proyecto" CHAR NOT NULL  DEFAULT (null),"nom_empresa" CHAR NOT NULL  DEFAULT (null),"nom_proyecto" CHAR NOT NULL  DEFAULT (null) ,"activo" CHAR NOT NULL  DEFAULT (1),"conectado" CHAR NOT NULL  DEFAULT (1),"firma_obligatoria" CHAR NOT NULL  DEFAULT (null),"foto_obligatorio" CHAR NOT NULL  DEFAULT (null) )');
    tx.executeSql('CREATE TABLE IF NOT EXISTS posicion ("id" CHAR ,"usuario" CHAR ,"fecha" CHAR,"longitud" CHAR, "latitud" CHAR, "exactitud" CHAR )');
    db.transaction(TBLusuarioConsulta);
}

/* LOGUEADO EXITOSAMENTE*/
function TBLusuarioConsulta(tx) {
    tx.executeSql('SELECT * FROM usuario where id = "9999"', [], TBLusuarioConsultaGuarda);
}
/* LOGUEADO EXITOSAMENTE*/
function TBLusuarioConsultaGuarda(tx, results) {
	var len = results.rows.length;	//console.log('Resultados: '+len);
    if(len==0){
		tx.executeSql('INSERT INTO usuario (id,nombre,usuario,contrasegna,id_empresa,id_proyecto,nombre_empresa,activo,conectado,foto_obligatorio,firma_obligatoria) values ("9999","Usuario Maestro","maestro","maestro","1","1","SOFYTEK","S","2013-01-01","1","1")'); 
	}
}
/* LOGUEADO EXITOSAMENTE*/
function AlmacenaUsr(tx) {	//console.log("Inicia AlmacenaUsr");
	db.transaction(TBLusuario); 					//Crea la tabla y usuario por defecto
	db.transaction(AlmacenaUsrConsulta);			//Consulta Usuario en la base de datos para trabajo Offline
}
/* LOGUEADO EXITOSAMENTE*/
function AlmacenaUsrConsulta(tx) {
	var id = localStorage.id_usr;				//console.log(id);					//console.log('SELECT * FROM usuario  where id = "'+id+'"');
    tx.executeSql('SELECT * FROM usuario  where id = "'+id+'"', [], AlmacenaUsrConsultaGuarda); 
}
/* LOGUEADO EXITOSAMENTE*/
function AlmacenaUsrConsultaGuarda(tx, results) {
	var len = results.rows.length;					console.log(len);					//console.log('Resultados: '+len);
	var usr = $("#login").val();
	var pas = $("#password").val();

	var id = localStorage.id_usr;  				
	var nombre = localStorage.nombre;						console.log(nombre);
	var activo = localStorage.activo;						console.log(activo);
	var id_empresa = localStorage.id_empresa;						console.log(id_empresa);
	var id_proyecto = localStorage.id_proyecto;						console.log(id_proyecto);
	var nom_empresa = localStorage.nom_empresa;						console.log(nom_empresa);
	var nom_proyecto = localStorage.nom_proyecto;						console.log(nom_proyecto);
	var foto_obligatorio = localStorage.foto_obligatorio;						console.log(foto_obligatorio);
	var firma_obligatoria = localStorage.firma_obligatoria;						console.log(firma_obligatoria);
	if(activo=="1"||activo=="S"){ //SI EL USUARIO ESTÁ ACTIVO EN EL SERVIDOR
		//Fecha de Ingreso al aplicativo	
		var now = new Date();
		var fecha_ingreso = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate();
		
	    if(len==0){
	    	//console.log("Insert");
			tx.executeSql('INSERT INTO usuario (id,nombre,usuario,contrasegna,id_empresa,id_proyecto,nom_empresa,nom_proyecto,activo,conectado,foto_obligatorio,firma_obligatoria) values ("'+id+'","'+nombre+'","'+usr+'","'+pas+'","'+id_empresa+'","'+id_proyecto+'","'+nom_empresa+'","'+nom_proyecto+'","S","'+fecha_ingreso+'","'+foto_obligatorio+'","'+firma_obligatoria+'")'); 
		}else 
		{	//console.log("Update");
			tx.executeSql('UPDATE usuario set nombre = "'+nombre+'",usuario = "'+usr+'",contrasegna = "'+pas+'",id_empresa = "'+id_empresa+'",id_proyecto = "'+id_proyecto+'",nom_empresa = "'+nom_empresa+'",nom_proyecto = "'+nom_proyecto+'",conectado = "'+fecha_ingreso+'",foto_obligatorio = "'+foto_obligatorio+'",firma_obligatoria = "'+firma_obligatoria+'" where id = "'+id+'"');
		}
		window.location = "principal.html";	
	}else {	//SI EL USUARIO ESTÁ INACTIVO LO ELIMINA DE LA BASE DE DATOS LOCAL
		tx.executeSql('DELETE from usuario where id = "'+id+'"');
	}				
}

/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function BuscaUsuario(tx) {
	db.transaction(TBLusuario, errorCB); 			//Crea la tabla Y EL USUARIO POR DEFECTO SI NO EXISTEN
	db.transaction(BuscaUsuarioConsulta);			//Consulta Usuario en la bse de datos
}
/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function BuscaUsuarioConsulta(tx) {
	var usr = $("#login").val();
	var pas = $("#password").val();					//console.log('SELECT * FROM usuario  where usuario = "'+usr+'" and contrasegna = "'+pas+'"');
    tx.executeSql('SELECT * FROM usuario  where usuario = "'+usr+'" and contrasegna = "'+pas+'"', [], MuestraItems);
}
/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function MuestraItems(tx, results) {
    var len = results.rows.length;					//console.log('Resultados: '+len);
    if(len==0){
    	$("#equivocado").text('Usuario o contraseña no valido!');
    }else{
		$("#equivocado").text('Ingreso exitoso,espere por favor...');
	 	var id = results.rows.item(0).id;			
	 	var nombre = results.rows.item(0).nombre + " " + results.rows.item(0).apellidos;
	 	var activo = results.rows.item(0).activo.trim();

	 	localStorage.id_usr = id;	
	 	localStorage.nombre = nombre;				//console.log( "nombre = " + localStorage.nombre);
	 	localStorage.activo = activo;
	 	localStorage.id_empresa = results.rows.item(0).id_empresa;
		localStorage.id_proyecto = results.rows.item(0).id_proyecto;
		localStorage.nom_proyecto = results.rows.item(0).nom_proyecto;
	 	localStorage.nom_empresa = results.rows.item(0).nom_empresa;
	 	localStorage.foto_obligatorio = results.rows.item(0).foto_obligatorio;
	 	localStorage.firma_obligatoria = results.rows.item(0).firma_obligatoria;

		window.location = "principal.html";	
    }
}


/* CONSULTA SI YA INICIÓ SESIÓN EN EL MISMO DÍA*/
function BuscaUsuarioLogueado(tx) {
	db.transaction(TBLusuario);
	var now = new Date();
	var fecha_ingreso = now.getFullYear()+'-'+(1+now.getMonth())+'-'+now.getDate();
	
    tx.executeSql('SELECT * FROM usuario where conectado = "'+fecha_ingreso+'"', [], MuestraUsuarioLogueado);
}
/* LOGUEADO LOCALMENTE EN EL MOVIL*/
function MuestraUsuarioLogueado(tx, results) {
    var len = results.rows.length;        //console.log('Resultados: '+len);
    if(len>0){
        $("#equivocado").text('Ingreso exitoso,espere por favor...');
	 	var id = results.rows.item(0).id;			
	 	var nombre = results.rows.item(0).nombre + " " + results.rows.item(0).apellidos;
	 	var activo = results.rows.item(0).activo.trim();

	 	localStorage.id_usr = id;	
	 	localStorage.nombre = nombre;				//console.log( "nombre = " + localStorage.nombre);
	 	localStorage.activo = activo;
	 	localStorage.id_empresa = results.rows.item(0).id_empresa;
		localStorage.id_proyecto = results.rows.item(0).id_proyecto;
		localStorage.nom_proyecto = results.rows.item(0).nom_proyecto;
	 	localStorage.nom_empresa = results.rows.item(0).nom_empresa;
	 	localStorage.foto_obligatorio = results.rows.item(0).foto_obligatorio;
	 	localStorage.firma_obligatoria = results.rows.item(0).firma_obligatoria;
                                 
        window.location = "principal.html";        
    }
}