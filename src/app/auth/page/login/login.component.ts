import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { selectError } from '../../state/auth.selectors';
import { Subscription } from 'rxjs';
import { AuthActions } from '../../state/auth.actions';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit{

  error$ = this.store.select(selectError());

  constructor(private authService: AuthenticateService,
              private router: Router,
              private store: Store,
              private _snackBar: MatSnackBar){
    this.checkJWT();
    this.getError();
  }

  ngOnInit(): void {

  }
;

  submit(data: User){
    this.store.dispatch({type: AuthActions.LOGIN,payload: data});
  }

  checkJWT() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/anti-heroes'])
    }
  }

  getError(){
    this.error$.subscribe(data => {
      if(data){
        this._snackBar.open(data.message,"Error");
      }
    })
  }
}
