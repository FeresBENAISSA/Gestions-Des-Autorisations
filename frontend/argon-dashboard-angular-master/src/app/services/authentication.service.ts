import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/User';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser'))) || new BehaviorSubject(null);
    public currentUser: Observable<any>;
    apiUrl: string = "http://localhost:8085";


    constructor(private http: HttpClient) {
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    public getCurrentUserValue() {
        return this.http.get<User>(`${this.apiUrl}/apiuser/me`).subscribe((user: User) => {
            console.log(user);
            this.currentUserSubject.next(user);
        });
    }
    login(formData: FormData) {
        return this.http.post(`${this.apiUrl}/login`, formData)
    }

    logout() {
        this.currentUserSubject.next(null);
        return this.http.get(`${this.apiUrl}/logout`);
    }
}