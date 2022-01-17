import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownPageComponent } from './drop-down-page.component';

describe('DropDownPageComponent', () => {
  let component: DropDownPageComponent;
  let fixture: ComponentFixture<DropDownPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropDownPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
