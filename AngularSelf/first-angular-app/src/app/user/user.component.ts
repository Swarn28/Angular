import { Component, computed, signal } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {


   /* If we want to access and set the user in the same component ts file.
   Here we are also using signals.  */

  //with signal use these.
  //selectedUser = signal(DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)]);
  //imagePath = computed(() => '../../assets/users/' + this.selectedUser().avatar);


// without signals
  selectedUser = DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)];


  // When we use signals we dont do this way.
  get imagePath(){
    return '../../assets/users/' + this.selectedUser.avatar;
  }

  onUserClick(){
    // (without signals)
    this.selectedUser = DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)];

    //with signals
   /*  this.selectedUser.set(DUMMY_USERS[Math.floor(Math.random() * DUMMY_USERS.length)]);
    console.log("clicked !!!"); */
  }



}
