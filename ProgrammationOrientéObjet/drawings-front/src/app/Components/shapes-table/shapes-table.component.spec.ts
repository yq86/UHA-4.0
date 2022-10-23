import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapesTableComponent } from './shapes-table.component';

describe('ShapesTableComponent', () => {
  let component: ShapesTableComponent;
  let fixture: ComponentFixture<ShapesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
