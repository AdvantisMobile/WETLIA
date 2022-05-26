import { Component } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { interval } from 'rxjs';

export interface UsersData {
  id: number;
  name: string;
  birthday: string;
  TimeIn: string;
  TimeOut: string;
  businessdays:string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
// url = 'http://localhost:3001/v1/';
url = "https://wetlia.herokuapp.com/v1/";
si = 0;

  constructor(public router: Router) {}

  ngOnInit() {
    this.resize();

    var miStorage = window.localStorage;
    var Wetlia = JSON.parse(miStorage.getItem("WetliaUsuario"));
    var Perfil = JSON.parse(Wetlia["Perfil"])[0];
    this.getData(Wetlia["Token"]);
    (<HTMLInputElement>document.getElementById("Distribuidor")).value = Perfil["Nombre"];

    miStorage.setItem('aux_cca', "");
    miStorage.setItem('aux_ccp', "");
    miStorage.setItem('aux_x1a', "0");
    miStorage.setItem('aux_x1b', "0");
    miStorage.setItem('aux_x2a', "0");
    miStorage.setItem('aux_x2b', "0");

    miStorage.setItem('aux_cliente', (<HTMLInputElement>document.getElementById("Cliente")).value);

    miStorage.setItem('aux_vam2', (<HTMLInputElement>document.getElementById("vam")).value);
    // miStorage.setItem('aux_distribuidor', $('#Distribuidor').val());

    interval(300).subscribe(x => {
        this.everitime();
        this.resize();
    });
  }

  resize()
  {
      var wh = window.innerWidth;

      var home=document.getElementById("home");

      home.style.width=wh+"px";

      home.style.height=(wh*(768/1024)+"px");
  }

//Obtener informacion general
  getData(token)
  {
      var data = {
        'Token': token
      };
      $.ajax({
          'url' : this.url + 'getData',
          'type': 'POST',
          'data': JSON.stringify(data),
          'processData': false,
          'contentType': "application/json; charset=UTF-8",
          'success': function(data){
            var miStorage = window.localStorage;
            miStorage.setItem("Clientes", data["Clientes"]);
            miStorage.setItem("Distribuidores", data["Distribuidores"]);
            miStorage.setItem("PropuestaActual", data["PropuestaActual"]);
            miStorage.setItem("FullPrice", data["FullPrice"]);

            this.fPrice(data);
          }.bind(this)
      });
  }

  fPrice(data){
    var fPrice = JSON.parse(data["FullPrice"])[0]["FullPrice"];

    (<HTMLInputElement>document.getElementById("pUnitario")).value=this.addComa(fPrice);

    this.distribuidores(data);
  }

  distribuidores(data){
    var distribuidores = JSON.parse(data["Distribuidores"]);
    var dist = document.getElementById("Distribuidor")
    var dists =""

    for (const i in distribuidores) {
      if (distribuidores.hasOwnProperty(i)) {
        const element = distribuidores[i];
        dists += "<ion-select-option value='"+element["Distribuidor"]+"' name='Distribuidor'>"+element["Distribuidor"]+"</ion-select-option>"
      }
    }
    dists += "<ion-select-option value='Nuevo' name='Distribuidor'>Nuevo</ion-select-option>"

    dist.innerHTML=dists;

    this.clientes(data);
  }

  clientes(data){
    var cliente = JSON.parse(data["Clientes"]);
    var clienteE = document.getElementById("Cliente")
    var clientes =""

    for (const i in cliente) {
      if (cliente.hasOwnProperty(i)) {
        const element = cliente[i];
        clientes += "<ion-select-option value='"+element["Cliente"]+"' name='Cliente'>"+element["Cliente"]+"</ion-select-option>"
      }
    }
    clientes += "<ion-select-option value='Nuevo' name='Cliente'>Nuevo</ion-select-option>"

    clienteE.innerHTML=clientes;
  }


// Boton Atras. Ejecuta funcion cerrar sesion y eliminar token.
  atras(){
    var miStorage = window.localStorage;
    var datosWetlia = JSON.parse(miStorage.getItem("WetliaUsuario"));
    var email=JSON.parse(datosWetlia["Perfil"]);
    var token=datosWetlia["Token"];
    var data = {
      'Email' : email[0]["Email"],
      'Token': token
    };
    $.ajax({
        'url' : this.url + 'logOut',
        'type': 'POST',
        'data': JSON.stringify(data),
        'processData': false,
        'contentType': "application/json; charset=UTF-8",
        'success': function(data){
            if (data=='Wrong credential'){
              alert(data+ ", try again")
            }
            else {
              var miStorage = window.localStorage;
              miStorage.removeItem('WetliaUsuario');
              window.open('login','_self');
            }
        }
    });
  }


