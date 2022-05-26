import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-newcontrasena',
  templateUrl: './newcontrasena.page.html',
  styleUrls: ['./newcontrasena.page.scss'],
})
export class NewcontrasenaPage implements OnInit {

  // url = 'http://localhost:3001/v1/';
  url = "https://wetlia.herokuapp.com/v1/";
  constructor(public router: Router) { }

  ngOnInit() {
  }

  evaluarPassword(){
    if($('#Password').val() == $('#Password2').val()){
      this.enviar()
    }
    else{alert('Ambos campos no coinciden.')}
  }
  enviar(){
    var miStorage = window.localStorage;
    console.log("Nueva");
    var data = {
      "Token": JSON.parse(miStorage.getItem("WetliaToken"))["Token"],
      'Password' : $('#Password').val()
    };
    console.log(data);
    $.ajax({
        'url' : this.url + 'cPass',
        'type': 'POST',
        'data': JSON.stringify(data),
        'processData': false,
        'contentType': "application/json; charset=UTF-8",
        'success': function(data){
            console.log(data);
            if (data=='Wrong email'){
              alert(data+ ", try again")
            }
            else {
              miStorage.removeItem('WetliaToken');
              alert("Actualización de contraseña exitosa.");
              window.open('login','_self');
            }
        }
    });
  }

}
