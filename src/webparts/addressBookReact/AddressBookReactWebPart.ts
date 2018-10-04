import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AddressBookReactWebPartStrings';
import RootComponent, { IRootComponentProps } from './components/RootComponent/RootComponent';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IAddressBookReactWebPartProps {
  description: string;
}

export default class AddressBookReactWebPart extends BaseClientSideWebPart<IAddressBookReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRootComponentProps> = React.createElement(
      RootComponent,
      {
        description: this.properties.description,
        context: this.context
      }
    );
    ReactDom.render(element, this.domElement);
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
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
