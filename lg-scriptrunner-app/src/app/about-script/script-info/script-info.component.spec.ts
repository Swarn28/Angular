import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptInfoComponent } from './script-info.component';

describe('ScriptInfoComponent', () => {
  let component: ScriptInfoComponent;
  let fixture: ComponentFixture<ScriptInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScriptInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScriptInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
