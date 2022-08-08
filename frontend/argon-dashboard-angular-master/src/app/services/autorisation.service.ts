import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autorisation } from '../model/Autorisation';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {
  private apiServerUrl='http://localhost:8085/apiauto';
  constructor(private http:HttpClient) { }

  public getAutorisation():Observable<Autorisation[]>{
    return this.http.get<Autorisation[]>(`${this.apiServerUrl}/all`)
  }
  public getAutorisationByYear():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/year`)
  }
  public getAutorisationByYearByUsername(username :String):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/year/${username}`)
  }
  public getAutorisationByUsername(username :String ):Observable<Autorisation[]>{
    return this.http.get<Autorisation[]>(`${this.apiServerUrl}/find/user/${username}`)
  }
  public getAutorisationById(id:Number):Observable<Autorisation>{
    return this.http.get<Autorisation>(`${this.apiServerUrl}/find/${id}`)
  }
  public addAutorisation(autorisation : Autorisation):Observable<Autorisation>{
    return this.http.post<Autorisation>(`${this.apiServerUrl}/save`,autorisation)
  }
  public updatetAutorisation(autorisation : Autorisation):Observable<Autorisation>{
    return this.http.put<Autorisation>(`${this.apiServerUrl}/update`,autorisation)
  }
  public getAutorisationByDateByState(date :Date,state:string):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/find/${date}/${state}`)
  }
}