  guardar(){
    // var miStorage = window.localStorage;
    // var datosWetlia = JSON.parse(miStorage.getItem("Wetlia"));
    // var nombre=JSON.parse(datosWetlia["Perfil"]);
    var miStorage = window.localStorage;
    var c = $('#Cliente').val();
    if (c=='Nuevo'){
      c = $('#Cliente2').val()
    }

    var vam=<HTMLInputElement>document.getElementById("vam");
    var vem=<HTMLInputElement>document.getElementById("vem");

    if(parseInt(vem.value,10)<=parseInt(vam.value,10)){
      alert("Viales esperados x mes debe ser mayor a los actuales.")
    }
    else{
      var email= (JSON.parse(miStorage.getItem('WetliaUsuario')));
      var PropuestaActual={
        "Email":JSON.parse(email['Perfil'])[0]['Email'],
        "Distribuidor":$('#Distribuidor').val(),
        "Cliente":c,
        "VialesActuales": $('#vam').val(),
        "CondicionComercialActual": $('#cca').val(),
        "X1":$('#x1a').val(),
        "X2":$('#x2a').val(),
        "%":$('#x2b').val(),
        "PrecioPromedioxVial":$('#ppva').val(),
        "DescuentoSobreFullPrice":$('#dsfpa').val(),
        "VialesEsperados":$('#vem').val(),
        "CondicionComercialPropuesta":$('#ccp').val(),
        "NuevoPrecioPromedio":$('#ppve').val(),
        "NuevoDescuentoSobreFullPrice":$('#dsfpe').val(),
        "DiferencialEnValores":(<HTMLInputElement>document.getElementById('dev')).placeholder,
        "FechaInicio": this.getDate1(),
        "FechaFin": this.getDate2()
      }


      console.log(PropuestaActual);



      miStorage.setItem("Propuesta",JSON.stringify(PropuestaActual));

      alert("Los datos han sido guardados en el dispositivo. Puedes proceder a enviar correo.");
      this.si+=1;
    }



  }

  getDate1(){
    var date = new Date;

    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()

    return day+"-"+month+"-"+year;
  }

  getDate2(){
    var date = new Date;

    var day = date.getDate()
    var month = date.getMonth()
    var year = date.getFullYear()

    month = month+3;
    if (month>11){
      month -= 11;
    }

    return day+"-"+month+"-"+year;
  }

  limpiar(){
    location.reload();
  }

  siguiente(){

    var vam=<HTMLInputElement>document.getElementById("vam");
    var vem=<HTMLInputElement>document.getElementById("vem");

    if(parseInt(vem.value,10)<=parseInt(vam.value,10)){
      alert("Viales esperados x mes debe ser mayor a los actuales.")
    }
    else if (this.si<1 ){
      alert("Antes de continuar recuerda guardar los valores calculados.")
    }
    else{
      window.open('resumen','_self');
    }


  }

  crearC(){
    var cliente = (<HTMLInputElement>document.getElementById("nClienteF")).value;
    var option = document.createElement("ion-select-option");
    option.innerHTML = cliente;
    option.value = cliente;
    (<HTMLInputElement>document.getElementById("Cliente")).appendChild(option);
    document.getElementById("nCLiente").style.display="none";
  }

