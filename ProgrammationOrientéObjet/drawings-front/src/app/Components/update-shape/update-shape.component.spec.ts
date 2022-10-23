import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShapeComponent } from './update-shape.component';

describe('UpdateComponent', () => {
  let component: UpdateShapeComponent;
  let fixture: ComponentFixture<UpdateShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateShapeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
