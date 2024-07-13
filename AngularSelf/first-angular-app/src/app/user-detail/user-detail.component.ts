import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  @Input({required: true}) userid!: string;
  @Input({required: true}) avatarImg!: string ;
  @Input({required: true}) name!: string ;
  @Output() select = new EventEmitter();

  onUserClick(){
    console.log("Clieked inside user-detail component... " +this.name);
    this.select.emit(this.userid);

  }

  get imagePath(){
    return '../../assets/users/' + this.avatarImg ;
  }

}
