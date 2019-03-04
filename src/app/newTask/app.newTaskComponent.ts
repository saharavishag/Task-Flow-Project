import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Guid } from "guid-typescript";

@Component({
  templateUrl: './newTask.html',
  styleUrls: ['./app.newTaskComponent.css'],
  providers: [TasksService]
})
export class newTaskComponent {
  
  title = 'Create New Task';
  form: FormGroup;
    
  constructor(public formBuilder: FormBuilder, private tasksService: TasksService){
    this.form = this.formBuilder.group({
      taskName: ['',[Validators.required, Validators.maxLength(20)]],
      jsonInput: ['',[Validators.required]],
      jsonOutput: ['',[Validators.required]],
      func: ['',[Validators.required]]
    });    
  }

  onSubmit(){
    
    var newTask = {
      identifier: Guid.create(),
      title: this.form.controls['taskName'].value,
      jsonInput: this.form.controls['jsonInput'].value,
      jsonOutput: this.form.controls['jsonOutput'].value,
      function: this.form.controls['func'].value
    };
    
    this.tasksService.saveTask(newTask).subscribe(task =>{
      console.log('task was saved:');
      console.log(task);
    });
    
    this.form.reset();
    alert('Task was Saved');
  }
}
