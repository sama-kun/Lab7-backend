import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { createTodo } from './dto/create-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService,
    ){}

    @Post()
    create(@Body() todoDto: createTodo){
        return this.todoService.create(todoDto);
    }

    @Get()
    getAll(){
        return this.todoService.find();
    }

    @Get('/:id')
    getOne(@Param('id')id: number){
        return this.todoService.findOne(id);
    }

    @Put('/:id')
    update(@Param('id')id: number,@Body() todoDto: createTodo){
        return this.todoService.update(id,todoDto);
    }

    @Delete('/:id')
    remove(@Param('id')id: number){
        return this.todoService.delete(id);
    }
}
