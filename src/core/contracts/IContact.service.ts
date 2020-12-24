import { Observable } from 'rxjs';
import { ContactInteractionModel } from '../models/contact.model';
import { IContactForm, IImportContactsForm, ICountryCodes, IGenericInteractionProps } from './IContact.repository';

export interface IContactsService<T1, T2> {
    loadRemoteContacts(): Observable<T2[]>;
    loadCountryCodes(): Observable<ICountryCodes[]>;
    loadContactInteractions(contactId: number): Observable<ContactInteractionModel[]>;
    loadRawNativeContacts(filter?: string): Observable<T1[]>;
    loadFormattedNativeContacts(filter?: string): Observable<T2[]>;
    createContact(form: IContactForm): Observable<T2>;
    deleteContact(contactId: number): Observable<number>;
    updateContact(form: IContactForm): Observable<T2>;
    importContacts(contactList: IImportContactsForm[]): Observable<T2[]>;
    pickOne(phone: string): Observable<T1 | null>;
    createInteraction(contactId: number, config: IGenericInteractionProps): Observable<ContactInteractionModel>;
}
