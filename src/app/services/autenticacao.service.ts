import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
//import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})

export class AutenticacaoService {
  public useruid;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }  
     usuarioFR;
  metodo_criar(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  metodo_logar(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
          console.log(this.angularFireAuth.idToken)
    }
    )
  }

  metodo_sair() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        console.log(this.angularFireAuth.currentUser)
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("Sair");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.angularFireAuth.user
  }

}