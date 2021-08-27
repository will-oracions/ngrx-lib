export class Todo {
  Id?: number;
  title: string;
  completed: boolean;

  constructor(title: string = '', completed = false) {
    this.title = title;
    this.completed = completed;
  }
}
