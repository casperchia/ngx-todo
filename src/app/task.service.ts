import {Injectable} from "@angular/core";
import {TaskType} from "./task-type.enum";
import {Task} from "./task.model";

@Injectable()
export class TaskService {

  constructor() {
  }

  getTasks(taskType: TaskType): Task[] {
    return JSON.parse(localStorage.getItem(taskType.toString()));
  }

  saveTasks(taskType: TaskType, tasks: Task[]) {
    localStorage.setItem(taskType.toString(), JSON.stringify(tasks));
  }

}
