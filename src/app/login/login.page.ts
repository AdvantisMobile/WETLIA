import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // url = 'http://localhost:3001/v1/';
  url = "https://wetlia.herokuapp.com/v1/";
  constructor(public router: Router) { }

  ngOnInit() {
  }

  // Cambiar a ventana de recuperacion de contraseña
  RContrasena(){
    window.open('rcontrasena','_self');
  }

  // Proceso de Login
  Login(){
    window.open('home','_self');
    // var data = {
    //   'Email' : $('#email').val(),
    //   'Password': $('#password').val()
    // };
    // $.ajax({
    //     'url' : this.url + 'login',
    //     'type': 'POST',
    //     'data': JSON.stringify(data),
    //     'processData': false,
    //     'contentType': "application/json; charset=UTF-8",
    //     'success': function(data){
    //         console.log(data);
    //         if (data=='Wrong credential'){
    //           alert("Correo y/o contraseña incorrectos.");
    //         }
    //         else {
    //           var miStorage = window.localStorage;
    //           miStorage.setItem('WetliaUsuario', JSON.stringify(data));
    //           window.open('home','_self');
    //         }
    //     }
    // });
  }
}
