import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDateComponent } from './demande-date.component';

describe('DemandeDateComponent', () => {
  let component: DemandeDateComponent;
  let fixture: ComponentFixture<DemandeDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
