import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTasksDto } from './dto/query-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(query?: QueryTasksDto): Task[] {
    if (!query) return this.tasks;

    const { page, limit, status, sortBy } = query;

    let doubleTasks = [...this.tasks];

    if (status) doubleTasks = doubleTasks.filter((item) => item.status === status);
    if (sortBy) doubleTasks = doubleTasks.sort((a: Task, b: Task) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));

    const result = doubleTasks.splice((Number(page) - 1) * Number(limit), Number(limit));

    return result;;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((item) => item.id === id);
  }

  createTask(task: Task): Task {
    const { id, ...d } = task;
    const newTask: Task = {
      id: String(Number(this.tasks.at(-1)?.id || '0') + 1),
      ...d,
    };
    this.tasks.push(newTask);

    return newTask;
  }

  createManyTasks(task: Task): Task[] {
    const result: Task[] = []

    for (let i = 0; i < 10; i++) {
      result.push(this.createTask(task))
    }

    return result;
  }

  updateTask(id: string, update: UpdateTaskDto): Task {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    const updatedTask = this.tasks[taskIndex];

    for (let t in update) {
      updatedTask[t] = update[t];
    }

    return updatedTask;
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    const removedTask = { ...this.tasks[taskIndex] };
    this.tasks.splice(taskIndex, 1);

    return removedTask;
  }
}
