import Background1Component from "../../../../stories/pages/background1/background1Component";
import {Meta, moduleMetadata, Story} from "@storybook/angular";
import {ButtonGlobeComponent} from "../../../../stories/buttons/button-globe/button-globe.component";
import {ButtonLanguageComponent} from "../../../../stories/buttons/button-language/button-language.component";
import {ButtonTadiranComponent} from "../../../../stories/buttons/button-tadiran/button-tadiran.component";
import {CommonModule} from "@angular/common";
import {TranslateService} from "./translate.service";
import {action} from "@storybook/addon-actions";
import {RememberLangComponent} from "src/app/_services/remember-lang.component";


export default {
  title: 'Design System/Atoms/Translate',
  component: TranslateService,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      declarations: [TranslateService],
      imports: [CommonModule],
    }),
  ],
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;


export const actionsData = {
  onPinInput: action('setLang'),
  onArchiveInput: action('getLang'),
};


const Template: Story<TranslateService> = (args: TranslateService) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {

};

