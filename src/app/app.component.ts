import {Component, OnInit} from "@angular/core";
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  openTasks: string[] = [];
  closedTasks: string[] = [];
  newTask: string = "";

  constructor(private dragulaService: DragulaService) {
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
    this.openTasks = [];
    localStorage.setItem("openTasks", JSON.stringify(this.openTasks));
  }

  clearClosedTasks() {
    this.closedTasks = [];
    localStorage.setItem("closedTasks", JSON.stringify(this.closedTasks));
  }

  addTask() {
    this.openTasks.unshift(this.newTask);
    localStorage.setItem("openTasks", JSON.stringify(this.openTasks));
    this.newTask = "";
  }
}
