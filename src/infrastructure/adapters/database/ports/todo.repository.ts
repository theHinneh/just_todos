import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../../../domain/ports/todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { Repository } from 'typeorm';
import { Todo } from '../../../../domain/entities/todo.entity';
import * as process from 'node:process';
import { TodoStatus } from '../../../../domain/types/todo-status.type';

@Injectable()
export class DatabaseTodoRepository implements TodoRepository {
  private readonly db = process.env.DB_DATABASE;

  constructor(
    @InjectRepository(TodoEntity)
    private readonly typeOrmRepository: Repository<TodoEntity>,
  ) {}

  async findAll(status?: TodoStatus): Promise<Todo[]> {
    let todos: TodoEntity[];
    if (status) {
      todos = await this.typeOrmRepository.find({ where: { status } });
    } else {
      todos = await this.typeOrmRepository.find();
    }

    return todos.map((v) => this.toDomain(v));
  }

  async findById(id: string): Promise<Todo | null> {
    const todo = await this.typeOrmRepository.findOne({ where: { id } });
    return todo ? this.toDomain(todo) : null;
  }

  async create(todo: Todo): Promise<Todo> {
    const todoEntity = this.toEntity(todo);
    const savedTodo = await this.typeOrmRepository.save(todoEntity);
    return this.toDomain(savedTodo);
  }

  async update(id: string, todo: Partial<Todo>): Promise<Todo | null> {
    await this.typeOrmRepository.update(id, todo);
    const updatedTodo = await this.typeOrmRepository.findOne({ where: { id } });
    if (!updatedTodo) {
      return null;
    }
    return this.toDomain(updatedTodo);
  }

  async delete(id: string): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  private toDomain(todoEntity: TodoEntity): Todo {
    return new Todo(
      todoEntity.id,
      todoEntity.title,
      todoEntity.description,
      todoEntity.status,
      todoEntity.dueDate,
    );
  }

  private toEntity(todo: Todo): TodoEntity {
    const todoEntity = new TodoEntity();
    todoEntity.id = todo.id;
    todoEntity.title = todo.title;
    todoEntity.description = todo.description;
    todoEntity.status = todo.status;
    todoEntity.dueDate = todo.dueDate;
    todoEntity.createdAt = new Date();
    todoEntity.updatedAt = new Date();
    return todoEntity;
  }
}
