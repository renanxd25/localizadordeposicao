import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AutenticacaoService } from '../../services/autenticacao.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})

export class CadastrarPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Email Obrigatorio!' 
      },
      { 
        type: 'pattern', 
        message: 'Email Invalido!' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Senha é Obrigatoria!' 
      },
      { 
        type: 'minlength', 
        message: 'Minimo 6 Caracteres!' 
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

  signUp(value) {
    this.ionicAuthService.metodo_criar(value)
      .then((response) => {
        this.errorMsg = "";
        this.successMsg = "Usuario Criado!";
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }

}
