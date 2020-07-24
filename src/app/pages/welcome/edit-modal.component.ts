import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DogServicesService } from '../../services/dog-services.service';
import { Perros } from '../../models/perros.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent implements OnInit {
item:Perros;//este nombre debe ser igual al que se manda por referencia
  constructor(public modal: NgbActiveModal,public dogsService:DogServicesService) { }

  ngOnInit(): void {
  }

actualizar(perro:Perros){
  this.item.nombre=perro.nombre;
  this.item.fecha_nacimiento=perro.fecha_nacimiento;
  this.modal.close('cancel');
  this.dogsService.guardarStorage();
}

}
