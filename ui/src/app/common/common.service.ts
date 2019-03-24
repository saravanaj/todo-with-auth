import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EventEmitter } from '@angular/core';

@Injectable()
export class CommonService {

    constructor(private http: HttpClient) { 
        
    }

    public loginChangeEmitter = new EventEmitter<{ isAuthenticated: boolean, username: string }>();

    get(path: string) {
        return this.http.get(`${environment.apiUrl}${path}`);
    }

    post(path: string, payload: any) {
        return this.http.post(`${environment.apiUrl}${path}`, payload);
    }

    put(path: string, payload: any) {
        return this.http.put(`${environment.apiUrl}${path}`, payload);
    }

    del(path: string) {
        return this.http.delete(`${environment.apiUrl}${path}`);
    }

    setToken(token, userName) {
        sessionStorage.setItem("bearerToken", token || '');
        sessionStorage.setItem("username", userName || '');
        if (token) {
            this.loginChangeEmitter.emit({
                isAuthenticated: true,
                username: userName
            });
        }
    }

    clearToken() {
        sessionStorage.setItem("bearerToken", '');
        this.loginChangeEmitter.emit({
            isAuthenticated: false,
            username: ''
        });
    }

    getToken() {
        return sessionStorage.getItem("bearerToken");
    }

    checkToken() {
        if(sessionStorage.getItem('bearerToken')) {
            this.setToken(sessionStorage.getItem('bearerToken'), sessionStorage.getItem('username'));
        }
    }
}