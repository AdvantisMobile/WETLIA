import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RContrasenaPage } from './rcontrasena.page';

describe('RContrasenaPage', () => {
  let component: RContrasenaPage;
  let fixture: ComponentFixture<RContrasenaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RContrasenaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
