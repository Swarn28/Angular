import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterInstallationTaskComponent } from './meter-installation-task.component';

describe('MeterInstallationTaskComponent', () => {
  let component: MeterInstallationTaskComponent;
  let fixture: ComponentFixture<MeterInstallationTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeterInstallationTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeterInstallationTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
