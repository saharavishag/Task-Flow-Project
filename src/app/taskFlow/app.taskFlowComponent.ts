import { Component, OnInit, Inject } from '@angular/core';
import { TasksService } from '../tasks.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Guid } from 'guid-typescript';

export interface DialogData {
  identifier: Guid,
  title: string,
  inputFormat: string,
  outputFormat: string,
  function: string
}

@Component({
  templateUrl: './taskFlow.html',
  styleUrls: ['./taskFlow.css'],
  providers: [TasksService]
})
export class taskFlowComponent implements OnInit {

  //#region class members
  form: FormGroup;
  title = 'Tasks Flow';
  tasks: any = [];
  taskFlow: any = [];
  temp: any = [];
  //#endregion

  //#region 
  constructor(private tasksService: TasksService, public formBuilder: FormBuilder, public dialog: MatDialog){ 
    this.form = this.formBuilder.group({
      taskName: ['',[Validators.required, Validators.maxLength(20)]]
    });
  }
  //#endregion

  //#region methods
  onSubmit(){
    console.log(this.taskFlow[0].jsonInput);
    console.log(this.taskFlow[this.taskFlow.length - 1].jsonOutput);
    var newTask = {
      identifier: Guid.create(),
      title: this.form.controls['taskName'].value,
      jsonInput: this.taskFlow[0].jsonInput,
      jsonOutput: this.taskFlow[this.taskFlow.length - 1].jsonOutput,
      function: this.taskFlow
    };
    console.log((JSON.stringify(newTask)));
    this.tasksService.saveTask(newTask).subscribe(task =>{
      console.log('task flow was saved:');
      console.log(task);
    });
    window.location.reload();
    alert('Task Flow was Saved');
  }

  onDelete(identifier, title, jsonInput, jsonOutput, func): void{
    console.log('deleting:');
    console.log(JSON.stringify(title));
    var task = {
      identifier: identifier,
      title: title,
      jsonInput: jsonInput,
      jsonOutput: jsonOutput,
      function: func
    };
    this.tasksService.deleteTask(task).subscribe(task => {
      console.log('deleting task...');
      console.log(JSON.stringify(task));
    });
    window.location.reload();
    // let index = this.tasks.findIndex(d => d.id === task); //find index in your array
    // this.tasks.splice(index, 1);//remove element from array
    alert('Task was Deleted');
  }

  // we can write is also in the ctor
  ngOnInit(): void {
    this.tasksService.getAllTasks().subscribe(tasks => {
      // setting this.tasks to be the tasks from the post
      this.tasks = tasks;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, 
                      event.previousIndex, 
                      event.currentIndex);
    } else if (event.previousContainer.id === 'flow') {
      transferArrayItem(event.previousContainer.data,
                    [],
                    event.previousIndex,
                    0);
      // transferArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex);
    } else {
      var newCloneTask = Object.assign({}, event.previousContainer.data[event.previousIndex]);
      copyArrayItem([newCloneTask],
        event.container.data,
        0,
        event.currentIndex);
        console.log(newCloneTask);
        this.taskFlow[event.currentIndex].identifier = Guid.create();
        console.log(this.taskFlow[event.currentIndex]);
        //this.taskFlow.find(x=>x.identifier == identifier).identifier = Guid.create();
    }
  }

  openDialog(identifier, title, jsonInput, jsonOutput, func): void {

    const dialogRef = this.dialog.open(PopupDialogComponent, {
      width: '270px',
      data: {identifier: identifier, title: title, inputFormat: jsonInput, outputFormat: jsonOutput, function: func}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.taskFlow.find(x=>x.identifier == identifier).jsonInput = result.inputFormat;
      this.taskFlow.find(x=>x.identifier == identifier).jsonOutput = result.outputFormat;
    });
  }
  //#endregion
}

@Component({
  templateUrl: './popup.html',
  styleUrls: ['./taskFlow.css']
})
export class PopupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log('closed without saving.')
  }
}