import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared/shared.services';
import { UserType } from '../shared/UserTypeEnum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  @Output() loginDone = new EventEmitter<boolean>;

  isWrongPassword:boolean= false;

  constructor(private sharedService: SharedService){}

  onSubmit() {
    // Handle sign-in logic
    this.login();
    // You can add API calls here to authenticate the user
  }

  private login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.loginDone.emit(true);
      this.sharedService.setCurrentUserType(UserType.ADMIN);
    }
    else if (this.username === 'user' && this.password === 'user1') {
      this.loginDone.emit(true);
      this.sharedService.setCurrentUserType(UserType.USER);

    }
    else {
      this.isWrongPassword = true;
    }
  }

  forgotPassword() {
    alert('Forgot Password clicked!');
  }

  signup() {
    alert('Redirecting to Sign Up...');
  }
}
