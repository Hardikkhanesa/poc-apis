import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class TodoService {


  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}


 async create(createTodoDto: CreateTodoDto) {
    const newTodo = {
      title: createTodoDto.title,
      description: createTodoDto.description || '',
      done: createTodoDto.done || false,
    };

    return await this.todoRepository.save(newTodo);
  }

  async findAll(page: number, limit: number): Promise<{ data: Todo[]; total: number }> {
    let todos: Todo[] = [];

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = await this.todoRepository.find({
    where:{
      id:Between(startIndex,endIndex)
    }
   });

   const totalTodos = await this.todoRepository.find()

    return { data, total: totalTodos.length };
  }


  async  findOne(id: number):Promise<Todo| null> {
    const todo = await this.todoRepository.findOne(id)

    if(todo){
      return todo;
    }
    return  null;
  }

 

 async update(id: number, updateData: Partial<Todo>): Promise<Todo> {
    const todo = await this.findOne(id);
    
    todo.title = updateData.title;
    todo.description = updateData.description;
    todo.done=updateData.done

   return await this.todoRepository.save(
      todo
    )
  }

 async remove(id: number) {
    return  this.todoRepository.delete({
    id
    })
  }
}
