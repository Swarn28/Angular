import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { DUMMY_USERS } from './dummy-users';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, UserComponent, UserDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'first-angular-app';

  users = DUMMY_USERS;

  onUserSelected(id:string){
    console.log("User selected is having user id: " +id);
  }

}
