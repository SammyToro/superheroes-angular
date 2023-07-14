import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  constructor(private authService: AuthenticateService, private router: Router){};

  submit(data: User){
    this.authService.register(data).subscribe(
      (data) => this.router.navigate(['/'])
  )}
}
