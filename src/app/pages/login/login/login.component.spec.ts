import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title 'I love pizza!'`, () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('I love login!');
  });

  // it('should login successfully when valid credentials are provided', () => {
  //   const credentials = { username: 'validUser', password: 'validPassword' };
  //   const expectedResponse = { User: 'validUser', token: 'validToken' };
  //   spyOn(authService, 'login$').and.returnValue(of(expectedResponse));
  //   component.onSubmit(credentials);
  //   expect(authService.login$).toHaveBeenCalledWith(credentials);
  //   expect(router.navigate).toHaveBeenCalledWith(['/home']);
  // });
});
