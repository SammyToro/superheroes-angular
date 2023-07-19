import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { User } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectError } from '../../state/auth.selectors';
import { AuthActions } from '../../state/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  error$ = this.store.select(selectError());

  constructor(private authService: AuthenticateService,
              private router: Router,
              private store: Store,
              private _snackBar: MatSnackBar){
                this.getError();
  };

  submit(data: User){
    this.store.dispatch({type: AuthActions.CREATE_USER,payload: data});
  }

  getError(){
    this.error$.subscribe(data => {
      if(data){
        this._snackBar.open(data.message,"Error");
      }
    })
  }
}
