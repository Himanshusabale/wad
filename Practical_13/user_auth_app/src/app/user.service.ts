import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: { username: string; password: string } | null = null;

  register(user: { username: string; password: string }) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(username: string, password: string): boolean {
    const stored = JSON.parse(localStorage.getItem('user') || '{}');
      if (stored.username === username && stored.password === password) {
        this.user = stored;
        return true;
      }
    return false;
  }

  getUser() {
    if (this.user) return this.user;
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
    
  }
}
