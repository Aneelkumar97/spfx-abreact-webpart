import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "office-ui-fabric-react/lib/Dialog";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { PrimaryButton, DefaultButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { IContact } from "../../Models/IContact";
import ValidatorService from "../../Services/ValidatorService";
import styles from "./ContactFormComponent.module.scss";
import AddressBookService from "../../Services/AddressBookService";

export interface IContactFormComponentProps {
    closeDialog: any;
    contact: IContact;
    service: AddressBookService;
}

export interface IContactFormComponentState {
    nameError: ErrorMessage;
    emailError: ErrorMessage;
    mobileError: ErrorMessage;
    websiteError: ErrorMessage;
    isNameValid: boolean;
    isMobileValid: boolean;
    isEmailValid: boolean;
    isWebsiteValid: boolean;
}

export enum ErrorMessage {
    Required = "Required",
    Invalid = "Invalid"
}

export default class ContactFormComponent extends React.Component<IContactFormComponentProps, IContactFormComponentState> {

    private nameValue: string;
    private emailValue: string;
    private mobileValue: string;
    private websiteValue: string;
    private addressValue: string;
    private landlineValue: string;

    constructor(props) {
        super(props);
        this.state = {
            nameError: ErrorMessage.Required,
            emailError: ErrorMessage.Required,
            mobileError: ErrorMessage.Required,
            websiteError: ErrorMessage.Required,
            isNameValid: true,
            isEmailValid: true,
            isMobileValid: true,
            isWebsiteValid: true,
        };
    }

    private editContact(event: any, id: number) {
        const { isNameValid, isEmailValid, isMobileValid, isWebsiteValid } = this.state;
        if (isNameValid && isEmailValid && isMobileValid && isWebsiteValid) {
            this.props.service.editContact({
                Id: id,
                Title: this.nameValue,
                Email: this.emailValue,
                Mobile: this.mobileValue,
                Landline: this.landlineValue,
                Website: this.websiteValue,
                Address: this.addressValue,
                ProfilePic: null
            }).then((response: boolean) => {
                if (response) {
                    alert("Contact Saved Successfully");
                    this.props.closeDialog();
                }
                else {
                    alert("Error in Saving");
                }
            }).catch(error => {
                console.log("Error occured in Saving...");
            });
        }
    }

    private addContact() {
        const { isNameValid, isEmailValid, isMobileValid, isWebsiteValid } = this.state;
        if (isNameValid && isEmailValid && isMobileValid && isWebsiteValid) {
            debugger;
            this.props.service.addContact({
                Title: this.nameValue,
                Email: this.emailValue,
                Mobile: this.mobileValue,
                Landline: this.landlineValue,
                Website: this.websiteValue,
                Address: this.addressValue,
                ProfilePic: null,
                Id: null
            }).then((contactId: number) => {
                if (contactId > 0) {
                    alert("Contact Added Successfully");
                    this.props.closeDialog();
                }
                else {
                    alert("Error in Adding");
                }
            }).catch(error => {
                console.log("Error occured in Adding...");
            });
        }
    }

    private isNameValid(value): boolean {
        if (ValidatorService.isStringEmpty(value)) {
            this.setState({
                nameError: ErrorMessage.Required,
                isNameValid: false
            });
            return false;
        }
        this.setState({
            nameError: ErrorMessage.Required,
            isNameValid: true,
        });
        this.nameValue = value;
        console.log(this.nameValue);
        return true;
    }

    private isMobileValid(value): boolean {
        if (ValidatorService.isStringEmpty(value)) {
            this.setState({
                mobileError: ErrorMessage.Required,
                isMobileValid: false
            });
            return false;
        }
        else if (!ValidatorService.isMobileNumberValid(value)) {
            this.setState({
                mobileError: ErrorMessage.Invalid,
                isMobileValid: false
            });
            return false;
        }
        this.setState({
            mobileError: ErrorMessage.Required,
            isMobileValid: true
        });
        this.mobileValue = value;
        console.log(this.mobileValue);
        return true;
    }

    private isEmailValid(value): boolean {
        if (ValidatorService.isStringEmpty(value)) {
            this.setState({
                emailError: ErrorMessage.Required,
                isEmailValid: false
            });
            return false;
        }
        else if (!ValidatorService.isEmailValid(value)) {
            this.setState({
                emailError: ErrorMessage.Invalid,
                isEmailValid: false
            });
            return false;
        }
        this.setState({
            emailError: ErrorMessage.Required,
            isEmailValid: true
        });
        this.emailValue = value;
        console.log(this.emailValue);
        return true;
    }

    private isWebsiteValid(value): boolean {
        if (ValidatorService.isStringEmpty(value)) {
            this.setState({
                websiteError: ErrorMessage.Required,
                isWebsiteValid: false
            });
            return false;
        }
        else if (!ValidatorService.isWebsiteValid(value)) {
            this.setState({
                websiteError: ErrorMessage.Invalid,
                isWebsiteValid: false
            });
            return false;
        }
        this.setState({
            websiteError: ErrorMessage.Required,
            isWebsiteValid: true
        });
        this.websiteValue = value;
        return true;
    }

    private initializeComponent() {
        const { contact } = this.props;
        const { isNameValid, isEmailValid, isMobileValid, isWebsiteValid } = this.state;
        if (contact != null && !(isNameValid || isEmailValid || isMobileValid || isWebsiteValid)) {
            this.setState({
                nameError: ErrorMessage.Required,
                emailError: ErrorMessage.Required,
                mobileError: ErrorMessage.Required,
                websiteError: ErrorMessage.Required,
                isNameValid: true,
                isEmailValid: true,
                isMobileValid: true,
                isWebsiteValid: true,
            });
            if (contact != null) {
                this.nameValue = contact.Title;
                this.emailValue = contact.Email;
                this.mobileValue = contact.Mobile;
                this.landlineValue = contact.Landline;
                this.websiteValue = contact.Website;
                this.addressValue = contact.Address;
            }
        }
    }

    private onLandlineChanged(value) {
        this.landlineValue = value;
    }

    private onAddressChanged(value) {
        this.addressValue = value;
    }

    public render(): React.ReactElement<IContactFormComponentProps> {
        const { contact, closeDialog } = this.props;
        const { isNameValid, isEmailValid, isMobileValid, isWebsiteValid, nameError, emailError, mobileError, websiteError } = this.state;
        this.initializeComponent();
        return (
            <Dialog
                hidden={false}
                onDismiss={closeDialog}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: "Contact Form"
                }}
                containerClassName={`${styles.textDialog}`}
                modalProps={{
                    isBlocking: true,
                }} >
                <div className={`${styles.modalContent}`}>
                    <div>
                        <Label required={true}>Title</Label>
                        <TextField
                            defaultValue={contact != null ? contact.Title : ""}
                            onChanged={value => this.isNameValid(value)}
                            name="txtName" />
                        <MessageBar
                            messageBarType={MessageBarType.error}
                            className={`${isNameValid ? styles.hideMessage : styles.showMessage}`}
                        >{nameError}</MessageBar>
                    </div>
                    <div>
                        <Label required={true}>Email</Label>
                        <TextField
                            defaultValue={contact != null ? contact.Email : ""}
                            onChanged={value => this.isEmailValid(value)}
                            name="txtEmail" />
                        <MessageBar
                            className={isEmailValid ? `${styles.hideMessage}` : `${styles.showMessage}`}
                            messageBarType={MessageBarType.error}
                        >{emailError}</MessageBar>
                    </div>
                    <div>
                        <Label required={true}>Mobile</Label>
                        <TextField
                            defaultValue={contact != null ? contact.Mobile : ""}
                            onChanged={value => this.isMobileValid(value)} name="txtMobile" />
                        <MessageBar
                            className={isMobileValid ? `${styles.hideMessage}` : `${styles.showMessage}`}
                            messageBarType={MessageBarType.error}
                        >{mobileError}</MessageBar>
                    </div>
                    <div>
                        <Label>Landline </Label>
                        <TextField
                            defaultValue={contact != null ? contact.Landline : ""}
                            onChanged={value => this.onLandlineChanged(value)}
                            name="txtLandline" />
                    </div>
                    <div>
                        <Label required={true}>Website</Label>
                        <TextField
                            defaultValue={contact != null ? contact.Website : ""}
                            onChanged={value => this.isWebsiteValid(value)} name="txtWebsite" />
                        <MessageBar
                            messageBarType={MessageBarType.error}
                            className={isWebsiteValid ? `${styles.hideMessage}` : `${styles.showMessage}`}
                        >{websiteError}</MessageBar>
                    </div>
                    <div>
                        <Label>Address </Label>
                        <textarea
                            defaultValue={contact != null ? contact.Address : ""}
                            onChange={event => this.onAddressChanged(event.target.value)} ></textarea>
                    </div>
                    <DialogFooter>
                        <PrimaryButton
                            type="Button"
                            text={contact != null ? "Save" : "Add"}
                            onClick={(e) => contact != null ? this.editContact(e, contact.Id) : this.addContact()} />
                        <DefaultButton onClick={closeDialog} text="Cancel" />
                    </DialogFooter>
                </div>
            </Dialog>
        );
    }
}
