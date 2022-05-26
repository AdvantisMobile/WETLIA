import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewcontrasenaPage } from './newcontrasena.page';

describe('NewcontrasenaPage', () => {
  let component: NewcontrasenaPage;
  let fixture: ComponentFixture<NewcontrasenaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcontrasenaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewcontrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
