import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(private router: Router) {
  // Prevent navigating back to cached pages after logout
  this.router.events.subscribe(() => {
    if (!localStorage.getItem('authToken')) {
      // Disable back navigation
      history.pushState(null, '', location.href);
      window.onpopstate = () => {
        history.go(1);
      };
    }
  });
}


}
