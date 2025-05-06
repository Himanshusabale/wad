import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // 👈 Import this!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule], // 👈 Add it here!
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  task = '';
  tasks: string[] = [];
  editingIndex: number | null = null;

  addTask() {
    if (this.task.trim() !== '') {
      if (this.editingIndex !== null) {
        this.tasks[this.editingIndex] = this.task;
        this.editingIndex = null;
      } else {
        this.tasks.push(this.task);
      }
      this.task = '';
    }
  }

  editTask(index: number) {
    this.task = this.tasks[index];
    this.editingIndex = index;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    // if (this.editingIndex === index) {
    //   this.task = '';
    //   this.editingIndex = null;
    // }
  }
}