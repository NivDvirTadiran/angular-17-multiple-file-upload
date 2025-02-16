import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ButtonLanguageComponent} from "../buttons/button-language/button-language.component";
import {ButtonGlobeComponent} from "../buttons/button-globe/button-globe.component";
import Background1Component from "../../stories/backgrounds/background1/background1Component";
import {ButtonTadiranComponent} from "../buttons/button-tadiran/button-tadiran.component";
import CardComponent from "../cards/card/card.component";
import LoginFormComponent from "../forms/login-form/login-form.component";
import {ButtonContinueComponent} from "../buttons/button-continue/button-continue.component";
import {StoryInputComponent} from "../inputs/input/story-input.component";
import {Spinner1Component} from "../spinners/spinner1/spinner1.component";
import {TranslatePipe} from "../pipes/translate/translate.pipe";
import {TranslateService, TRANSLATION_PROVIDERS} from "../pipes/translate/translate.service";
import {PopoverInputDirective} from "../directive/bubble-input/popover-input.directive";
import {ButtonPassHideComponent} from "../buttons/button-pass-hide/button-pass-hide.component";
import {PopoverLanguageDirective} from "../directive/bubble-language/popover-language.directive";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ActionLanguageComponent} from "../actions/action-language/action-language.component";
import {BubbleInputComponent} from "../directive/bubble-input/bubble-input.component";
import {BubbleLanguageComponent} from "../directive/bubble-language/bubble-language.component";
import {ActionInputComponent} from "../actions/action-input/action-input.component";







@NgModule({
  declarations: [
    ButtonGlobeComponent, Background1Component, ButtonTadiranComponent, ButtonLanguageComponent,
    CardComponent,
    LoginFormComponent, LoginFormComponent,
    ButtonContinueComponent,
    StoryInputComponent,
    TranslatePipe,
    ActionInputComponent, ActionLanguageComponent,
    BubbleInputComponent, BubbleLanguageComponent,

    Spinner1Component,
    TranslateService, PopoverInputDirective, ButtonPassHideComponent, PopoverLanguageDirective

  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [ TRANSLATION_PROVIDERS, TranslateService
  ],
  exports: [
    ButtonGlobeComponent, Background1Component, ButtonTadiranComponent, ButtonLanguageComponent,
    CardComponent,
    LoginFormComponent, LoginFormComponent,
    ButtonContinueComponent,
    StoryInputComponent,
    CommonModule,
    FormsModule, ReactiveFormsModule,
    TranslatePipe,
    Spinner1Component,
    TranslateService,
    MatDialogModule,
    MatButtonModule,
    ActionInputComponent, ActionLanguageComponent,
    BubbleInputComponent, BubbleLanguageComponent

  ],
  bootstrap: []
})
export class StorybookModule { }
