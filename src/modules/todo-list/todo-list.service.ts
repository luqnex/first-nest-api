import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoListService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoListDto: CreateTodoListDto) {
    try {
      const newTodo = await this.prisma.todo.create({
        data: createTodoListDto,
      });

      return newTodo;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.prisma.todo.findMany();
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.todo.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateTodoListDto: UpdateTodoListDto) {
    try {
      return await this.prisma.todo.update({
        where: { id },
        data: updateTodoListDto,
      });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.todo.delete({ where: { id } });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
