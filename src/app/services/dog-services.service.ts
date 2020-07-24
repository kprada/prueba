import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Razas } from '../models/razas.model';
import { Perros } from '../models/perros.model';


@Injectable({
  providedIn: 'root'
})
export class DogServicesService {
  list:Razas[]=[];

  constructor(public http: HttpClient ) { 
    
this.cargarStorage();

    
  }

  getQuery(query:string){
    const url=`https://dog.ceo/api/${query}`;
    return this.http.get(url);
  }

  getAllBreeds(){
    return this.getQuery("breeds/list/all");
  }
  getImgRandom(breed:string){
    return this.getQuery(`breed/${breed}/images/random`);
  }
 
  

  crearlista(imagen:string,nombre:string){
    const lista = new Razas(imagen,nombre);
    if (this.list.length<=93) {
     this.list.push( lista );
      this.guardarStorage();
      console.log(this.list);
      
    }else{
      return;
    }
    return this.list;
  }

 
 

  guardarStorage() {

    localStorage.setItem('data', JSON.stringify(this.list) );

  }
  cargarStorage() {

    if ( localStorage.getItem('data') ) {
      this.list = JSON.parse( localStorage.getItem('data') );
      console.log(this.list);
      
    } else {
      this.list = [];
    }


  }

  




  

}
