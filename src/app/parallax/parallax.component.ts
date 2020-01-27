import {Component, AfterViewInit, ViewChild, HostListener} from '@angular/core';

const parallaxItems = () => {
  return Array(30).fill(null).map(() => {
    const level = Math.floor(Math.random() * 5);
    return {
      type: Math.random() > 0.5 ? 'tic' : 'tac',
      top: `${Math.random() * 90}%`,
      left: `${Math.random() * 80}%`,
      size: `${Math.random() * 18 / level + 2}vw`,
      delay: `${Math.random()}s`,
      level
    };
  });
};

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements AfterViewInit {
  @ViewChild('wrapper', {static: true}) wrapper;

  parallaxItems = parallaxItems();
  ticSrc = 'url(https://www.pinclipart.com/picdir/big/391-3916354_ios-tic-tac-toe-with-an-unbeatable-ai.png)';

  constructor() {
  }

  @HostListener('window:mousemove', ['$event'])
  KeyDownCtrl(e) {
    const x = Math.round(e.pageX / window.innerWidth * 100);
    const y = Math.round(e.pageY / window.innerHeight * 100);

    this.wrapper.nativeElement.style.perspectiveOrigin = `${x}% ${y}%`;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.wrapper.nativeElement.classList.remove('hidden');
    }, 0);
  }
}
