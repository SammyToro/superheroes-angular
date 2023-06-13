import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AntiHero } from '../../models/anti-hero.interface';

@Component({
  selector: 'app-anti-hero-form',
  templateUrl: './anti-hero-form.component.html',
  styleUrls: ['./anti-hero-form.component.sass']
})
export class AntiHeroFormComponent implements OnInit {

  @Input()
  headers: Array<{headerName: string, fieldName: keyof AntiHero}> = [];
  @Input()
  antiHeroes: Array<AntiHero> = [];
  @Output()
  antiHero = new EventEmitter();

  constructor(){};

  ngOnInit(): void {

  }

  selectAntiHero(antiHero: AntiHero){
    this.antiHero.emit(antiHero);
  }

}
