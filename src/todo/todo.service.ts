import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { createTodo } from './dto/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(Todo) private readonly todoRepo: Repository<Todo>){}

    async create(dto: createTodo): Promise<Todo>{
        const todo = new Todo();
        todo.title = dto.title;
        todo.desc = dto.desc;

        return this.todoRepo.save(todo);
    }

    async update(id: number, dto: createTodo): Promise<Todo>{
        const todo = await this.todoRepo.findOneBy({id})

        if (!todo) {
            throw new Error(`Model with id ${id} not found`);
        }

        todo.title = dto.title;
        todo.desc = dto.desc;


        return await this.todoRepo.save(todo);
    }

    async delete(id: number): Promise<Todo>{
        const todo = await this.todoRepo.findOneBy({id})

        if (!todo) {
            throw new Error(`Model with id ${id} not found`);
        }

        return await this.todoRepo.remove(todo);
    }

    async find(): Promise<Todo[]>{
        return await this.todoRepo.find();
    }

    async findOne(id: number): Promise<Todo>{
        const todo = await this.todoRepo.findOneBy({id})

        if (!todo) {
            throw new Error(`Model with id ${id} not found`);
        }

        return todo;
    }
}
