export class Todo {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: 'pending' | 'completed',
    public dueDate: Date,
  ) {}
}
