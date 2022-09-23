import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShapeComponent } from './add-shape.component';

describe('AddShapeComponent', () => {
  let component: AddShapeComponent;
  let fixture: ComponentFixture<AddShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
