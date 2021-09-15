import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {


  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  brunaferraz;

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Email Obrigatorio.' 
      },
      { 
        type: 'pattern', 
        message: 'Email Invalido.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Senha Obrigatoria.' 
      },
      { 
        type: 'minlength', 
        message: 'Minimo 6 caracteres.' 
      }
    ]
  };

  constructor(
    private router: Router,
    private ionicAuthService: AutenticacaoService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  metodo_de_login(value) {
    this.ionicAuthService.metodo_logar(value)
      .then((response) => {
         this.brunaferraz = response
        console.log(this.brunaferraz)
        this.errorMsg = "";
        this.router.navigateByUrl('home');
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }
  metodo_de_cadastro() {
    this.router.navigateByUrl('cadastrar');
  }


}
