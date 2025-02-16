// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import type { Meta, StoryObj } from '@storybook/angular';
import Card from './card.component';
import { StoryInputComponent } from "../../inputs/input/story-input.component";
import {componentWrapperDecorator, moduleMetadata} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import CardComponent from "./card.component";

const meta: Meta<Card> = {
  title: 'Design System/Atoms/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      declarations: [StoryInputComponent],
      imports: [CommonModule],
    }),
    componentWrapperDecorator(story => `<div id="main-login-card" class="col-md-12">${story}</div>`),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
    size: { control: 'select' },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;


const Template: (args: any) => { props: any } = (args) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: 'large',
  label: 'Button',
};


