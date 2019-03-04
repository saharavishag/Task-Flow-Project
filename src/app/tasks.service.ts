import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class TasksService {

  constructor(private http: HttpClient) { 
    console.log('Tasks Service Initialized...');
  }

  // we use map to return it as observable
  getAllTasks(){
    return this.http.get('/tasks/').pipe(map((posts) => {
      return posts;
    }));
  }

  deleteTask(task){
    console.log('SERVICE: going to delete task:');
    console.log(JSON.stringify(task));
    var httpOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      }
    }
    return this.http.post('/tasks/deletetask', JSON.stringify(task), httpOptions).pipe(
      map((res: Response) => {
        res.json();
      })
    );
  }

  saveTask(newTask){
    console.log('SERVICE: going to save task:');
    console.log(JSON.stringify(newTask));
    var httpOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      }
    }
    return this.http.post('/tasks/task', JSON.stringify(newTask), httpOptions).pipe(
      map((res: Response) => {
        res.json();
      })
    );
  }

}
