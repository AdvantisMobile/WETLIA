import { AfterViewInit, Component, ViewChild } from '@angular/core';
// import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import * as $ from 'jquery';

// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
// import {MatTableDataSource} from '@angular/material/table';

// export interface DataN {
//   usuario:string,
//   precio:string,
//   descuento:string,
//   distribuidor:string
// }

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements AfterViewInit {
  // displayedColumns: string[] = ['usuario', 'precio', 'descuento', 'distribuidor'];

  // @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  // url = 'http://localhost:3001/v1/';
  url = "https://wetlia.herokuapp.com/v1/";
  constructor(public router: Router) { }

  ngAfterViewInit() {

  }

  ngOnInit(){
    var miStorage = window.localStorage;

    if(miStorage["Propuesta"]){
      var propuesta = JSON.parse(miStorage.getItem("Propuesta"));
      var cliente = propuesta["Cliente"];
      var precio = propuesta["NuevoPrecioPromedio"];
      var descuento = propuesta["NuevoDescuentoSobreFullPrice"];
      var distribuidor = propuesta["Distribuidor"];
      var rentabilidad = propuesta["DiferencialEnValores"];

      // (<HTMLInputElement>document.getElementById("cliente")).value=cliente;
      document.getElementById("td1").innerHTML=cliente;
      document.getElementById("td2").innerHTML="$"+precio;
      document.getElementById("td3").innerHTML=descuento;
      document.getElementById("td4").innerHTML="$"+rentabilidad;
      document.getElementById("td5").innerHTML=distribuidor;
      // const ELEMENT_DATA: DataN[] = [distibuidor,precio,descuento,distibuidor];
      // this.dataSource = ELEMENT_DATA;
    }
    else{
      alert("No se cuenta con información para desplegar.")
    }

  }
  atras(){
    this.router.navigate(["/home"]);
  }
  guardar(){
    var miStorage = window.localStorage;
    var propuesta = JSON.parse(miStorage.getItem("Propuesta"));
    var cliente = propuesta["Cliente"];
    var precio = propuesta["PrecioPromedio"];
    var descuento = propuesta["Descuento"];
    var distribuidor = propuesta["Distribuidor"];

    console.log("Login");
    var data = {
      "Distribuidor":{"Distribuidor":distribuidor},
    	"Informacion":{
    		propuesta
    	}
    };
    console.log(data);
    $.ajax({
        'url' : this.url + 'aPropuesta',
        'type': 'PUT',
        'data': JSON.stringify(data),
        'processData': false,
        'contentType': "application/json; charset=UTF-8",
        'success': function(data){
            console.log(data);
            // if (data=='Wrong credential'){
            //   alert(data+ ", try again")
            // }
            // else {
            //   var miStorage = window.localStorage;
            //   miStorage.setItem('Wetlia', JSON.stringify(data));
            //   window.open('home','_self');
            // }
            if (data == "Campos actualizados")
            {
              alert("La información ha sido actualizada en la base de datos.");
            }
            else{
              alert("Ha ocurrido un error, revisa tu conexión de internet.")
            }
        }
    });
  }
  enviar(){
    var miStorage = window.localStorage;
    var propuesta = JSON.parse(miStorage.getItem("Propuesta"));
    var cliente = propuesta["Cliente"];
    var precio = propuesta["PrecioPromedio"];
    var descuento = propuesta["Descuento"];
    var distribuidor = propuesta["Distribuidor"];
    var email = propuesta["Email"];

    var data = {
      "Email":email,
      "Cliente":{"Cliente":cliente},
    	"Informacion":{
    		"Distribuidor":distribuidor,
    		"Opcion":propuesta["CondicionComercial"],
    		"X1":propuesta["X1"],
    		"X2":propuesta["X2"],
    		"FechaInicio":propuesta['FechaInicio'],
    		"FechaFin":propuesta["FechaFin"],
        "NuevoDescuentoSobreFullPrice":propuesta["NuevoDescuentoSobreFullPrice"],
        "CondicionComercialPropuesta":propuesta["CondicionComercialPropuesta"],
        "VialesEsperados":propuesta["VialesEsperados"],
        "PrecioPromedio":propuesta["PrecioPromedio"],
        "Diferencial":propuesta["Diferencial"]
    	}
    };
    console.log(data);
    $.ajax({
        'url' : this.url + 'email',
        'type': 'POST',
        'data': JSON.stringify(data),
        'processData': false,
        'contentType': "application/json; charset=UTF-8",
        'success': function(data){
            console.log(data);
            // if (data=='Wrong credential'){
            //   alert(data+ ", try again")
            // }
            // else {
            //   var miStorage = window.localStorage;
            //   miStorage.setItem('Wetlia', JSON.stringify(data));
            //   window.open('home','_self');
            // }
            if (data == "Mensaje enviado")
            {
              alert("Email enviado.")
            }
            else{
              alert("Ha ocurrido un error, revisa tu conexión de internet.")
            }
        }
    });
  }
}
