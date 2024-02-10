import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterPanelDetailComponent } from './converter-panel-detail.component';

describe('ConverterPanelDetailComponent', () => {
  let component: ConverterPanelDetailComponent;
  let fixture: ComponentFixture<ConverterPanelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverterPanelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterPanelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
