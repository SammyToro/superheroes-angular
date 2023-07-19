import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AntiHero } from '../../models/anti-hero.interface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AntiHeroActions } from '../../state/anti-hero.actions';
import { Observable } from 'rxjs';
import { selectAntiHero } from '../../state/anti-hero.selectors';
import { CanComponentDeactivate } from 'src/app/core/guards/form.guard';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit,CanComponentDeactivate {
  antiHero$: Observable<AntiHero | undefined>;
  antiHero: AntiHero | null = null;
  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>){
      const id = this.router.snapshot.params['id'];
      this.antiHero$ = this.store.select(selectAntiHero(id));
      this.antiHero$.subscribe(
        data => {
          if(data) this.antiHero = data;
        }
      )

  }
  ngOnInit(): void {
    // this.id = this.router.snapshot.params['id'];
  }

  formAction(data: {value: AntiHero, action: string}){
    switch(data.action){
      case "Create": {
        this.store.dispatch({type: AntiHeroActions.ADD_ANTI_HERO_API,payload: data.value});
        return;
      }
      case "Update": {
        this.store.dispatch({type: AntiHeroActions.MODIFY_ANTI_HERO_API,payload: data.value});
        return;
      }
      default: ""
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const confirmation = window.confirm('Are you sure ?');
    return confirmation;
  }

}
