import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Todos } from './pages/todos/todos';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Todos
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-20');
}
