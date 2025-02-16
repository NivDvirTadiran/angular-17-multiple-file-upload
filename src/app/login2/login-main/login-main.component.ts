import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {StoryInput} from "../../../stories/inputs/input/story-input.model";
import {AuthService} from "../../_services/auth.service";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../_services/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {Subscription} from "rxjs";
import {AppConfig} from "../../app.config";



export interface DialogData {
  username: string;
  password: string;
}



@Component({
  selector: 'login-main',
  templateUrl: './login-main.component.html',
  styleUrls: ['./login-main.component.scss'],
})
export class LoginMainComponent implements OnInit, OnDestroy {

  public isLoggedIn = false;
  isLoginFailed = false;
  loginErrorMessage = '';
  roles: string[] = [];
  public isLoading = false;
  eventBusSubLoginMain?: Subscription;





  /**
   * Is this the principal call to action on the login-main?
   */
  storyInputsInOrder: StoryInput[]  = [
    { /*...mStoryInput.Default.args?.['storyInput'],*/ id: '2', title: 'username', state: 'USER NAME', icon: './stories/assets/images/User2ldpi.png', type: 'text', placeholder: 'Ex.Saul Ramirez' , hide: false },
    { /*...mStoryInput.Default.args?.['storyInput'],*/ id: '3', title: 'password', state: 'PASSWORD', icon: './stories/assets/images/LockIcon2ldpi.png', type: 'password', placeholder: 'your_password', hide: false   },
  ];

  /**
   * Is this the principal call to action on the login-main?
   */
  @Input()
  primary = true;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;


  /**
   * What background color to use
   */
  @Input()
  background?: string;

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Login2Component';


  loginForm: FormGroup;

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-page2--primary' : 'storybook-page2--secondary';

    return ['storybook-page2', mode];
  }

  @ViewChild('formHeader', { static: false }) mainHeader?: ElementRef;


  constructor(private renderer: Renderer2,
              public authService: AuthService,
              public userService: UserService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.minLength(2)),
      password: new FormControl('', Validators.minLength(2)),
    });

  }


  public ACC_VERSION: string = 'ACC_VERSION';

  ngOnInit(): void {

    this.userService.getAccVersion().subscribe(
      data => { this.ACC_VERSION = data; AppConfig.webAppVersion = data; },
      err => { this.ACC_VERSION = JSON.parse(err.error).message; }
    );

  };


  get getUsernameCurrentFieldValue(): AbstractControl {
    return this.loginForm.get('username')?.value;
  }

  private setUsernameCurrentFieldValue(name: string) {
    this.loginForm.get('username')?.setValue(name);
  }

  get getPasswordCurrentFieldValue(): AbstractControl {
    return this.loginForm.get('password')?.value;
  }

  private setPasswordCurrentFieldValue(pass: string) {
    this.loginForm.get('password')?.setValue(pass);
  }


  onSubmit(): void {
    console.warn('Login Request from login-main!');
    const { username, password } = this.loginForm.value;

    this.isLoading = true;
    this.authService.login(username, password).subscribe(
        (data: { accessToken: any; refreshToken: any; }) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.profile2();
      },
        (err: { error: { message: string; }; }) => {
        switch (err.error.message) {
          case "Error: A registry process should be made!":
            //this.openRegisterForm().then(() => {this.openReplacePassword()});
            //toPromise((data) => {this.openReplacePassword()});
            break;
          case "User credentials have expired":
            break;
          default:
            this.loginErrorMessage = err.error.message;
        }

        this.isLoginFailed = true;
        this.isLoading = false;
      },
      () => { this.isLoading = false; })
  }

  reloadPage(): void {
    this.router.navigate(['/login-main']).then(() => {window.location.reload()});
  }

  profile2(): void {
    this.router.navigate(['../profile2'], {relativeTo: this.activatedRoute});
  }


  changLanguage(event: Event) {
    //
  }


  ngOnDestroy(): void {
    if (this.eventBusSubLoginMain)
      this.eventBusSubLoginMain.unsubscribe();
  }

}

