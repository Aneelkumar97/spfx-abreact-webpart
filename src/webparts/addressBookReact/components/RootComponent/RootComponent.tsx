import * as React from 'react';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import styles from './RootComponent.module.scss';
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import ContactsComponent from "../ContactsComponent/ContactsComponent";
import { IContact } from '../../Models/IContact';
import DetailsComponent from "../DetailsComponent/DetailsComponent";
import AddressBookService from '../../Services/AddressBookService';
import ContactsFormComponent from "../ContactFormComponent/ContactFormComponent";
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";

export enum Component {
  Details,
  ContactForm,
  Empty
}

export interface IRootComponentState {
  activeComponent: Component;
  contact: IContact;
  contacts: IContact[];
  isDataLoaded: boolean;
}

export interface IRootComponentProps {
  description: string;
  context: WebPartContext;
}

export default class RootComponent extends React.Component<IRootComponentProps, IRootComponentState> {

  private addressbookService: AddressBookService;

  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
      activeComponent: Component.Empty,
      contact: null,
      isDataLoaded: false
    };
    this.addressbookService = new AddressBookService(this.props.context);
    this.displayContact = this.displayContact.bind(this);
    this.showAddDialog = this.showAddDialog.bind(this);
    this.showEditDialog = this.showEditDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  public componentDidMount() {
    this.loadContacts();
  }

  private loadContacts() {
    this.addressbookService.getContacts().then((response: IContact[]) => {
      this.setState({
        contacts: response,
        isDataLoaded: true
      });
    });
  }

  private displayContact(contact) {
    this.setState({
      activeComponent: Component.Details,
      contact: contact
    });
  }

  private showEditDialog(contact) {
    this.setState({
      activeComponent: Component.ContactForm,
      contact: contact
    });
  }

  private showAddDialog() {
    this.setState({
      activeComponent: Component.ContactForm,
      contact: null
    });
  }

  private closeDialog() {
    this.setState({
      activeComponent: Component.Empty,
      contact: null
    });
    this.loadContacts();
  }

  private returnCurrentComponent() {
    const { activeComponent, contact } = this.state;
    switch (activeComponent) {
      case Component.Details:
        return <DetailsComponent
          onDeleteClick={this.deleteContact}
          onEditClick={this.showEditDialog}
          contact={contact} />;
      case Component.ContactForm:
        return <ContactsFormComponent
          closeDialog={this.closeDialog}
          contact={contact}
          service={this.addressbookService} />;
      case Component.Empty:
        return null;
    }
  }

  private deleteContact(id) {
    this.addressbookService.deleteContact(id).then((response: boolean) => {
      if (response) {
        alert("Contact Deleted Successfully");
        this.closeDialog();
        this.loadContacts();
      }
    });
  }

  public render(): React.ReactElement<IRootComponentProps> {
    const { isDataLoaded, contacts } = this.state;
    console.log(this.state);
    return (
      <div className={styles.container}>
        <HeaderComponent
          showAddForm={this.showAddDialog}
          closeForm={this.closeDialog} />

        <div className={`${styles.mainContainer}`}>
          <div className={styles.contacts}>
            <div className={`${styles.contactsHeading}`}>CONTACTS</div>
            {isDataLoaded
              ? <ContactsComponent
                contacts={contacts}
                onContactClick={this.displayContact} />
              : <Spinner size={SpinnerSize.large}
                label="Loading the Contacts"
                ariaLive="assertive" />}
          </div>

          <div className={`${styles.contactViewer}`}>
            {
              this.returnCurrentComponent()
            }
          </div>
        </div>
      </div>
    );
  }
}
