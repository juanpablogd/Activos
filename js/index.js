/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var opcionesCamara;
var minFotos=1;
var maxFotos=5;
function alerta(msj,callback,titulo,nomBoton){
    if(navigator.notification == undefined){
        alert(msj);
        callback();
    }else{
        navigator.notification.alert(
            msj,  // message
            callback,         // callback
            titulo,            // title
            nomBoton                  // buttonName
        );
    }
}

function confirmar(msj,callback,titulo,nomBotones){
    if(navigator.notification == undefined){
        if (confirm(msj) == true) {
            callback();
        }
    }else{
        navigator.notification.confirm(
            msj, // message
            callback,            // callback to invoke with index of button pressed
            titulo,           // title
            ['No','Si']     // buttonLabels
        );
    }
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('deviceready');
        var devicePlatform = device.platform;   console.log(devicePlatform);
        if(devicePlatform == "iOS"){
            opcionesCamara = {   quality : 20                                 
                            ,destinationType : Camera.DestinationType.NATIVE_URI
                            ,sourceType : Camera.PictureSourceType.CAMERA
                            ,encodingType: Camera.EncodingType.JPEG
                            ,saveToPhotoAlbum:true
                            ,correctOrientation:true
                        };
        }else{
            opcionesCamara = {   quality : 26                                 
                            ,destinationType : Camera.DestinationType.FILE_URI
                            ,sourceType : Camera.PictureSourceType.CAMERA
                            ,encodingType: Camera.EncodingType.JPEG
                            ,saveToPhotoAlbum:true
                            ,correctOrientation:true
                        };
        }
        cordova.getAppVersion.getVersionNumber().then(function (version) {
            $('#info_pie').html("Sistema Inventarios: "+version);
        });
    }

};

app.initialize();
