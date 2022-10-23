import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = "login"
  windowScrolled!: boolean;
  lastScrollTop = 0;
  delta = 1;


  @HostListener('window:scroll', [])

  onWindowScroll() {

    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      let st = document.documentElement.scrollTop;

      if (Math.abs(this.lastScrollTop - st) <= this.delta)
      return

      if (st > this.lastScrollTop) {
        this.windowScrolled = false;
      } else {
        this.windowScrolled = true;
      }
      this.lastScrollTop = st;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {

      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
}
