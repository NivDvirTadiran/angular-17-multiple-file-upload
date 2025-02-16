import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'storybook-button-pass-hide',
  templateUrl: './button-pass-hide.component.html',
  styleUrls: ['./button-pass-hide.component.scss']
})
export class ButtonPassHideComponent {
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
   * Optional click handler
   */
  @Output()
  onStateChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  state: string = 'hide';

  changeStae() {
    this.state = (this.state == 'show' ? 'hide' : 'show')
    this.onStateChange.emit(this.state);
  }

  /**
   * Optional click handler
   */
  @Output()
  onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-button-pass-hide--primary' : 'storybook-button-pass-hide--secondary';

    return ['storybook-button-pass-hide', `storybook-button-pass-hide--${this.state}`, mode];
  }


  constructor() { }

  ngOnInit(): void {
  }

}
