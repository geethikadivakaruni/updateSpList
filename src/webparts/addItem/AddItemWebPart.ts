import * as React from 'react';
import * as ReactDom from 'react-dom';
import { sp } from "@pnp/sp/presets/all";
// import pnp, { sp, Item, ItemAddResult, ItemUpdateResult } from "sp-pnp-js";
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
// import { sp } from "@pnp/sp/presets/all";
import * as strings from 'AddItemWebPartStrings';
import AddItem from './components/AddItem';
import { IAddItemProps } from './components/IAddItemProps';
// import { spfi, SPFx } from "@pnp/sp";

export interface IAddItemWebPartProps {
  description: string;
  
}

export default class AddItemWebPart extends BaseClientSideWebPart<IAddItemWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  // protected async onInit(): Promise<void> {

  //   await super.onInit();
    
  //   // spfi().using(SPFx({pageContext: context.pageContext}));
  //   // other init code may be present
  
  //   // sp.setup(this.context);
  // }
  // protected onInit(): Promise<void> {
  //   return super.onInit().then(_ => {
  //     sp.setup({
  //       spfxContext: this.context
  //     });
  //   });
  // }

  public render(): void {
    const element: React.ReactElement<IAddItemProps> = React.createElement(
      AddItem,
      {
        description: this.properties.description,
        // webURL:this.context.pageContext.web.absoluteUrl,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }
  
//   protected async onInit(): Promise<void> {

//     await super.onInit();
//     const sp = spfi().using(SPFx(this.context));

// }
  


  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
