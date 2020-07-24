import { Component, OnInit } from '@angular/core';
import { DogServicesService } from '../../services/dog-services.service';
import { Razas } from '../../models/razas.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Perros } from '../../models/perros.model';
import { Router } from '@angular/router';
import  Swal from 'sweetalert2';





@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  forma:FormGroup;
  desde: number=0;
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
    

   }

  ngOnInit() {

  }
  get  nombreValidador(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get  fechaValidator(){
    return this.forma.get('fecha_nacimiento').invalid && this.forma.get('fecha_nacimiento').touched;
  }


  crearForm(){
    this.forma= new FormGroup({
   nombre:new FormControl(null , [Validators.required, Validators.minLength(5)]),
   fecha_nacimiento:new FormControl(null , Validators.required),
  
    });
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
 



  add(razas:Razas){
  
    if (this.forma.invalid) {// VALIDA QUE EL FORMULARIO NO SEA INVALIDO
      Object.values(this.forma.controls).forEach((control) =>{// RECORRE LOS CAMPOS DEL FIRMULARIOS
  
        control.markAllAsTouched(); // VERIFICA CADA CAMPO
        Swal.fire({
          title:'Campos Obligatorios',
          icon:'error'
        });
  
      });
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
  this.forma.reset();
  }
  listarperros(item:any){
/*     console.log(item);
 */    
/* this.router.navigate(['/perros',JSON.stringify(item)]);
 */this.router.navigate(['/perros',item]);

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
