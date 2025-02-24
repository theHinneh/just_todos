import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      let todos: TodoEntity[];
      if (status) {
        todos = await this.typeOrmRepository.find({ where: { status } });
      } else {
        todos = await this.typeOrmRepository.find();
      }
      return todos.map((v) => this.toDomain(v));
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Could not fetch todos',
          error.message,
        );
      }
      throw new InternalServerErrorException('Could not fetch todos');
    }
  }

  async findById(id: string): Promise<Todo | null> {
    const todo = await this.typeOrmRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return this.toDomain(todo);
  }

  async create(todo: Todo): Promise<Todo> {
    try {
      const todoEntity = this.toEntity(todo);
      const savedTodo = await this.typeOrmRepository.save(todoEntity);
      return this.toDomain(savedTodo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          'Could not create todo',
          error.message,
        );
      }
      throw new InternalServerErrorException('Could not create todo');
    }
  }

  async update(id: string, todo: Partial<Todo>): Promise<Todo | null> {
    await this.typeOrmRepository.update(id, todo);
    const updatedTodo = await this.typeOrmRepository.findOne({
      where: { id },
    });
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return this.toDomain(updatedTodo);
  }

  async delete(id: string): Promise<void> {
    const result = await this.typeOrmRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
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
