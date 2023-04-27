import {Injectable} from "@angular/core";
import {Task} from "../models/task.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ServerUtils} from "../utils/serverUtils";
import {LocalService} from "./local.service";
import {AuthService} from "./auth.service";
import {Message} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient)
  {}

  getAllTasks(finished: boolean): Observable<Task[]> {
    const url: string = `${ServerUtils.url}/api/tasks`;
    const params : {finished : string} = { finished: finished.toString() };
    return this.httpClient.get<Task[]>(url, { params });
  }

  getTaskById(id:number): Observable<Task>{
    return this.httpClient.get<Task>(`${ServerUtils.url}/api/tasks/${id}`);
  }

  addTask(newTask: Task):Observable<Message>{
    return this.httpClient.post<Message>(`${ServerUtils.url}/api/tasks`,newTask);
  }

  editTask(task: Task):Observable<Message>{
    return this.httpClient.put<Message>(`${ServerUtils.url}/api/tasks/${task.id}`,task);
  }

  setFinishTask(task:Task,isFinished:boolean):Observable<Message>{
    task.finished = isFinished;
    return this.editTask(task);
  }

  deleteTask(id:number) : Observable<Message>{
    return this.httpClient.delete<Message>(`${ServerUtils.url}/api/tasks/${id}`);
  }
}
