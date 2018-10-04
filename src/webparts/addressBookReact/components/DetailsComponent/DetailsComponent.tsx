import * as React from 'react';
import { IContact } from "../../Models/IContact";
import styles from './DetailsComponent.module.scss';

export interface IDetailsComponentProps {
    contact: IContact;
    onEditClick: any;
    onDeleteClick: any;
}

export default class DetailsComponent extends React.Component<IDetailsComponentProps, {}>{
    public render(): React.ReactElement<IDetailsComponentProps> {
        var { contact, onEditClick, onDeleteClick } = this.props;
        return (
            <div>
                <p className={styles.name}>{contact.Title}</p>
                <span className={styles.edit} onClick={() => onEditClick(contact)}>
                    <img src="https://saketanxt.sharepoint.com/sites/Aneel/SiteAssets/images/edit1.jpg" alt="Edit" />EDIT
                </span>
                <span className={styles.delete} onClick={() => onDeleteClick(contact.Id)}>
                    <img src="https://saketanxt.sharepoint.com/sites/Aneel/SiteAssets/images/delete2.png" alt="Delete" />DELETE
                </span>
                <div>
                    <p className={styles.email}>Email: </p>
                    <p className={`${styles.displayInline}`}>{contact.Email}</p>
                </div>
                <div>
                    <p className={styles.mobile}>Mobile: </p>
                    <p className={`${styles.displayInline}`}>{contact.Mobile}</p>
                </div>
                <div>
                    <p className={styles.landline}>Landline: </p>
                    <p className={`${styles.displayInline}`}>{contact.Landline}</p>
                </div>
                <div>
                    <p className={styles.website}>Website: </p>
                    <p className={`${styles.displayInline}`}>{contact.Website}</p>
                </div>
                <div className={styles.address}>
                    <p>Address: </p>
                    <pre className={`${styles.addressView}`}>{contact.Address}</pre>
                </div>
            </div>
        );
    }
}