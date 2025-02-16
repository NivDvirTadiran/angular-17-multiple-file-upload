// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {Story, Meta, moduleMetadata, componentWrapperDecorator} from '@storybook/angular';
import {action} from "@storybook/addon-actions";
import {StoryInputComponent} from "./story-input.component";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import PassStrengthComponent from "src/stories/pass-strength/pass-strength.component";
import {TranslateService} from "../../../app/storybook/pipes/translate/translate.service";
import {TranslatePipe} from "../../../app/storybook/pipes/translate/translate.pipe";
import {ButtonPassHideComponent} from "../../buttons/button-pass-hide/button-pass-hide.component";
import * as EditSaveButton from "../../buttons/button-edit-save/button-edit-save.stories";

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Design System/Atoms/Inputs/StoryInput',
  component: StoryInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [ StoryInputComponent, PassStrengthComponent, TranslatePipe,
        TranslateService, ButtonPassHideComponent  ],
      imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    }),
    componentWrapperDecorator(story => `<div style="margin: 3em">${story}</div>`),
  ],
  argTypes: {
    direction: {control: { type: 'radio' }},
  },
  excludeStories: /.*Data$/,
} as Meta;

export const actionsData = {
  onPinInput: action('onPinInput'),
  onArchiveInput: action('onArchiveInput'),
};

const Template: Story = args => ({
  props: {
    ...args,
    onStateChange: EditSaveButton.actionsData.onStateChange,
    onClick: EditSaveButton.actionsData.onClick,

  },
});



export const Default = Template.bind({});
Default.args = {
  storyInput: {
    id: '1',
    title: 'Ex.Saul Ramirez',
    state: 'USER NAME',
    icon: './assets/images/User2ldpi.png',
    type: 'text',
    placeholder: 'placeholder',
    hide: false
  },
  /*currentForm: {
    username: new FormControl('ea6', Validators.minLength(2)),
    password: new FormControl('', []),
  },*/
  hideInput: false,
  direction: 'rtl',


};

export const Username = Template.bind({});
Username.args = {
  ...Default.args,
  storyInput: {
    id: '2',
    title: 'username',
    state: 'USER NAME',
    icon: './assets/images/User2ldpi.png',
    type: 'text',
    placeholder: 'Ex.Saul Ramirez',
    hide: false
  },
  currentForm: {
    ...Default.args['currentForm'],
    password: new FormControl('ea6', Validators.minLength(2)),
  },
  direction: 'rtl',
};

export const Password = Template.bind({});
Password.args = {
  storyInput: {
    id: '3',
    title: 'password',
    state: 'PASSWORD',
    icon: './assets/images/LockIcon2ldpi.png',
    type: 'password',
    placeholder: 'your_password',
    hide: false
  },
};

export const NewPassword = Template.bind({});
NewPassword.args = {
  ...Default.args,
  storyInput: {
    id: '6',
    title: 'password',
    state: 'NEW PASSWORD',
    icon: './assets/images/LockIcon2ldpi.png',
    type: 'password',
    placeholder: 'your_password',
    hide: false
  },
};

export const Email = Template.bind({});
Email.args = {
  storyInput: {
    id: '4',
    title: 'email',
    state: 'EMAIL',
    icon: './assets/images/AtSign3ldpi.png',
    type: 'email',
    placeholder: 'Ex: abc@example.com',
    hide: false
  },
};
export const Phone = Template.bind({});
Phone.args = {
  storyInput: {
    id: '5',
    title: 'phone',
    state: 'PHONE NUMBER FOR AUTHENTICATION',
    icon: './assets/images/Phone3ldpi.png',
    type: 'tel',
    placeholder: 'Ex: +972547762084',
    hide: false
  },
  hideInput: true,
};


