import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { QueryTasksDto } from './dto/query-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Res() res: Response,
    @Query() query: QueryTasksDto,
  ) {
    // return this.tasksService.getAllTasks(query);
    if (
      Number(query.limit) < 1 || Number(query.page) < 1
      || (('sortBy' in query) && !(['title', 'status'].includes(query.sortBy))) 
    )
      res.status(400).end('Bad request');
    else {
      const tasks = this.tasksService.getAllTasks(query);

      if (!tasks.length)
        res.status(404).end('Bad request, tasks not exist');
      else res.status(200).json(tasks);
    }
    // res.status(200).json(this.tasksService.getAllTasks());
  }

  // @Get(':id')
  // getTaskById(@Param('id', ParseIntPipe) id: string) {
  //   const task = this.tasksService.getTaskById(String(id));

  //   if (!task)
  //     throw new HttpException({
  //       error: 'Not found',
  //       message: `Task with id: ${id} not exist`,
  //     }, HttpStatus.NOT_FOUND);

  //   return task;
  // }

  @Get(':id')
  getTaskById(@Res() res: Response, @Param('id', ParseIntPipe) id: string) {
    const task = this.tasksService.getTaskById(String(id));

    if (!task)
      res.status(404).end(`Task with id: ${id} not exist`);
    else
      res.status(200).json(task);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createTask(@Res() res: Response, @Body() dto: CreateTaskDto) {
    // return this.tasksService.createTask(dto);
    res.status(201).json(this.tasksService.createTask(dto));
  }

  // @Post('many')
  // @HttpCode(HttpStatus.CREATED)
  // createManyTasks(@Body() dto: CreateTaskDto): Task[] {
  //   return this.tasksService.createManyTasks(dto);
  // }

  // @Patch(':id')
  // updateTask(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
  //   const task = this.tasksService.getTaskById(String(id));

  //   if (!task)
  //     throw new HttpException({
  //       error: 'Not found',
  //       message: `Task with id: ${id} not exist`,
  //     }, HttpStatus.NOT_FOUND);

  //   return this.tasksService.updateTask(String(id), dto);
  // }

  @Patch(':id')
  updateTask(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    const task = this.tasksService.getTaskById(String(id));

    if (!task)
      res.status(404).end(`Task with id: ${id} not exist`);

    else res.status(200).json(this.tasksService.updateTask(String(id), dto));
  }

  @Delete(':id')
  deleteTask(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const task = this.tasksService.getTaskById(String(id));

    // if (!task)
    //   throw new HttpException({
    //     error: 'Not found',
    //     message: `Task with id: ${id} not exist`,
    //   }, HttpStatus.NOT_FOUND);

    // return this.tasksService.deleteTask(String(id));
    if (!task)
      res.status(404).end(`Task with id: ${id} not exist`);
    else res.status(200).json(this.tasksService.deleteTask(String(id)));
  }
}
