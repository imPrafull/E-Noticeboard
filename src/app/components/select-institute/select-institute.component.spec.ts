import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectInstituteComponent } from './select-institute.component';

describe('SelectInstituteComponent', () => {
  let component: SelectInstituteComponent;
  let fixture: ComponentFixture<SelectInstituteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectInstituteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
