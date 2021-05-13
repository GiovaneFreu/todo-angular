import { ToDo } from './../../models/toDo';
import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todoList: ToDo[] = [];
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() alterarEvent = new EventEmitter<ToDo>();
  @Output() checkEvent = new EventEmitter<ToDo>();

  constructor() { }

  ngOnInit(): void {
  }

  delete(id: number): void {
    this.deleteEvent.emit(id);
  }

  alterar(todo: ToDo): void {
    this.alterarEvent.emit(todo);
  }

  check(todo: ToDo): void {
    todo.concluida = !todo.concluida;
    this.checkEvent.emit(todo);
  }

}
