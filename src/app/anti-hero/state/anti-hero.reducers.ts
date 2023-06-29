import { createReducer, on } from "@ngrx/store";
import { AntiHero } from "../models/anti-hero.interface";
import { removeAntiHeroState, setAntiHeroList } from "./anti-hero.actions";

export interface AntiHeroState {
  antiHeroes: ReadonlyArray<AntiHero>
}

export const initialState: AntiHeroState = {
  antiHeroes: []
}

export const antiHeroReducer = createReducer(
  initialState,
  on(setAntiHeroList,(state: any,{antiHeroes}: any) => {
    return {...state,antiHeroes}
  }),
  on(removeAntiHeroState,(state, {antiHeroId}) => {
    return {...state, antiHeroes: state.antiHeroes.filter(data => data.id != antiHeroId)}
  })
)
