import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestXmlsComponent } from './view-request-xmls.component';

describe('ViewRequestXmlsComponent', () => {
  let component: ViewRequestXmlsComponent;
  let fixture: ComponentFixture<ViewRequestXmlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRequestXmlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRequestXmlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
