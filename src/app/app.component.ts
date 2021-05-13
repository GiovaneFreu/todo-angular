import { Observable } from 'rxjs';
import { ToDo } from './models/toDo';
import { TodoService } from './services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todoList: any | ToDo[] = [];
  todo: ToDo = new ToDo();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(): void {
    // tslint:disable-next-line: deprecation
    this.todoService.getAll().subscribe(
      data => this.todoList = data,
      error => console.log(error)
    );
  }

  save(): void {
    if (!this.todo.id) {
      // tslint:disable-next-line: deprecation
      this.todoService.createToDo(this.todo).subscribe(
        () => {
          this.getAllTodos();
          this.cancel();
        },
        error => console.log(error)
      );
    } else {
      this.updateTodo(this.todo);
    }
  }

  updateTodo(todo: ToDo): void {
    // tslint:disable-next-line: deprecation
    this.todoService.updateToDo(todo).subscribe(
      () => {
        this.getAllTodos();
        this.cancel();
      },
      error => console.log(error)
    );
  }

  deleteTodo(id: number): void {
    // tslint:disable-next-line: deprecation
    this.todoService.deleteToDo(id).subscribe(
      () => this.getAllTodos()
    );
  }

  concluidas(): number {
    return this.todoList.filter((e: any) => e.concluida === true).length;
  }

  alterarDescricao(todo: ToDo): void {
    this.todo = { ...todo };
  }

  cancel(): void {
    this.todo = new ToDo();
  }

}
