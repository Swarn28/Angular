import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDeEnergizationTaskComponent } from './meter-de-energization-task.component';

describe('MeterDeEnergizationTaskComponent', () => {
  let component: MeterDeEnergizationTaskComponent;
  let fixture: ComponentFixture<MeterDeEnergizationTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeterDeEnergizationTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeterDeEnergizationTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
