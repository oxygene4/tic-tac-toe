import {Component, AfterViewInit, ViewChild, HostListener} from '@angular/core';
import parallaxItems from './items';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements AfterViewInit {
  @ViewChild('wrapper', {static: true}) wrapper;
  mouseX = 0;
  mouseY = 0;
  parallaxItems = [];

  constructor() {
    this.parallaxItems = parallaxItems;
  }

  @HostListener('window:mousemove', ['$event'])
  KeyDownCtrl(e) {
    this.mouseY = (e.pageX / window.innerWidth);
    this.mouseX = (e.pageY / window.innerHeight);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.wrapper.nativeElement.classList.remove('hidden');
    }, 0);
  }
}
