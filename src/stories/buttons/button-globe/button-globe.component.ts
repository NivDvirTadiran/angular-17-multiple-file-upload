import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'storybook-button-globe',
  templateUrl: './button-globe.component.html',
  styleUrls: ['./button-globe.component.css']
})
export class ButtonGlobeComponent {
  /**
   * Is this the principal call to action on the login-main?
   */
  @Input()
  primary = false;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  @Input()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'accGateButton2';

  /**
   * Optional click handler
   */
  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-button-tadiran--primary' : 'storybook-button-tadiran--secondary';

    return ['storybook-button-tadiran', `storybook-tadiran-icon--${this.size}`, mode];
  }


  constructor() { }

  ngOnInit(): void {
  }

}
