import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';
import { LoginService } from 'src/app/services/authentication/login/login.service';
import { Router } from '@angular/router';
import { LoginRetorno } from 'src/app/interfaces/login.model';
import { Users } from 'src/app/interfaces/users.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  isSubmited = false;
  
  constructor(private formBuilder : FormBuilder,
              private loginService : LoginService,
              private router : Router,
              private notificationService: PoNotificationService) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.getIsLogged();
    console.log("ok")
  }

  getIsLogged() {
    this.loginService.getIsLogged$.subscribe((data) => {
      if(data) {
        this.router.navigate(['./ordem-servico/ordem-servico.module']);
      }
    })
  }

  criarFormulario() {
    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  efetuarLogin() {

    console.log(this.loginForm)
    if(this.loginForm.invalid) {
      return;
    }

  
    this.loginService.login(this.loginForm.value).subscribe((data : LoginRetorno) => {
      const jwtToken = `Bearer ${data.token}`;
      sessionStorage.setItem('token', jwtToken);

      const userInformation : LoginRetorno = data;
      sessionStorage.setItem('user', JSON.stringify(userInformation));

      this.loginService.setUserInformation$(userInformation);

      this.loginService.setIsLogged$(true);

      console.log("logado")
    }, (error) => {
      this.tratarErro(error);
      this.loginService.setIsLogged$(false);
      this.notificationService.error('Acesso Negado!');
    });
  }

  tratarErro(error){

    this.loading = false;
    this.isSubmited = false;

    if(error.status == 404){
      this.notificationService.error('Email não cadastrado!');
      return;
    
    } else if(error.status == 401){
      this.notificationService.error('Senha Inválida!');
      return;
    
    } else {
      console.log("Erro nao esperado ao logar: "+ error);
      this.notificationService.error('Ocorreu um erro não esperado. Por favor contate o suporte.');
    }
   
  }
}
