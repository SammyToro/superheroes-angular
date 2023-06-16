import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';

@Component({
  selector: 'app-anti-hero-command-bar',
  templateUrl: './anti-hero-command-bar.component.html',
  styleUrls: ['./anti-hero-command-bar.component.sass']
})
export class AntiHeroCommandBarComponent implements OnInit {
  ngOnInit(): void {

  };
  constructor() {};
  @Output()
  action = new EventEmitter<CommandBarActions>()

  emitAction(action: CommandBarActions){
    this.action.emit(action);
  }
}
