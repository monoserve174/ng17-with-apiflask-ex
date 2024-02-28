import { Injectable } from '@angular/core';

const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // 登出清除所有的 storage
  singOut() {
    // 登出時清除所有的 storage
    localStorage.clear();
    sessionStorage.clear();
  }

  saveToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(refreshTokenKey, refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem(accessTokenKey);
  }

}
