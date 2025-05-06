import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input [(ngModel)]="username" name="username" placeholder="Username" required>
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account?</p>
    <button (click)="goToRegister()">Create Account</button>
  `,
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    const isValid = this.userService.login(this.username, this.password);
    if (isValid) {
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid credentials');
    }
  }
  

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
