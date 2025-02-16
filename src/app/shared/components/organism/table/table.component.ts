import {AfterViewInit, Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import {
  MatCell,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {CommonModule} from '@angular/common';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TableDataInterface} from '../../../../interfaces/weather.interface';
import {data} from 'autoprefixer';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  imports: [
    MatTable,
    MatSort,
    CommonModule,
    MatHeaderCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatCell,
    MatFormField,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  styleUrl: './table.component.scss'
})
export class TableComponent implements AfterViewInit {
  displayedColumns = ['day', 'temperature', 'humidity', 'description'];
  @Input() receivedData : TableDataInterface[] = []
  dataSource: MatTableDataSource<any>;
  pageSizeOptions: number[] = [5, 10, 20];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public search = new FormControl('')
  constructor() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['receivedData'] && this.receivedData) {
      this.dataSource = new MatTableDataSource(this.receivedData);
    }
  }

  applyFilter(filterValue: any) {
    filterValue = (filterValue.target as HTMLInputElement).value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getWeatherIcon(description: string): string {
      if (description.toLowerCase().includes('clear')) return 'wb_sunny';
      if (description.toLowerCase().includes('clouds')) return 'cloud';
      if (description.toLowerCase().includes('rain')) return 'umbrella';
      if (description.toLowerCase().includes('snow')) return 'ac_unit';
        return 'help_outline';
  }
}


