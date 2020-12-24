import { Observable } from 'rxjs';
import { IHttpBasicResponse } from './IHttpBasicResponse';

export interface IContactRepository {
    getContacts(): Observable<IHttpBasicResponse<IContactApiProps[]>>;
    getCountryCodes(): Observable<ICountryCodes[]>;
    getContactInteractions(contactId: number): Observable<IHttpBasicResponse<any[]>>;
    createContact(form: IContactForm): Observable<IHttpBasicResponse<IContactApiProps>>;
    deleteContact(contactId: number): Observable<IHttpBasicResponse<string>>; // success | error
    updateContact(form: IContactForm): Observable<IHttpBasicResponse<IContactApiProps>>;
    importContacts(payload: IImportContactsForm[]): Observable<IHttpBasicResponse<IImportContactsResponse>>;
    createInteraction(contactId: number, config: IGenericInteractionProps): Observable<IHttpBasicResponse<IContactInteractionsApiProps>>;
}
export type CONTACT_TYPE = 'ALL' | 'NOT_SPECIFIED' | 'PROSPECT' | 'CLIENT';
export type CONTACT_ORIGIN = 'MANUAL' | 'MOBILE_APP' | 'WEB' | 'WEB_APP' | 'UNKNOWN';
export type INTERACTION_TYPE = 'CREATE' | 'UPDATE_TYPE' | 'CONTACT_CALL' | 'CONTACT_SCHEDULED' | 'CONTACT_EMAIL';

export interface IImportContactsResponse {
    contacts_exported: Array<IContactApiProps>;
}

export interface IContactForm {
    // Required
    name: string;
    last_name: string;
    type: CONTACT_TYPE;
    country_code: string;
    phone_code: string;

    // Optionals
    id?: number;
    contact_id?: number;
    phone?: string;
    email?: string;
    street_address?: string;
    city?: string;
    state_iso?: string;
}

export interface IImportContactsForm {
    addresses: any[
    // { "id": string, "pref": boolean, "type": string, "formatted": string, "streetAddress": string },
    ];
    birthday: string;
    displayName: string;
    emails: any[
    // { "id": string, "pref": boolean, "value": string, "type": string },
    ];
    name: {
        familyName: string,
        givenName: string,
        middleName: string,
        formatted: string
    };
    nickname: string;
    phoneNumbers: any[
    // { "id": string, "pref": boolean, "value": string, "type": string },
    ];
    client_type: number;
}

// GET | CREATE | UPDATE | IMPORT
export interface IContactApiProps {
    id: string;
    client_id: string;
    country_code: string;
    phone_code: string;
    name: string;
    last_name: string;
    type: CONTACT_TYPE;
    origin: CONTACT_ORIGIN;
    email: string;
    phone: string;
    street_address: string;
    state_iso: string;
    city: string;
    created_at: string;
    updated_at: string;
    full_name: string;
}

export interface IContactInteractionsApiProps {
    id: string;
    contact_id: string;
    entity: string;
    entity_id: string;
    action_type: INTERACTION_TYPE;
    created_at: string;
    display_text: string;
}

export interface IGenericInteractionProps {
    action_type: string;
    entity: string;
    entity_id: number;
}

export interface ICountryCodes {
    name: string;
    translations: { es?: string };
    flag: string; alpha3Code: string;
    callingCodes: Array<string>;
}
