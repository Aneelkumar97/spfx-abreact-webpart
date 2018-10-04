import { IProfilePic } from "./IProfilePic";
export interface IContact {
    Id: number;
    Title: string;
    Mobile: string;
    Landline: string;
    Email: string;
    Website: string;
    Address: string;
    ProfilePic: IProfilePic;
}