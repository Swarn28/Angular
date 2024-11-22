import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDevProfileComponent } from './selected-dev-profile.component';

describe('SelectedDevProfileComponent', () => {
  let component: SelectedDevProfileComponent;
  let fixture: ComponentFixture<SelectedDevProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedDevProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedDevProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
