import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[];

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
   /* this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    ); */
    this.employeeService.getEmployees().subscribe({
      next : (response: Employee[]) => this.employees = response,
      error: (e) => alert(e.message),
      complete: () => console.log(this.employees)
    })
  }
/*  public onOpenModal(employee: Employee, mode: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target', '#addModal');
    }
    if(mode === 'update') {
      button.setAttribute('data-target', '#updateModal');
    }
  } */

  public onAddEmployee(addForm: NgForm): void {
    console.log(addForm.value);
    this.employeeService.addEmployee(addForm.value).subscribe({

      next : (response: Employee) => this.getEmployees(),
      error: (e) => alert(e.message)
    })
    addForm.resetForm();
  }

  public onUpdateEmployee(updateForm: NgForm): void {
    console.log("UPDATE" + updateForm.value);
    this.employeeService.updateEmployee(updateForm.value).subscribe({

      next : (response: Employee) => this.getEmployees(),
      error: (e) => alert(e.message)
    })
    updateForm.resetForm();
  }

  public onDeleteEmployee(deleteForm: NgForm): void {
    console.log(deleteForm.value.id);
    this.employeeService.deleteEmployee(deleteForm.value.id).subscribe({

      next : (response: void) => this.getEmployees(),
      error: (e) => alert(e.message)
    })
  }

  public searchEmployee(search: string): void {
    const searchResults: Employee[] = [];
    for(const employee of this.employees) {
      if(employee.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1
        || employee.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1
        || employee.emailId.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
        searchResults.push(employee);
      }
    }
    this.employees = searchResults;
    if(searchResults.length == 0 || !search) {
      this.getEmployees();
    }
  }
}
