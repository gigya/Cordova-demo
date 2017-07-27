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
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        gigyaClient.init('3_wzeLTvqHNcnSxuvd7jwNjrXSFWcdjKlBkJIohrw4jshr9K7EnGNKHe4YcGweEu0A', 'eu1.gigya.com');
        app.receivedEvent('deviceready');

        console.log(gigyaClient.getVersion());
        gigyaClient.addEventListener(gigyaClient.Event.LOGIN, function(response) {
        console.log('Gigya login detected');
        console.log(response);

        //window.document.location = 'profile.html';

        gigyaClient.showPlugin('accounts.screenSet',{ screenSet:'Default-ProfileUpdate' });
        });
        gigyaClient.addEventListener(gigyaClient.Event.LOGOUT, function() {
        console.log('Gigya logout detected');
        });
        function test(e){console.log(e);}

        (function(){
            gigyaClient.sendRequest('accounts.getAccountInfo').then(function(response) {
                //if user is logged in show profile and logout button
                document.getElementById('btnRaasProfile')

              })
              .catch(function(error) {
                   alert(JSON.stringify(error.data));
              });
        })();
           $("#btnRegister").click(function(){
               var email = document.getElementById('loginIDreg').value;
               var password = document.getElementById('passwordReg').value;
               var passwordCon = document.getElementById('passwordRegCon').value;

               if(password===passwordCon){
                   gigyaClient.sendRequest('accounts.initRegistration').then(function(response) {
                       var regToken = response.data.regToken;
                       gigyaClient.sendRequest('accounts.register', {email:email, password:password,finalizeRegistration:true, regToken:regToken}).then(function(response) {

                         })
                         .catch(function(error) {
                              alert(JSON.stringify(error.data));
                         });
                     })
                     .catch(function(error) {
                          alert(JSON.stringify(error.data));
                     });
               }else{
                   alert("Password and Password confirmation must match!");
               }

           });

           $("#btnLogin").click(function(){
               gigyaClient.sendRequest('accounts.login',{loginID: document.getElementById('loginID').value, password:document.getElementById('password').value}).then(function(response){

                 })
                 .catch(function(error) {
                      alert(JSON.stringify(error.data));
                 });

           });

           $("#btnRaasLogin").click(function(){
               gigyaClient.showPlugin('accounts.screenSet',{ screenSet:'Default-RegistrationLogin' });
           });

           $("#btnRaasLogout").click(function(){
               gigyaClient.logout();
           });

           $("#nativeFB").click(function(){
               gigyaClient.loginToProvider('facebook')
                     .then(function(response) {
                          alert(JSON.stringify(response.data));
                     })
                     .catch(function(error) {
                          alert(JSON.stringify(error.data));
                     });
            });

            $("#nativeGooglePlus").click(function(){
                gigyaClient.loginToProvider('googleplus')
                      .then(function(response) {
                           loginHandler(response);
                      })
                      .catch(function(error) {
                           alert(JSON.stringify(error.data));
                      });
             });

             function loginHandler(response){
                 if(response.errorCode != 0){
                     //REQUIRED IMPLEMENTING
                     switch(response.errorCode){
                         case 200010: // Login identifier already in use
                            //REQUIRED IMPLEMENTING
                            break;
                        case 403043: // login identifier already exists
                            //REQUIRED IMPLEMENTING
                            break;
                        case 206001: // required information is missing : account pending registration
                            //REQUIRED IMPLEMENTING
                            break;
                        case 200009: //accounts linked!
                            //REQUIRED IMPLEMENTING
                            break;
                     }
                 }
             }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        console.log('Received Event: ' + id);
    }
};

app.initialize();
