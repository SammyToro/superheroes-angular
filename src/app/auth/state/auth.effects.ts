import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, of, mergeMap, tap } from "rxjs";
import { AuthActions } from "./auth.actions";
import { AuthenticateService } from "src/app/core/services/authenticate.service";
import { User } from "../models/user.interface";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects{

  constructor(private authService: AuthenticateService,
              private actions$: Actions,
              private router: Router){}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        mergeMap((data : {type: string, payload: User}) =>
          this.authService.login(data.payload).pipe(
            map(data => ({type: AuthActions.SET_TOKEN,token: data.token})),
            tap(() => this.router.navigate(["anti-heroes"])),
            catchError(async (data) => ({type: AuthActions.AUTH_ERROR,error: data.error})))
          ),
    );
  },{dispatch: true});

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AuthActions.CREATE_USER),
        mergeMap((data: {type: string, payload: User}) =>
          this.authService.register(data.payload).pipe(
            tap(() => this.router.navigate(["login"])),
            catchError(async (data) => ({type: AuthActions.AUTH_ERROR,error:data.error})))
          ),
    );
  },{dispatch: true});
}
