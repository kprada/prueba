import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ListPerrosComponent } from './list-perros.component';
import { EditModalComponent } from './edit-modal.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  imports: [WelcomeRoutingModule,CommonModule,NzButtonModule,
    NzIconModule,NgbModule,FormsModule,ReactiveFormsModule,NzModalModule,NzTableModule],
  declarations: [WelcomeComponent, ListPerrosComponent, EditModalComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
  