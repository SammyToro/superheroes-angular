import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AntiHeroService } from "../services/anti-hero.services";
import { AntiHeroActions } from "./anti-hero.actions";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { AntiHero } from "../models/anti-hero.interface";

@Injectable()
export class AntiHeroEffects{

  constructor(
    private actions$: Actions,
    private antiHeroService: AntiHeroService,
    private router: Router
  ){}

  // get list of anti heroes in the external API
  // set retrieved anti hero list in the state
  getAntiHeroes$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AntiHeroActions.GET_ANTI_HERO_LIST),
        mergeMap(() => this.antiHeroService.getAntiHeroes()
          .pipe(
            map(antiHeroes => ({ type: AntiHeroActions.SET_ANTI_HERO_LIST, antiHeroes })),
            catchError(() => EMPTY)
          ))
        )
    }, {dispatch: true}
  );

  //Delete an Anti-Hero
  removeAntiHero$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AntiHeroActions.REMOVE_ANTI_HERO_API),
        mergeMap((data : {payload: string}) =>
          this.antiHeroService.deleteAntiHero(data.payload)
          .pipe(
            map(() => ({type: AntiHeroActions.REMOVE_ANTI_HERO_STATE,antiHeroId: data.payload})),
            catchError(() => EMPTY)
          )
        )
    );
  });

  //Add Anti-Hero to the database
  addAntiHero$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(AntiHeroActions.REMOVE_ANTI_HERO_API),
        mergeMap((data: {type: string, payload: AntiHero}) =>
          this.antiHeroService.addAntiHero(data.payload).pipe(
            map(antiHeroes => ({
              type: AntiHeroActions.ADD_ANTI_HERO_STATE,
              antiHero: data.payload
            })),
            tap(
              () => this.router.navigate(["anti-heroes"])
            ),
            catchError(() => EMPTY)
          )
        )
    );
  });

  //modify anti-heroes in the database
  modifyAntiHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AntiHeroActions.MODIFY_ANTI_HERO_API),
      mergeMap((data: {type: string, payload: AntiHero}) =>
        this.antiHeroService.updateAntiHero(data.payload.id,data.payload).pipe(
          map(antiHeroes => ({
            type: AntiHeroActions.MODIFY_ANTI_HERO_STATE,
            antiHero: data.payload
          })),
          tap(
            () => this.router.navigate(["anti-heroes"])
          ),
          catchError(() => EMPTY)
        )
      )
    );
  },{dispatch: true});
}
