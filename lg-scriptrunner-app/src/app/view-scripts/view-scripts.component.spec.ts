import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScriptsComponent } from './view-scripts.component';

describe('ViewScriptsComponent', () => {
  let component: ViewScriptsComponent;
  let fixture: ComponentFixture<ViewScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewScriptsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
