export default class ValidatorService {

    public static isStringEmpty(value: string): boolean {
        return value === "";
    }

    public static isMobileNumberValid(value: string): boolean {
        return /^\d{10}$/.test(value);
    }

    public static isWebsiteValid(value: string): boolean {
        return /^www.([a-zA-Z0-9_.])+.([a-zA-Z])+$/i.test(value);
    }

    public static isEmailValid(value: string): boolean {
        return /^([a-zA-Z0-9])([a-zA-Z0-9_.])*\@([a-zA-Z])+\.([a-zA-Z])+$/.test(value);
    }
}