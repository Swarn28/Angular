import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutScriptComponent } from './about-script.component';

describe('AboutScriptComponent', () => {
  let component: AboutScriptComponent;
  let fixture: ComponentFixture<AboutScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutScriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
