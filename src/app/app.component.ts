import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoFilterType, TODO_FILTERS } from './models/todo-filter.model';
import { ValidationService } from './services/validation.service';

// Simple interfaces for backward compatibility
interface SimpleTodo {
  id: number;
  description: string;
  completed: boolean;
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
  todo: SimpleTodo = { id: 0, description: '', completed: false };
  
  // TDD GREEN PHASE - Filter Implementation
  currentFilter: TodoFilterType = 'all';
  availableFilters = TODO_FILTERS;

  constructor(public validationService: ValidationService) {
    console.log('🏗️ AppComponent constructor chamado');
  }

  ngOnInit(): void {
    console.log('🔧 AppComponent ngOnInit chamado');
    // Initialize with sample data
    this.todoList = [
      { id: 1, description: 'Learn Angular Signals', completed: false },
      { id: 2, description: 'Implement dark mode', completed: true },
      { id: 3, description: 'Create professional UI', completed: false }
    ];
  }

  save(): void {
    // TDD GREEN PHASE - Validation Integration
    const validationResult = this.validationService.validateTodoDescription(this.todo.description);
    
    if (validationResult.isValid) {
      if (this.todo.id === 0) {
        // Add new todo
        const newId = Math.max(...this.todoList.map(t => t.id), 0) + 1;
        this.todoList.push({
          id: newId,
          description: this.todo.description.trim(),
          completed: false
        });
      } else {
        // Update existing todo
        const index = this.todoList.findIndex(t => t.id === this.todo.id);
        if (index !== -1) {
          this.todoList[index] = { ...this.todo, description: this.todo.description.trim() };
        }
      }
      this.cancel();
    }
    // If invalid, validation errors will be shown in template
  }

  cancel(): void {
    this.todo = { id: 0, description: '', completed: false };
  }

  deleteTodo(id: number): void {
    this.todoList = this.todoList.filter(t => t.id !== id);
  }

  editDescription(todo: SimpleTodo): void {
    this.todo = { ...todo };
  }

  updateTodo(todo: SimpleTodo): void {
    const index = this.todoList.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      this.todoList[index] = { ...todo };
    }
  }

  concluidas(): number {
    return this.todoList.filter(t => t.completed).length;
  }

  toggleComplete(todo: SimpleTodo): void {
    todo.completed = !todo.completed;
    this.updateTodo(todo);
  }

  trackByFn(_index: number, item: SimpleTodo): number {
    return item.id;
  }

  // TDD GREEN PHASE - Filter Methods
  get filteredTodos(): SimpleTodo[] {
    switch (this.currentFilter) {
      case 'active':
        return this.todoList.filter(todo => !todo.completed);
      case 'completed':
        return this.todoList.filter(todo => todo.completed);
      default:
        return this.todoList;
    }
  }

  setFilter(filter: TodoFilterType): void {
    this.currentFilter = filter;
  }

  getActiveCount(): number {
    return this.todoList.filter(todo => !todo.completed).length;
  }

  getCompletedCount(): number {
    return this.todoList.filter(todo => todo.completed).length;
  }

  // Template Helper Methods
  getFilterButtonClass(filterType: TodoFilterType): string {
    const activeClass = 'bg-blue-600 text-white shadow-sm';
    const inactiveClass = 'text-gray-600 hover:text-gray-900 hover:bg-white';
    
    return this.currentFilter === filterType ? activeClass : inactiveClass;
  }

  getFilterCount(filterType: TodoFilterType): number {
    switch (filterType) {
      case 'active':
        return this.getActiveCount();
      case 'completed':
        return this.getCompletedCount();
      default:
        return this.todoList.length;
    }
  }

  trackByFilterType(_index: number, filter: { type: TodoFilterType; label: string }): TodoFilterType {
    return filter.type;
  }

  // TDD GREEN PHASE - Validation Methods
  getValidationState() {
    return this.validationService.getValidationState(this.todo.description);
  }

  getValidationResult() {
    return this.validationService.validateTodoDescription(this.todo.description);
  }

  isFormValid(): boolean {
    return this.getValidationResult().isValid;
  }
}