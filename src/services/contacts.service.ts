import { Inject, Injectable } from '@angular/core';
import { Contact, ContactFieldType, ContactFindOptions, Contacts } from '@ionic-native/contacts';
import { Observable, Subscriber } from 'rxjs';
import { catchError, map, withLatestFrom } from 'rxjs/operators';
import { IContactForm, IContactRepository, ICountryCodes, IGenericInteractionProps, IImportContactsForm } from '../core/contracts/IContact.repository';
import { IContactsService } from '../core/contracts/IContact.service';
import { ContactInteractionModel, ContactModel } from '../core/models/contact.model';
import { COUNTRY_CALLING_CODES } from '../repositories/contacts.repository';
import { CONTACTS_REPOSITORY } from './identifiers';
import { ContactStore } from './state/contact.store';

@Injectable()
export class ContactsService implements IContactsService<Contact, ContactModel> {

    constructor(
        @Inject(CONTACTS_REPOSITORY) private repository: IContactRepository,
        private nativeContacts: Contacts,
        private store: ContactStore) {
    }

    loadRawNativeContacts(filter?: string): Observable<Contact[]> {
        const options = new ContactFindOptions();
        options.multiple = true;
        options.filter = filter;

        const fields: Array<ContactFieldType> = ['displayName', 'name', 'phoneNumbers'];

        const observer: Observable<Contact[]> = new Observable(subscriber => {
            try {
                this.nativeContacts.find(fields, options).then((contacts) => {
                    subscriber.next(contacts);
                }, (error: Error) => {
                    console.error('*** Device contacts error:', error);
                    subscriber.error(error);
                });
            }
            catch (e) {
                console.error('*** TRY/CATCH:: loadRawNativeContacts: Device contacts error:', e.message);
                subscriber.error('The Contacts Plugin is not installed');
            }
        });

        return observer;
    }

    pickOne(phone: string) {
        const options = new ContactFindOptions();
        options.multiple = true;

        const fields: Array<ContactFieldType> = ['phoneNumbers'];

        return new Observable((subscriber: Subscriber<Contact>) => {
            try {
                this.nativeContacts.find(fields, options).then((contacts) => {
                    const res = contacts.filter(
                        c => c.phoneNumbers.some(
                            p => p.value.replace(/[^0-9]+/g, '') === phone
                        )
                    );

                    subscriber.next(res.length > 0 ? res[0] : null);
                }, (error: Error) => {
                    console.error('*** pickOne Device: contacts error:', error);
                    subscriber.error(error);
                });
            }
            catch (e) {
                console.error('*** TRY/CATCH:: pickOne: Device contacts error:', e.message);
                subscriber.error('The Contacts Plugin is not installed');
            }
        });
    }

    loadFormattedNativeContacts(filter?: string): Observable<ContactModel[]> {
        const observer: Observable<any[]> = new Observable(subscriber => {
            this.loadRawNativeContacts(filter)
                .pipe(withLatestFrom(this.store.Contacts$))
                .subscribe(([contacts, stored]) => {

                    const formattedContacts = contacts
                        .filter(contact => {
                            return contact.name.givenName
                                && stored.findIndex(s => s.phone === (contact.phoneNumbers ? contact.phoneNumbers[0].value : '')) === -1;
                        })
                        .sort((a, b) => a.name.givenName.localeCompare(b.name.givenName))
                        .map((c: Contact) => new ContactModel({
                            id: null,
                            name: c.name ? c.name.givenName : '',
                            lastName: c.name ? c.name.familyName : '',
                            type: 'NOT_SPECIFIED',
                            email: c.emails ? c.emails[0].value : '',
                            phone: c.phoneNumbers ? c.phoneNumbers[0].value : '',
                        }));
                    subscriber.next(formattedContacts);
                }, (error: Error) => {
                    console.error('****** loadFormatted Device contacts error:', error);
                    subscriber.error(error);
                });
        });

        return observer;
    }

    loadRemoteContacts(): Observable<ContactModel[]> {
        return this.repository.getContacts().pipe(
            map((response) => {
                return response.data.map(contact => {
                    const contactModel = ContactModel.fromDataResponse(contact);
                    return contactModel;
                }).sort((a, b) => b.id - a.id);
            }),
            catchError(error => {
                throw error;
            })
        );
    }

    loadCountryCodes(): Observable<ICountryCodes[]> {
        return this.repository.getCountryCodes().pipe(
            map((response) => {
                return (response && response.length) ? response.sort((a, b) => a.name.localeCompare(b.name)) : COUNTRY_CALLING_CODES;
            }),
            catchError(error => {
                throw error;
            })
        );
    }

    loadContactInteractions(contactId: number): Observable<ContactInteractionModel[]> {
        return this.repository.getContactInteractions(contactId).pipe(
            map((response) => {
                return response.data.map(interaction => {
                    return ContactInteractionModel.fromDataResponse(interaction);
                });
            }),
            catchError(error => {
                throw error;
            })
        );
    }

    createContact(form: IContactForm): Observable<ContactModel> {
        return this.repository.createContact(form).pipe(
            map((response) => {

                if (response.data.id) {
                    return ContactModel.fromDataResponse(response.data);
                }
                else {
                    throw new Error('Unknown error');
                }
            }),
            catchError(error => {
                throw error;
            })
        );
    }

    deleteContact(contactId: number): Observable<number> {
        return this.repository.deleteContact(contactId).pipe(
            map((response) => {

                return response.status === 'success' ? contactId : null;
            }),
            catchError(error => {
                throw error;
            })
        );
    }

    updateContact(form: IContactForm): Observable<ContactModel> {
        return this.repository.updateContact(form).pipe(
            map((response) => {
                return ContactModel.fromDataResponse(response.data);
            }),
            catchError(error => {
                throw error;
            })
        );
    }

    importContacts(contactList: IImportContactsForm[]): Observable<Array<ContactModel>> {
        return this.repository.importContacts(contactList).pipe(
            map((response) => {
                return response.data.contacts_exported.map(c => ContactModel.fromDataResponse(c));
            }),
            catchError(error => {
                throw error;
            })
        );
    }

    createInteraction(contactId: number, config: IGenericInteractionProps): Observable<ContactInteractionModel> {
        return this.repository.createInteraction(contactId, config).pipe(
            map((response) => {
                return ContactInteractionModel.fromDataResponse(response.data);
            }),
            catchError(error => {
                throw error;
            })
        );
    }

}
