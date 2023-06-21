import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AntiHero } from '../../models/anti-hero.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-anti-hero-form',
  templateUrl: './anti-hero-form.component.html',
  styleUrls: ['./anti-hero-form.component.sass']
})
export class AntiHeroFormComponent implements OnInit{

  @Input()
  selectedId = "";

  @Input()
  actionButtonLabel: string = 'Create';

  @Output()
  action = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      house: [''],
      knownAs:['']
    })
  }

  ngOnInit(): void {
    this.checkAction();
  }

  checkAction(){
    if(this.selectedId){
      this.actionButtonLabel  = "Update";
      this.patchDataValues();
    }
  }

  patchDataValues(){
    //Implemented in the future
  }

  emitAction(){
    this.action.emit({value: this.form.value, action: this.actionButtonLabel})
  }

  clear(){
    this.form.reset();
  }

}
