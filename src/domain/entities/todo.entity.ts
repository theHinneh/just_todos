import { TodoStatus } from '../types/todo-status.type';

export class Todo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: TodoStatus,
    public dueDate: Date,
  ) {}
}
