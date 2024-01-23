import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { ITodo } from './interfaces/todo.interface';

@Injectable()
export class TodoListService {
  private _todoList: ITodo[] = [];

  create(createTodoListDto: CreateTodoListDto) {
    try {
      const newTodoList = {
        ...createTodoListDto,
        id: uuidv4(),
      };

      this._todoList.push(newTodoList);

      return newTodoList;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  findAll() {
    return this._todoList;
  }

  findOne(id: string) {
    const todo = this._todoList.find((item) => item.id === id);

    if (todo) {
      return todo;
    } else {
      throw new HttpException('Todo is not found', HttpStatus.NOT_FOUND);
    }
  }

  update(id: string, updateTodoListDto: UpdateTodoListDto) {
    const findIndexTodo = this._todoList.findIndex((todo) => todo.id === id);

    if (findIndexTodo !== -1) {
      this._todoList[findIndexTodo] = {
        id,
        name: updateTodoListDto.name,
        status: updateTodoListDto.status,
      };

      console.log('todo list', this._todoList);
    } else {
      throw new HttpException('Todo is not found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: string) {
    const findIndexTodo = this._todoList.findIndex((todo) => todo.id === id);

    if (findIndexTodo !== -1) {
      this._todoList = this._todoList.filter((todo) => todo.id !== id);

      console.log('todo list', this._todoList);
    } else {
      throw new HttpException('Todo is not found', HttpStatus.NOT_FOUND);
    }
  }
}
