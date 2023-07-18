import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  constructor(private authService: AuthenticateService, private router: Router){
    this.checkJWT();
  };

  submit(data: {email: string, password: string}){
    this.authService.login(data).subscribe(
      (data) => {
        this.router.navigate(['/anti-heroes']);
        localStorage.setItem('token', data.token);
      }
    )
  }

  checkJWT() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/anti-heroes'])
    }
  }
}