  everitime()
  {
    var miStorage = window.localStorage;

    var cliente = (<HTMLInputElement>document.getElementById("Cliente")).value;
    var aux_cliente = miStorage.getItem('aux_cliente');



    if (cliente != aux_cliente)
    {
      if (cliente == "Nuevo") {
        document.getElementById("nCLiente").style.display="block";
      }
      else{
        // console.log(cliente);
        // console.log(aux_cliente);

      }
    }
    miStorage.setItem('aux_cliente',cliente);

    var vam2 = (<HTMLInputElement>document.getElementById("vam")).value;
    var aux_vam2 = miStorage.getItem('aux_vam2');

    // if(vam2 != aux_vam2)
    // {
    //   this.evalViales();
    // }
    miStorage.setItem('aux_vam2',vam2);



    var cca = $('#cca').val();
    var ccp = $('#ccp').val();

    var x1a = $('#x1a').val();
    var x1b = $('#x1b').val();
    var x2a = $('#x2a').val();
    var x2b = $('#x2b').val();


    var aux_cca = miStorage.getItem('aux_cca');
    var aux_ccp = miStorage.getItem('aux_ccp');



    var aux_x1a = parseInt(miStorage.getItem('aux_x1a'),10);
    var aux_x1b = parseInt(miStorage.getItem('aux_x1b'),10);
    var aux_x2a = parseInt(miStorage.getItem('aux_x2a'),10);
    var aux_x2b = parseInt(miStorage.getItem('aux_x2b'),10);
    // console.log(aux_cca+","+cca);

    if ((aux_cca!=cca)||(aux_x1a!=x1a)||(aux_x2b!=x2b)||(aux_x2a!=x2a)){
      this._fcca();
    }
    miStorage.setItem('aux_cca',cca);
  }

  // evalViales()
  // {
  //   var vam=<HTMLInputElement>document.getElementById("vam");
  //   var vem=<HTMLInputElement>document.getElementById("vem")
  //
  //   // alert("Evaluar Viales");
  //   //
  //   // console.log(parseInt(vam.value,10));
  //   // console.log(parseInt(vem.value,10));
  //
  //   if (parseInt(vem.value,10)<parseInt(vam.value,10))
  //   {
  //     vem.value=(parseInt(vam.value,10)+1).toString();
  //     alert("Viales Esperados X mes debe ser mallor a los actuales.")
  //   }
  //
  //
  // }

  _fcca()
  {
    // this.evalViales();
    var miStorage = window.localStorage;

    var e1=document.getElementById("e1")
    e1.style.display="none";
    var l1=document.getElementById("l1")
    var vam=<HTMLInputElement>document.getElementById("vam")
    var ppva=<HTMLInputElement>document.getElementById("ppva")
    var dsfpa=<HTMLInputElement>document.getElementById("dsfpa")
    var x1a = $('#x1a').val();
    var x2a = $('#x2a').val();
    var cc1 = document.getElementById("cc1");
    var cc2 = document.getElementById("cc2");

    // var e2=document.getElementById("e2")
    // e2.style.display="none";
    // var l2=document.getElementById("l2")
    var vem=<HTMLInputElement>document.getElementById("vem")
    // var ppve=<HTMLInputElement>document.getElementById("ppve")
    // var dsfpe=<HTMLInputElement>document.getElementById("dsfpe")
    // var x1b = $('#x1b').val();
    // var x2b = $('#x2b').val();

    var pu = parseInt(JSON.parse(miStorage.getItem("FullPrice"))[0]["FullPrice"]);
    // console.log(pu);

    var dev=<HTMLInputElement>document.getElementById("dev")
    var aux_ppv = "";
    (<HTMLInputElement>document.getElementById("x2a")).placeholder="0";
    (<HTMLInputElement>document.getElementById("x2a")).disabled = false;
    if ($('#cca').val()=="X1+X2")
    {
      e1.style.display="block";
      cc1.style.display="block";

      cc2.style.display="none";

      // document.getElementById("x2a").style.display="block";
      // document.getElementById("x2b").style.display="none";

      aux_ppv = ((x1a*pu)/(parseInt(x1a,10)+parseInt(x2a,10))).toFixed(2);
      // vam.value = (parseInt(x1a,10)+parseInt(x2a,10)).toString();
    }
    else if ($('#cca').val()=="% vs FP")
    {
      e1.style.display="block";
      cc2.style.display="block";
      cc1.style.display="none";
      // x2a=pu;
      // document.getElementById("x2b").style.display="block";
      // document.getElementById("x2a").style.display="none";

      (<HTMLInputElement>document.getElementById("x2a")).placeholder="23,558.00";
      (<HTMLInputElement>document.getElementById("x2a")).disabled = true;
      (<HTMLInputElement>document.getElementById("x2a")).value="23,558.00";

      aux_ppv = ((pu*(100-x1a))/(100)).toFixed(2);
      // vam.value = x1a;
    }
    else if ($('#cca').val()=="Full price")
    {
      aux_ppv=pu.toFixed(2);
      // vam.value="1";
    }
    else if ($('#cca').val()=="Tripack")
    {
      aux_ppv = (37789/3).toFixed(2);
      // vam.value = "3";
    }
    else if ($('#cca').val()=="5+8")
    {
      aux_ppv = ((5*pu)/(13)).toFixed(2);
      // vam.value = "13";
    }
    else if ($('#cca').val()=="10+17")
    {
      aux_ppv = ((10*pu)/(27)).toFixed(2);
      // vam.value = "27";
    }


    ppva.value = this.addComa(aux_ppv);

    var propAlg = this.evalPropuesta(aux_ppv);



    if (propAlg)
    {
      dsfpa.value=(100-(parseInt(aux_ppv,10)/pu)*100).toFixed(0)+"%";
      // dsfpe.value=(100-(parseInt(aux_ppv,10)/pu)*100).toFixed(0)+"%";
      var aux1 = (parseInt(vem.value,0)*propAlg["Precio Promedio"]);
      var aux2 = (parseInt(vam.value,10)*parseInt(aux_ppv,10))
      // console.log((typeof aux1)+"--*--"+ (typeof aux2));


      dev.placeholder = this.addComa(aux1-aux2);
    }

  }

