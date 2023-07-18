import { Component } from '@angular/core';
import { AuthenticateService } from './core/services/authenticate.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'superheroes';
  url: string  = "";

  constructor(private authService: AuthenticateService, private router: Router){
    this.getRoute();
  }

  submit(action: string){
    switch(action){
      case 'logout':
        this.authService.doLogout();
        break;
      default:
          break;
    }
  }

  getRoute(){
    this.router.events.subscribe(data => {
      if(data instanceof NavigationEnd){
        this.url = data.url;
      }
    })
  }
}
