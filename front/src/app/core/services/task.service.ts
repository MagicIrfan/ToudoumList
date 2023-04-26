import {Injectable} from "@angular/core";
import {Task} from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks!: Task[];

  constructor() {
    this.tasks = [
      {
        id:0,
        userId:0,
        name:"T'as les cramptés ?",
        description:"Apanyan",
        finished:false
      }
    ]
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id:number): Task{
    return this.tasks.find((task: Task) => task.id === id) as Task;
  }

  getLastId():number{
    if (this.tasks.length === 0) {
      return 0;
    }
    const maxId : number = this.tasks.reduce((max : number, task :Task) => Math.max(max, task.id), 0);
    return maxId + 1;
  }

  addTask(newTask: Task):void{
    this.tasks.push(newTask);
  }

  editTask(task: Task):void{
    const index : number = this.getIndexById(task.id);
    if (index > -1)
      this.tasks[index] = task;
  }

  setFinishTask(id:number,isFinished:boolean):void{
    const index : number = this.getIndexById(id);
    if (index > -1)
      this.tasks[index].finished = isFinished;
  }

  deleteTask(id:number) : void{
    const index : number = this.getIndexById(id);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  getIndexById(id:number):number{
    return this.tasks.indexOf(this.getTaskById(id));
  }
  getTasksByUserId(userId: number): Task[] {
    return this.tasks.filter((task: Task): boolean => task.userId === userId);
  }
}
