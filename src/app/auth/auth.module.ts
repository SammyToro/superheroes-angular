import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { authReducer } from './state/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any>{
  return localStorageSync({keys: ['token']})(reducer);
}

const metaReducers: Array<MetaReducer<any,any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [
    AuthFormComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    AuthRoutingModule,
    StoreModule.forFeature('authState',authReducer,{metaReducers}),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule { }
