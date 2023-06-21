import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { AntiHeroFormComponent } from './components/anti-hero-form/anti-hero-form.component';
import { AntiHeroListComponent } from './components/anti-hero-list/anti-hero-list.component';
import { AntiHeroRoutingModule } from './anti-hero-routing.module';
import { MaterialModule } from '../material/material.module';
import { AntiHeroCommandBarComponent } from './components/anti-hero-command-bar/anti-hero-command-bar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AntiHeroFormComponent,
    AntiHeroListComponent,
    ListComponent,
    FormComponent,
    AntiHeroCommandBarComponent
  ],
  imports: [
    CommonModule,
    AntiHeroRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AntiHeroModule { }
