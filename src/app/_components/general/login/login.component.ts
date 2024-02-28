import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../_shared/shared.module';
import { LoginFrom } from './view-models';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form: LoginFrom | undefined | null;
  errorMessage: string | undefined | null;

  constructor(
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.resetInit();
  }

  // 重新初始化頁面
  resetInit() {
    this.form = new LoginFrom();
    this.errorMessage = '';
  }

  // 登入
  submitLogin() {
    if (!this.verifyLogin()) {
      console.log(this.errorMessage);
      return;
    }

    this.authService.getToken(this.form!.username, this.form!.password).subscribe(
      (res) => {
        console.log(`登入成功: ${res}`);
      },
      (err) => {
        console.log(`登入失敗: ${err}`);
      }
    );


  }

  // 驗證登入資料
  verifyLogin() {
    this.errorMessage = '帳號或密碼錯誤';

    // 帳號規則如下
    // 1. 長度 4 - 128 個字元
    // 2. 允許小寫字母、數字、底線，且不允許底線開頭
    // 3. 大寫字母自動轉換為小寫字母

    let username = this.form?.username;
    if (!username) {return false;}
    username = username.toLowerCase();
    if (username.length < 4 || username.length > 128) {return false;}
    else if (username[0] === '_') {return false;}
    else if (!/^[a-z0-9_]+$/.test(username)) {return false;}

    // 密碼規則如下
    // 1. 長度 4 - 128 個字元
    // 2. 允許大小寫字母、數字、特殊符號

    let password = this.form?.password;
    if (!password) {return false;}
    else if (password.length < 4 || password.length > 128) {return false;}
    else if (!/^[a-zA-Z0-9!@#$%^&*()_+]+$/.test(password)) {return false;}
    this.errorMessage = '';

    return true;
  }

}
