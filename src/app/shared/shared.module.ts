import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from "@angular/cdk/table";
import {HeaderComponent} from './components/organism/header/header.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {TableComponent} from './components/organism/table/table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingComponent} from './components/atoms/loading/loading.component';
import {CardComponent} from './components/atoms/card/card.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoadingComponent,
    CardComponent,
    CdkTableModule,
    HeaderComponent,
    TableComponent,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
})

export class SharedModule { }
