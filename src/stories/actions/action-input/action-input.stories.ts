// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { ActionInputComponent } from './action-input.component';
import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {Story, Meta} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "../../pipes/translate/translate.pipe";
import {TranslateService} from "../../pipes/translate/translate.service";
import {PopoverInputDirective} from "../../directive/bubble-input/popover-input.directive";
import {ActionInput} from "./action-input.interface";

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Design System/Atoms/Action/InputAction',
  component: ActionInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [PopoverInputDirective, TranslatePipe, TranslateService, ],
      imports: [CommonModule, ReactiveFormsModule],
    }),
    /*componentWrapperDecorator<ButtonContinueComponent>((story) => `<div class="container" style="height: 200px">${story}</div>`),*/
  ],
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
} as Meta;

const password_CheckList: ActionInput[] = [];
password_CheckList.push({
  "conditionName": "minLengthValid",
  "presentingMessage": ' A minimum of 8 characters',
  "isFulfilled": true,
});
password_CheckList.push({
  "conditionName": "requiresUppercaseValid",
  "presentingMessage": ' At least 1 Uppercase letters',
  "isFulfilled": false,
})
password_CheckList.push({
  "conditionName": "requiresLowercaseValid",
  "presentingMessage": ' At least 1 lowercase letters',
  "isFulfilled": true,
})
password_CheckList.push({
  "conditionName": "requiresDigitValid",
  "presentingMessage": ' A number',
  "isFulfilled": false
})
password_CheckList.push({
  "conditionName": "requiresSpecialCharsValid",
  "presentingMessage": ' At least 1 special character',
  "isFulfilled": true
})
password_CheckList.push({
  "conditionName": "no2AdjacentIdenticalCharsValid",
  "presentingMessage": " characters",
  "isFulfilled": true
})
password_CheckList.push({
  "conditionName": "requiresEnglishLettersOnlyValid",
  "presentingMessage": " characters",
  "isFulfilled": true
})

const phone_CheckList: ActionInput[] = [];
phone_CheckList.push({
  "conditionName": "requiresEmailValid",
  "presentingMessage": ' A well-formed email address',
  "isFulfilled": false
})

const email_CheckList: ActionInput[] = [];
email_CheckList.push({
  "conditionName": "requiresPhoneValid",
  "presentingMessage": ' A well-formed phone number',
  "isFulfilled": false
})


// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ActionInputComponent> = (args: ActionInputComponent) => ({
  props: args,
});

const Template2: Story<ActionInputComponent> = (args: ActionInputComponent) => ({
  props: args,
  /*template: '<storybook-button-tadiran ></storybook-button-tadiran>',*/

});



export const Default = Template2.bind({});
Default.args = {
  //gallery: true,
};

export const PasswordInputAction = Template2.bind({});
PasswordInputAction.args = {
  actionInputs: password_CheckList,
  actionHeader: 'The password must contain:'
};

export const PhoneInputAction = Template2.bind({});
PhoneInputAction.args = {
  actionInputs: phone_CheckList,
  actionHeader: 'Must contain phone:'
};

export const EmailInputAction = Template2.bind({});
EmailInputAction.args = {
  actionInputs: email_CheckList,
  actionHeader: 'Must contain email:'
};
