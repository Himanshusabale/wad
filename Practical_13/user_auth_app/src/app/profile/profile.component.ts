import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>User Profile</h2>
    <p *ngIf="user">Welcome, {{ user.username }}</p>
    <p *ngIf="!user">No user logged in.</p>
    <button (click)="logout()">Logout</button>
  `,
})
export class ProfileComponent {
  user: any;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getUser(); // ✅ moved inside constructor
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
