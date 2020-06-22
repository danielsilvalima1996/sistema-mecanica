import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoLoadingModule, PoButtonModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        PoPageModule,
        PoFieldModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        PoButtonModule,
        PoLoadingModule
    ]
})
export class LoginModule { }
