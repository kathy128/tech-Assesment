import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-weather-main',
  standalone: true,
  templateUrl: './weather-main.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrl: './weather-main.component.scss'
})
export class WeatherMainComponent implements OnInit{

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'height', '100vh');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'flex-direction', 'column');
  }
}
