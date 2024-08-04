import { Component, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isfetching = signal(false);
  isError = signal('');
  private httpClient = inject(HttpClient);


  ngOnInit(){
    this.isfetching.set(true);
    this.httpClient.get<{places: Place[]}>('http://localhost:3000/places').subscribe({
      next: (respdata) =>{
       this.places.set(respdata.places);
      },
      complete: () =>{
        this.isfetching.set(false);
      },

      error: (error) => {
        console.log(error.message);
        this.isError.set('Something went wrong, please check console for logs.')
      }
    });


    this.httpClient.put
  }

  onSelectPlace(selectedPlace: Place){
    console.log("inside put method call.")
    this.httpClient.put('http://localhost:3000/user-places',{
      placeId: selectedPlace.id
    }).subscribe({
      next: (respData) => console.log(respData)
    });
  }

}
