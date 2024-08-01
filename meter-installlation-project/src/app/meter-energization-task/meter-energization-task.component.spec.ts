import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterEnergizationTaskComponent } from './meter-energization-task.component';

describe('MeterEnergizationTaskComponent', () => {
  let component: MeterEnergizationTaskComponent;
  let fixture: ComponentFixture<MeterEnergizationTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeterEnergizationTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeterEnergizationTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
