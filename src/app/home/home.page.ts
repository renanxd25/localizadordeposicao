import { AfterViewInit, Component, ViewChild,OnInit  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AutenticacaoService } from '../services/autenticacao.service';
import { Router } from "@angular/router";
import {AngularFirestore} from '@angular/fire/firestore'
import { FirebaseApp } from '@angular/fire';
import {AngularFireDatabase} from '@angular/fire/database'



declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit{
  map;
  detalhesusuario: string;
  @ViewChild('mapElement', {static: false}) mapElement;
  mapOptions = {
    center: {lat:-34.391, lng:150.644},
    zoom:15,
  }
  endereco;
  cidade;
  estado;
  pais;
  localizacaoFinal;
  posicaousuario: string;
  constructor(
    private geolocation:Geolocation,
    private router: Router,
    private AutenticacaoService: AutenticacaoService,
    private afs: AngularFirestore,
    private db: AngularFireDatabase
    ) {}

  loadMap(){
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions)
      const marker = new google.maps.Marker({
      position:this.mapOptions.center,
      map:this.map,
      title:'Localização atual',
    });
    this.geocodeLatLng(this.mapOptions.center)
  }
  geocodeLatLng(Currentposition) {
    const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: Currentposition }).then((response) => {
          if (response.results[0]) {
             this.localizacaoFinal = response.results[0].formatted_address;

            console.log(this.localizacaoFinal);
            //salvandoposição no banco de dados RealtimeDataBase automaticamente
            this.db.database.ref('Usuarios').push(this.localizacaoFinal).then(()=>{
              console.log("Salvou")
            }).catch(() =>{
              console.log("Não Salvou")
            });

            this.endereco = response.results[0].formatted_address;
            if(response.results[0].address_components.length > 0){
              response.results[0].address_components.forEach(item =>{
                if (item.types.indexOf('administrative_area_level_2')!= -1){
                  this.cidade = item.short_name;
                }
                if(item.types.indexOf('administrative_area_level_1')!== -1){
                  this.estado = item.short_name;
                }
                if(item.types.indexOf('country')!== -1){
                  this.pais = item.short_name;
                }
              })
            }
            this.map.setZoom(11);
            const marker = new google.maps.Marker({
              position: Currentposition,
              map: this.map,
            });
          } else {
            window.alert("Sem Resultados");
          }
        })
        .catch((e) => window.alert("Geocoder falhou por causa do: " + e));
    }

  
  ngAfterViewInit(){
    this.geolocation.getCurrentPosition().then((resp) => {
     this.mapOptions.center.lat = resp.coords.latitude;
     this.mapOptions.center.lng = resp.coords.longitude;
     this.loadMap();
    }).catch((error) => {
      console.log('Erro ao procurar a localização', error);
    });
  }
  ngOnInit() {
    this.AutenticacaoService.userDetails().subscribe(response => {
      if (response !== null) {
        this.detalhesusuario = response.email;
        this.posicaousuario = response.uid
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
  }
  metodo_sair_do_map() {
    this.AutenticacaoService.metodo_sair()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }

   salvarposicao() {
    this.db.database.ref(this.posicaousuario).push(this.localizacaoFinal).then(()=>{
      console.log("Salvou")
    }).catch(() =>{
      console.log("Não Salvou")
    });
  }

}
