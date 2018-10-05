import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTanentComponent } from './edit-tanent.component';

describe('EditTanentComponent', () => {
  let component: EditTanentComponent;
  let fixture: ComponentFixture<EditTanentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTanentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
