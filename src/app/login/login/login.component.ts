import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';

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
              private notificationService: PoNotificationService) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  efetuarLogin() {
    console.log("foi")
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
