import {Perros} from './perros.model'
export class Razas {
  img:string;
  nombre_raza:string;
  perros:Perros[];
    
  
    
    
    constructor(img:string,nombre_raza:string){
    this.img=img;
    this.nombre_raza=nombre_raza;
    this.perros=[];
    
    }
    }