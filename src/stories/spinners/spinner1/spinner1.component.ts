import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'storybook-spinner1',
  templateUrl: './spinner1.component.html',
  styleUrls: ['./spinner1.component.css']
})
export class Spinner1Component {
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
    const mode = this.primary ? 'storybook-button-ex--primary' : 'storybook-button-ex--secondary';

    return ['storybook-button-ex', `storybook-button-ex--${this.size}`, mode];
  }


  constructor() { }

  ngOnInit(): void {
  }

}
