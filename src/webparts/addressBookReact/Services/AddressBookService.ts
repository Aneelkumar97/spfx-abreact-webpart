import { IContact } from "./../Models/IContact";
import { SPHttpClient } from "@microsoft/sp-http";

export default class AddressBookService {
    private context: any;
    private listName: string = "Contacts";
    private listApiUrl: string;

    constructor(context: any) {
        this.context = context;
        this.listApiUrl = `${this.context.pageContext.site.absoluteUrl}/_api/web/lists/getbytitle('${this.listName}')/items`;
    }

    public getContacts(): Promise<IContact[]> {
        return this.context.spHttpClient.get(this.listApiUrl, SPHttpClient.configurations.v1)
            .then((response) => {
                return response.json();
            }).then((responseContacts) => {
                console.log(responseContacts);
                return responseContacts.value;
            });
    }

    public getContactById(id: number): Promise<IContact> {
        return this.context.spHttpClient.get(`${this.listApiUrl}('${id}')`, SPHttpClient.configurations.v1)
            .then((response) => {
                return response.json();
            }).then(responseContact => {
                return responseContact.d;
            });
    }

    public addContact(contact: IContact): Promise<number> {
        return this.context.spHttpClient.post(this.listApiUrl, SPHttpClient.configurations.v1, {
            body: JSON.stringify({
                Title: contact.Title,
                Mobile: contact.Mobile,
                Email: contact.Email,
                Landline: contact.Landline,
                Website: contact.Website,
                Address: contact.Address
            })
        }).then(response => {
            return response.json();
        }).then(responseContact => {
            return responseContact.Id;
        });
    }

    public editContact(contact: IContact): Promise<boolean> {
        return this.context.spHttpClient.post(`${this.listApiUrl}('${contact.Id}')`, SPHttpClient.configurations.v1, {
            body: JSON.stringify({
                Title: contact.Title,
                Mobile: contact.Mobile,
                Email: contact.Email,
                Landline: contact.Landline,
                Website: contact.Website,
                Address: contact.Address
            }),
            headers: {
                'IF-MATCH': '*',
                'X-HTTP-Method': 'MERGE'
            }
        }).then(response => {
            return response.status == 204;
        });
    }

    public deleteContact(id: number): Promise<boolean> {
        return this.context.spHttpClient.post(`${this.listApiUrl}('${id}')`, SPHttpClient.configurations.v1, {
            headers: {
                'IF-MATCH': '*',
                'X-HTTP-Method': 'DELETE'
            }
        }).then(response => {
            return response.status == 204;
        });
    }
}