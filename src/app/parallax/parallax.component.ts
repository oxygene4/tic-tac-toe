import {Component, AfterViewInit, ViewChild, HostListener} from '@angular/core';
import parallaxItems from './items';

// const parallaxItems = () => {
//   const a = Array(48).fill(null).map(() => {
//     const level = Math.floor(Math.random() * 5);
//     return {
//       type: Math.random() > 0.5 ? 'tic' : 'tac',
//       top: `${Math.random() * 90}%`,
//       left: `${Math.random() * 80}%`,
//       size: `${Math.random() * 20 / level + 2}vw`,
//       delay: `${Math.random()}s`,
//       level
//     };
//   });
//
//   console.log(a);
//
//   return a;
// };

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
