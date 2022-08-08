import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Role } from '../model/Role';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:8085'
  constructor(private http: HttpClient) { }

  public login(username: String, password: String): Observable<User> {
    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password) })
    return this.http.post<User>(`${this.apiServerUrl}/login `, { headers, responseType: 'text' as 'json', })
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/apiuser/all`)
  }
  async getUserByUsername(username: String): Promise<User> {
    return await firstValueFrom(this.http.get<User>(`${this.apiServerUrl}/apiuser/user/find/${username}`));
  }
  public getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiServerUrl}/apiuser/roles`)
  }
  async getUserByEmail(email: string): Promise<User> {
    return await firstValueFrom( this.http.get<User>(`${this.apiServerUrl}/apiuser/user/find/email/${email}`));
  }
  public getUserById(id: Number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/apiuser/find/${id}`)
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/apiuser/user/save`, user)
  }
  public addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiServerUrl}/apiuser/role/save`, role)
  }
  public updatetUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/apiuser/user/update`, user)
  }
  public deleteUser(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/apiuser/delete/${id}`)
  }
}
