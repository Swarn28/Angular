import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type User } from './userDetail.model';

/* type User = {
  userid:string;
  avaterimg:string;
  name:string;
} */

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  @Input({required: true}) user!: User;
  @Output() select = new EventEmitter();

  onUserClick(){
    console.log("Clieked inside user-detail component... " +this.user.name);
    this.select.emit(this.user.id);

  }

  get imagePath(){
    return '../../assets/users/' + this.user.avatar ;
  }

}
