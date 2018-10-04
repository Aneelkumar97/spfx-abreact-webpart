import * as React from 'react';
import styles from './HeaderComponent.module.scss';

export interface IHeaderComponentProps {
    showAddForm: any;
    closeForm: any;
}

export default class HeaderComponent extends React.Component<IHeaderComponentProps, {}> {
    public render(): React.ReactElement<IHeaderComponentProps> {
        const { showAddForm, closeForm } = this.props;
        return (
            <div className={styles.header}>
                <p>Address Book</p>
                <div className={`${styles.navBar}`}>
                    <ul>
                        <li> <a id="btnHome" onClick={() => closeForm()}> HOME </a> </li>
                        <li> <a id="btnAddContact" onClick={() => showAddForm()}> +ADD </a> </li>
                        <li> <a> <img src="https://saketanxt.sharepoint.com/sites/Aneel/SiteAssets/images/blog-icon.png" width="25" height="25" alt="Blog Icon" /> </a> </li>
                    </ul>
                </div>
            </div>
        );
    }
}