import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos',
  imports: [FormsModule, NgStyle,NgClass],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  title = 'Todos List';
  edit = false;
  defaultTodo = 'write a todo...';
  showForm: boolean = false;
  editable: boolean = false;
  notify = signal<boolean>(false);
  todoIndex: number = -1;
  mytodo: string = '';

  // Notification Personaliée
  notification = {
    message: '',
    position: '',
    alertClass: '',
    duration: 3000

  }

  // List Todos
  todos: string[] = ['Angular', 'Java', 'JS', 'Python', 'Django'];

  // Add Todo
  addTodo() {

    if(!this.validateTodo()){
      return;
    }

    if (this.mytodo != '') {
      this.todos = [this.mytodo, ...this.todos];
    }
    this.initForm();
    this.triggerNotify({
      message: 'Todo created succefuly ',
      position: 'toast toast-bottom toast-end',
      alertClass: 'alert alert-success',
      duration: 3000
    });
  }

  // Edit Todo
  editTodo(todo: string, index: number) {
    this.mytodo = todo;
    this.showForm = true;
    this.editable = true;
    this.todoIndex = index;

    console.log('todo : ', todo);
    console.log('myTodo : ', this.mytodo);
    console.log('editable : ', this.editable);
  }

  // Change show form status : show/hide form
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // switch above button content: show form / hide form
  changeToggleBtn() {
    return this.showForm ? 'Hide Form' : 'Show Form';
  }

  // Hide and Init Form
  initForm() {
    this.mytodo = '';
    this.editable = false;
    this.todoIndex = -1;
    this.toggleForm();
  }

  // Update Todo
  updateTodo() {
    if(!this.validateTodo()){
      return;
    }

    this.triggerNotify({
      message: 'Todo updated succefuly ',
      position: 'toast toast-bottom toast-end',
      alertClass: 'alert alert-warning',
      duration: 3000
    });
    this.initForm();
    this.todos[this.todoIndex] = this.mytodo;
  }

  // Delete Todo
  deleteTodo(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
        });
        this.triggerNotify({
      message: 'Todo was deleted ',
      position: 'toast toast-bottom toast-end',
      alertClass: 'alert alert-error',
      duration: 3000
    });
        this.todos = this.todos.filter((todo, myindex) => {
          return myindex != index;
        });
      }
    });

    // if (confirm('Do you want to delete this todo ?')) {
    //    this.todos = this.todos.filter((todo, myindex) => {
    //     return myindex != index;
    //   });
    // }
  }

  // Notifications
  triggerNotify(customNotify: any) {

    this.notification = {
      ...customNotify,
    }

    this.notify.set(true);
    console.log('Notify befor : ', this.notify)

    setTimeout(() => {
      this.notify.set(false);
      console.log('Notify after : ', this.notify)
    }, 3000);
  }


// Validate Todo
validateTodo(){
  if(!this.mytodo){
    this.triggerNotify({
      message: 'Please check data a input, todo is required!',
      position: 'toast toast-bottom toast-end',
      alertClass: 'alert alert-warning',
      duration: 3000
    })
    return false;
  }
  return true;
}












}
