import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { taskdata} from '../taskdata';

@Component({
  selector: 'app-task-tracker',
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {

  tempArr : Array<taskdata> = [];
  display:boolean = false; 
  constructor() { 
  }
  ngOnInit(): void {
  }
  loginUser(idRef:any, nameRef:any, tnameRef:any, tdueRef:any){
    let taskObj:taskdata= {id:idRef.value, name:nameRef.value, task:tnameRef.value, deadline:tdueRef.value};
    this.tempArr.push(taskObj);

    this.display=true;
  }

}
