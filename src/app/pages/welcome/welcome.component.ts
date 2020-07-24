import { Component, OnInit } from '@angular/core';
import { DogServicesService } from '../../services/dog-services.service';
import { Razas } from '../../models/razas.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Perros } from '../../models/perros.model';
import { Router } from '@angular/router';
import  Swal from 'sweetalert2';
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  forma:FormGroup;
public list:Razas[]=[];
public razas:Razas;
public imagen:string
isVisible = false;
isConfirmLoading = false;
  constructor(public dogService:DogServicesService,
    private router: Router
  ) {
    this.list=this.dogService.list;
    this.getbreed();
    this.crearForm();
    this.getimg();
    

   }

  ngOnInit() {

  }
  getbreed(){
    this.dogService.getAllBreeds().subscribe((res:any)=>{
     for (const key in res.message) {
       if (Object.prototype.hasOwnProperty.call(res.message, key)) {
         const element = res.message[key];
       
       }
       this.dogService.getImgRandom(key).subscribe((data:any)=>{
       data.message;
         this.dogService.crearlista(data.message,key);

       });
   
    
     }
    
    });

    
  }

  getimg(){
    let beagle='beagle';
    this.dogService.getImgRandom(beagle).subscribe(data=>{
      console.log(data);
      
    });
  }
 

  crearForm(){
    this.forma= new FormGroup({
   nombre:new FormControl(null , Validators.required),
   fecha_nacimiento:new FormControl(null , Validators.required),
  
    });
  }

  add(razas:Razas){
  
    if (this.forma.invalid) {
      return;
    }
   let perro:Perros={
     nombre:this.forma.value.nombre,
     fecha_nacimiento:this.forma.value.fecha_nacimiento
   };
   this.razas.perros.push(perro);
   console.log(razas);
   this.dogService.guardarStorage();
   this.handleOk();
   Swal.fire({
    title:'Registro Exitoso',
    icon:'success'
  });

  }
  listarperros(item:Razas){
/*     console.log(item);
 */    
this.router.navigate(['/perros',JSON.stringify(item)])
  }





  showModal(item:Razas): void {
    this.razas=item;
    this.isVisible = true;

  /*   if (this.forma.invalid) {
      return;
    }
   let perro: Perros ={
    nombre: this.forma.value.nombre,
     fecha_nacimiento:this.forma.value.fecha_nacimiento
   }; */
   
/*  console.log(perro);
 */  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }







}
