import * as React from 'react';
import { IContact } from "../../Models/IContact";
import styles from './ContactsComponent.module.scss';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export interface IContactsComponentProps {
    contacts: IContact[];
    onContactClick: any;
}

export default class ContactsComponent extends React.Component<IContactsComponentProps, {}>{

    private renderContact(contact: IContact) {
        const { onContactClick } = this.props;
        return <div className={styles.listItem} id={contact.Id.toString()} onClick={() => onContactClick(contact)}>
            <Persona
                size={PersonaSize.regular}
                imageUrl={contact.ProfilePic != null ? contact.ProfilePic.Url : ""}
                title={contact.Title}
                primaryText={contact.Title}
                secondaryText={contact.Email} />
        </div>;
    }

    public render(): React.ReactElement<IContactsComponentProps> {
        var { contacts } = this.props;
        return (
            <div className={`${styles.contactsList}`}>
                {
                    contacts.map((contact) => {
                        return this.renderContact(contact);
                    })
                }
            </div>
        );
    }
}
