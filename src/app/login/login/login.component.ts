import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { Router } from '@angular/router';
import { LoginRetorno } from 'src/app/interfaces/login.model';
import { Users } from 'src/app/interfaces/users.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  isSubmited = false;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private notificationService: PoNotificationService) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.getIsLogged();
  }
  

   getIsLogged() {
     this.loginService.getIsLogged$.subscribe((data) => {
       if (data) {
         this.router.navigate(['/dashboard']);
       }
     })
   }

  criarFormulario() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  efetuarLogin() {
    this.loading = true;
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      this.notificationService.warning('Formulário Inválido. Por favor tente novamente!')
      this.loading = false;
    }

    this.loginService
      .login(this.loginForm.value)
      .subscribe((data: LoginRetorno) => {
        const jwtToken = `Bearer ${data.token}`;
        sessionStorage.setItem('token', jwtToken);

        const userInformation: LoginRetorno = data;
        sessionStorage.setItem('user', JSON.stringify(userInformation));

        this.loginService.setUserInformation$(userInformation);

        this.loginService.setIsLogged$(true);
        this.loading = false;
        console.log("logado")
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.loading = false;
      });
  }

}
