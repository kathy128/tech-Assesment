import {Component, Input} from '@angular/core';
import {Color, PieChartModule, ScaleType} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  imports: [
    PieChartModule
  ],
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  @Input() data: {name: string, value:string}[] = []
  view: [number, number] = [500, 300];

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0F6584', '#172845']
  };

  constructor() {
    //Object.assign(this, { single });
  }
  ngOnInit() {
    this.updateView();
    window.addEventListener('resize', () => this.updateView());
  }

  updateView() {
    const width = window.innerWidth < 768 ? window.innerWidth * 0.9 : 600;
    this.view = [width, 400];
  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}

