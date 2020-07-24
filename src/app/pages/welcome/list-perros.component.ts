import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Perros } from '../../models/perros.model';
import { DogServicesService } from '../../services/dog-services.service';
import { Razas } from '../../models/razas.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditModalComponent } from './edit-modal.component';

@Component({
  selector: 'app-list-perros',
  templateUrl: './list-perros.component.html',
})
export class ListPerrosComponent implements OnInit {
 perros:Perros[]=[];
 razas:Razas;



  constructor(private ActivatedRouter: ActivatedRoute,
    public dogsService:DogServicesService, public modalService:NgbModal) { 
    this.ActivatedRouter.params.subscribe(params=>{
     this.getPerros(params['item']);
     
    });
    
  }

  ngOnInit(): void {
  }

  getPerros(item:string){
let data= JSON.parse(item);
/* console.log(data.perros);

 */this.perros=data.perros;
 console.log(this.perros);
 this.razas=data;
 

  }
  borrar(i:number){
   this.razas.perros.splice(i,1);
   this.dogsService.guardarStorage();

  }



  editPerro(item:Perros){//RECIBO EN EL PARAMETRO EL USUARIO
    const ref=this.modalService.open(EditModalComponent,{ size: 'lg' }); //se inicializa una constatnte de referencia  con el servicio NgModal y se le pasa el componente donde va a trabajar y como segundo parametro el tamaño del modal
    ref.componentInstance.item= item; //se pasa en una instancia de referencia de una variable llenandola con el usuario que viene en el parametro de la funcion
    ref.result.then((yes)=>{ //abre el modal y devuelve una promesa
  this.dogsService.guardarStorage();
  
        console.log('ok click');
  
     
  
    }),(cancel)=>{
      console.log('cancel click');
  
  
    }
    
  
  
  }

}
