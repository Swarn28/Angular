import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  onSubmit() {
    // Handle sign-in logic
    if(this.username === 'admin' && this.password === 'admin'){
      this.loginDone.emit(true);
    }
    else{
        this.isWrongPassword=true;
    }
    // You can add API calls here to authenticate the user
  }

  forgotPassword() {
    alert('Forgot Password clicked!');
  }

  signup() {
    alert('Redirecting to Sign Up...');
  }
}
