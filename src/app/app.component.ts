import {Component, OnInit} from "@angular/core";
import {DragulaService} from "ng2-dragula";
import {MdSnackBar} from "@angular/material";
import {TaskService} from "./task.service";
import {Task} from "./task.model";
import {TaskType} from "./task-type.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  openTasks: Task[] = [];
  deletedOpenTasks: Task[] = [];
  closedTasks: Task[] = [];
  deletedClosedTasks: Task[] = [];
  newTask: Task = <Task>{};

  constructor(private dragulaService: DragulaService, private snackBar: MdSnackBar, private taskService: TaskService) {
  }

  ngOnInit() {
    this.openTasks = this.taskService.getTasks(TaskType.OPEN);
    this.closedTasks = this.taskService.getTasks(TaskType.CLOSED);

    this.dragulaService.dropModel.subscribe(() => {
      console.log(this.openTasks);
      this.taskService.saveTasks(TaskType.OPEN, this.openTasks);
      this.taskService.saveTasks(TaskType.CLOSED, this.closedTasks);
    });
  }

  clearOpenTasks() {
    this.deletedOpenTasks = this.openTasks;
    this.openTasks = [];
    this.taskService.saveTasks(TaskType.OPEN, this.openTasks);

    let snackBarRef = this.snackBar.open("Open tasks deleted", "Undo", {duration: 5000});
    snackBarRef.onAction().subscribe(() => {
      this.openTasks = this.deletedOpenTasks;
      this.taskService.saveTasks(TaskType.OPEN, this.openTasks);
    });
  }

  clearClosedTasks() {
    this.deletedClosedTasks = this.closedTasks;
    this.closedTasks = [];
    this.taskService.saveTasks(TaskType.CLOSED, this.closedTasks);

    let snackBarRef = this.snackBar.open("Completed tasks deleted", "Undo", {duration: 5000});
    snackBarRef.onAction().subscribe(() => {
      this.closedTasks = this.deletedClosedTasks;
      this.taskService.saveTasks(TaskType.CLOSED, this.closedTasks);
    });
  }

  addTask() {
    if (!this.newTask.name) {
      return;
    }
    this.newTask.dateCreated = new Date();
    this.openTasks.unshift(this.newTask);
    this.taskService.saveTasks(TaskType.OPEN, this.openTasks);
    this.newTask = <Task>{};
  }
}