  addComa(val)
  {

    var r = Math.abs(val%1000).toFixed(2);
    var m = Math.trunc(val/1000);
    var l = r.split(".",2)[0].length;


    if (val>999){
      if (l==2){r = "0"+r}
      else if(l==1){r ="00"+r}
      return(m+","+r);
    }
    else{
      return r
    }

  }

  evalPropuesta(val)
  {
    var prop = [
      {
        "Condicion": "Ful price",
        "Precio": 23558,
        "Precio Promedio": 23558,
        "Viales": 1,
        "VarvsFP": 0
      },
      {
        "Condicion": "10%",
        "Precio": 21202.20,
        "Precio Promedio": 21202.20,
        "Viales": 1,
        "VarvsFP": 10
      },
      {
        "Condicion": "20%",
        "Precio": 18846.4,
        "Precio Promedio": 18846.4,
        "Viales": 1,
        "VarvsFP": 20
      },
      {
        "Condicion": "3+1",
        "Precio": 70674,
        "Precio Promedio": 17668.5,
        "Viales": 4,
        "VarvsFP": 25
      },
      {
        "Condicion": "3+2",
        "Precio": 70674,
        "Precio Promedio": 14134.8,
        "Viales": 5,
        "VarvsFP": 40
      },
      {
        "Condicion": "5+4",
        "Precio": 117790,
        "Precio Promedio": 13087.78,
        "Viales": 9,
        "VarvsFP": 44
      },
      {
        "Condicion": "Tripack",
        "Precio": 37789,
        "Precio Promedio": 12596.33,
        "Viales": 3,
        "VarvsFP": 47
      },
      {
        "Condicion": "6+6",
        "Precio": 141348,
        "Precio Promedio": 11779,
        "Viales": 12,
        "VarvsFP": 50
      },
      {
        "Condicion": "8+10",
        "Precio": 188464,
        "Precio Promedio": 10470.22,
        "Viales": 18,
        "VarvsFP": 56
      },
      {
        "Condicion": "10+17",
        "Precio": 235580,
        "Precio Promedio": 8725.19,
        "Viales": 27,
        "VarvsFP": 63
      }
    ]
    var j;
    for (const i in prop) {
      if (prop.hasOwnProperty(i)) {
        const element = prop[i];
        j=element
        if (element["Precio Promedio"]<val)
        {
          (<HTMLInputElement>document.getElementById("ppve")).value=this.addComa(element["Precio Promedio"]);
          (<HTMLInputElement>document.getElementById("dsfpe")).value=element["VarvsFP"]+"%";
          (<HTMLInputElement>document.getElementById("ccp")).value=element["Condicion"]
          return element
        }
      }
    }

    (<HTMLInputElement>document.getElementById("ppve")).value=this.addComa(j["Precio Promedio"]);
    (<HTMLInputElement>document.getElementById("dsfpe")).value=j["VarvsFP"]+"%";
    (<HTMLInputElement>document.getElementById("ccp")).value=j["Condicion"];

    return j
  }
}
