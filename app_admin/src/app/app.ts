import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(
    public readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
