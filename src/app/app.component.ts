import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Simple interfaces for backward compatibility
interface SimpleTodo {
  id: number;
  descricao: string;
  concluida: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TodoPro - CI/CD Test';
  todoList: SimpleTodo[] = [];
  todo: SimpleTodo = { id: 0, descricao: '', concluida: false };

  constructor() {
    console.log('🏗️ AppComponent constructor chamado');
  }

  ngOnInit(): void {
    console.log('🔧 AppComponent ngOnInit chamado');
    // Initialize with sample data
    this.todoList = [
      { id: 1, descricao: 'Learn Angular Signals', concluida: false },
      { id: 2, descricao: 'Implement dark mode', concluida: true },
      { id: 3, descricao: 'Create professional UI', concluida: false }
    ];
  }

  save(): void {
    if (this.todo.descricao.trim()) {
      if (this.todo.id === 0) {
        // Add new todo
        const newId = Math.max(...this.todoList.map(t => t.id), 0) + 1;
        this.todoList.push({
          id: newId,
          descricao: this.todo.descricao,
          concluida: false
        });
      } else {
        // Update existing todo
        const index = this.todoList.findIndex(t => t.id === this.todo.id);
        if (index !== -1) {
          this.todoList[index] = { ...this.todo };
        }
      }
      this.cancel();
    }
  }

  cancel(): void {
    this.todo = { id: 0, descricao: '', concluida: false };
  }

  deleteTodo(id: number): void {
    this.todoList = this.todoList.filter(t => t.id !== id);
  }

  alterarDescricao(todo: SimpleTodo): void {
    this.todo = { ...todo };
  }

  updateTodo(todo: SimpleTodo): void {
    const index = this.todoList.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todoList[index] = { ...todo };
    }
  }

  concluidas(): number {
    return this.todoList.filter(t => t.concluida).length;
  }

  toggleComplete(todo: SimpleTodo): void {
    todo.concluida = !todo.concluida;
    this.updateTodo(todo);
  }

  trackByFn(_index: number, item: SimpleTodo): number {
    return item.id;
  }
}