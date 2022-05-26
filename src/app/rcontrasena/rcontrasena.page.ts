import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-rcontrasena',
  templateUrl: './rcontrasena.page.html',
  styleUrls: ['./rcontrasena.page.scss'],
})
export class RContrasenaPage implements OnInit {
  // url = 'http://localhost:3001/v1/';
  url = "https://wetlia.herokuapp.com/v1/";
  constructor(public router: Router) { }

  ngOnInit() {
  }

  // Peticion de email para cambio de contraseña
  enviar(){
    var dEmail = <HTMLInputElement>document.getElementById('email');
    var data = {
      'Email' : dEmail.value
    };
    $.ajax({
        'url' : this.url + 'rPass',
        'type': 'POST',
        'data': JSON.stringify(data),
        'processData': false,
        'contentType': "application/json; charset=UTF-8",
        'success': function(data){
            if (data=='Wrong email'){
              alert("El correo no pertenece a alguna cuenta registrada.");
            }
            else {
              alert("Revisa tu correo.")
              window.open('login','_self');
            }
        }
    });
  }

}
