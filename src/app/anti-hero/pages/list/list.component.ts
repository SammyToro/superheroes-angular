import { Component, OnInit } from '@angular/core';
import { AntiHero } from '../../models/anti-hero.interface';
import { Router } from '@angular/router';
import { TableActions } from '../../enums/table-actions.enum';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectAntiHeroes } from '../../state/anti-hero.selectors';
import { AntiHeroActions } from '../../state/anti-hero.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  //Sample data for anti-hero
  //

  headers: {headerName: string, fieldName: keyof AntiHero}[] = [
    {headerName: "First Name", fieldName: "firstName"},
    {headerName: "Last Name", fieldName: "lastName"},
    {headerName: "House", fieldName: "house"},
    {headerName: "Known As", fieldName: "knownAs"},
  ];

  antiHeroes$ = this.store.select(selectAntiHeroes());
  antiHeroes: ReadonlyArray<AntiHero> = [];

  constructor(
    private router: Router,
    private store: Store<AppState>
    ){};

  ngOnInit(): void {
    this.store.dispatch({type: AntiHeroActions.GET_ANTI_HERO_LIST});
    this.assignAntiHeroes();

  }

  assignAntiHeroes(){
    this.antiHeroes$.subscribe((data) => {
      this.antiHeroes = data;
    })
  }

  selectAntiHero(data: {antiHero: AntiHero, action: TableActions}){
    // this.router.navigate(['anti-heroes','form',data.antiHero.id]);
    switch(data.action){
      case TableActions.View: {
        this.router.navigate(['anti-heroes','form',data.antiHero.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: AntiHeroActions.REMOVE_ANTI_HERO_API,payload: data.antiHero.id});
        return;
      }
      default: ""
    }
  }

  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create: {
        this.router.navigate(["anti-heroes","form"]);
        return;
      }
      case CommandBarActions.DeleteAll: {
        return;
      }
      default: ""
    }
  }

}
