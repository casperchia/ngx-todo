import {Component, OnInit} from "@angular/core";
import {DragulaService} from "ng2-dragula";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  openTasks: string[] = [];
  deletedOpenTasks: string[] = [];
  closedTasks: string[] = [];
  deletedClosedTasks: string[] = [];
  newTask: string = "";

  constructor(private dragulaService: DragulaService, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.openTasks = JSON.parse(localStorage.getItem("openTasks"));
    if (!this.openTasks) {
      this.openTasks = [];
    }

    this.closedTasks = JSON.parse(localStorage.getItem("closedTasks"));
    if (!this.closedTasks) {
      this.closedTasks = [];
    }

    this.dragulaService.dropModel.subscribe(() => {
      console.log(this.openTasks);
      localStorage.setItem("openTasks", JSON.stringify(this.openTasks));
      localStorage.setItem("closedTasks", JSON.stringify(this.closedTasks));
    });
  }

  clearOpenTasks() {
    this.deletedOpenTasks = this.openTasks;
    this.openTasks = [];
    localStorage.setItem("openTasks", JSON.stringify(this.openTasks));

    let snackBarRef = this.snackBar.open("Open tasks deleted", "Undo", {duration: 5000});
    snackBarRef.onAction().subscribe(() => {
      this.openTasks = this.deletedOpenTasks;
      localStorage.setItem("openTasks", JSON.stringify(this.openTasks));
    });
  }

  clearClosedTasks() {
    this.deletedClosedTasks = this.closedTasks;
    this.closedTasks = [];
    localStorage.setItem("closedTasks", JSON.stringify(this.closedTasks));

    let snackBarRef = this.snackBar.open("Completed tasks deleted", "Undo", {duration: 5000});
    snackBarRef.onAction().subscribe(() => {
      this.closedTasks = this.deletedClosedTasks;
      localStorage.setItem("closedTasks", JSON.stringify(this.closedTasks));
    });
  }

  addTask() {
    this.openTasks.unshift(this.newTask);
    localStorage.setItem("openTasks", JSON.stringify(this.openTasks));
    this.newTask = "";
  }
}
