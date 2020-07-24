import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Perros } from '../../models/perros.model';
import { DogServicesService } from '../../services/dog-services.service';
import { Razas } from '../../models/razas.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal.component';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-list-perros',
  templateUrl: './list-perros.component.html',
})
export class ListPerrosComponent implements OnInit {

 lista:Razas;



  constructor(private ActivatedRouter: ActivatedRoute,
    public dogsService:DogServicesService, public modalService:NgbModal) { 
    this.ActivatedRouter.params.subscribe(params=>{
     this.getPerros(params['item']);
     
    });

    
  }

  ngOnInit(): void {
  }

getPerros(i){
  this.lista=this.dogsService.list[i];
console.log(this.lista.perros);

  var cumpleaños=new Date()
}



  borrar(i:number){
     
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  this.lista.perros.splice(i,1)
  this.dogsService.guardarStorage();
  if (result.value) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})

   

   

  }



  editPerro(item:Perros){//RECIBO EN EL PARAMETRO EL USUARIO
    const ref=this.modalService.open(EditModalComponent,{ size: 'lg' }); //se inicializa una constatnte de referencia  con el servicio NgModal y se le pasa el componente donde va a trabajar y como segundo parametro el tamaño del modal
    ref.componentInstance.item= item; //se pasa en una instancia de referencia de una variable llenandola con el usuario que viene en el parametro de la funcion
    ref.result.then((yes)=>{ //abre el modal y devuelve una promesa
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Perro Actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
  
      this.dogsService.guardarStorage()
  
        console.log('ok click');
  
     
  
    }),(cancel)=>{
      console.log('cancel click');
  
  
    }
    
  
  
  }

}
