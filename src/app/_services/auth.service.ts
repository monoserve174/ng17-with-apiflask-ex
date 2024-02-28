import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const authUrl = `http://localhost:8000/apis/auth`;
let headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string) {
    return this.http.post<any>(`${authUrl}/token`, { username, password }, { headers: headers });
  }

}
