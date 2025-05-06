import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h2>Register</h2>
    <input [(ngModel)]="username" placeholder="Username">
    <input [(ngModel)]="password" type="password" placeholder="Password">
    <button (click)="register()">Register</button>
  `,
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register({ username: this.username, password: this.password });
    alert('Registration Successful!');
    this.router.navigate(['/login']);
  }
}
