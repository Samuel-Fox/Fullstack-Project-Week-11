import { Injectable } from '@angular/core';
import { Employee } from './employee';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private serverUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.serverUrl}/employees`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.serverUrl}/employees`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    //
    //
    //CHANGE URL TO WHAT IS IN BACKEND
    //
    //
    console.log("FINAL EMPLOYEE" + employee)
    return this.http.put<Employee>(`${this.serverUrl}/employees/${employee.id}`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    //
    //
    //CHANGE URL TO WHAT IS IN BACKEND
    //
    //
    return this.http.delete<void>(`${this.serverUrl}/employees/delete/${employeeId}`);
  }
}
