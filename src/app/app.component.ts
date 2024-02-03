import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  tasks: any[] = [];
  newTask: string = '';
  newDesc: string = '';
  showDetails: boolean = false
  selectedTaskId: number | null = null;
  detailsState: boolean[] = new Array(this.tasks.length).fill(false);

  constructor(private toastr: NgToastService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  addTask() {
    console.log(Date.now())
    if (this.newTask.trim() !== '' && this.newDesc.trim() !== '') {
      this.tasks.push({
        id: Date.now(),
        title: this.newTask,
        description: this.newDesc,
        completed: false
      });

      this.saveTasks();
      this.toastr.success({detail:"Tasks update",summary:`${this.newTask} added to list`, position: 'topRight',duration:3000});
      this.newTask = '';
      this.newDesc = ''
    } else {
      this.toastr.warning({detail:"Empty fields",summary:'Title and description are mandatory', position: 'topRight',duration:3000});
    }
  }

  deleteTask(taskId: any) {
    console.log(taskId)
    this.tasks = this.tasks.filter(task => task.id !== taskId.id);
    this.toastr.error({detail:"Tasks update",summary:`${taskId.title} deleted from list`, position: 'topRight',duration:3000})
    this.saveTasks();
  }

  openDetails(index: number) {
    this.detailsState[index] = true;
  }
  
  closeDetails(index: number) {
    this.detailsState[index] = false;
  }

  markAsCompleted(taskId: any , event: any) {
    const task = this.tasks.find(task => task.id === taskId.id);
    if (task) {
      if (event.target.checked) {
        task.completed = true;
        this.toastr.success({detail:"Task update",summary:`${taskId.title} completed successfully`, position: 'topRight',duration:3000});
      } else {
        task.completed = false;
        this.toastr.warning({detail:"Task update",summary:`${taskId.title} re-opened`, position: 'topRight',duration:3000});
      }
      this.saveTasks();
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
}
