import { TestBed } from '@angular/core/testing';
import { Contact } from '@ionic-native/contacts';
import {
    ContactInteractionModel,
    ContactModel,
    IContactForm,
    IContactRepository,
    IContactsService,
    IGenericInteractionProps,
    IImportContactsForm
} from '../core';
import { ContactsRepositoryMock } from '../mocks/contacts.respository.mock';
import { ContactsService } from './contacts.service';
import { Contacts } from '@ionic-native/contacts';
import { ContactStore } from './state/contact.store';
import { of, throwError } from 'rxjs';
import { CONTACTS_REPOSITORY } from './identifiers';


class MockContactsStore {
    get Contacts$() {
        return of([]);
    }
}

describe('ContactsService', () => {
    let contactsService: IContactsService<Contact, ContactModel>;
    let contactsRepositoryMock: IContactRepository;
    let contactsStoreSpy: any;
    let nativeContactsSpy: any;


    beforeEach(() => {
        nativeContactsSpy = jasmine.createSpyObj('Contacts', ['find']);

        TestBed.configureTestingModule({
            providers: [
                { provide: Contacts, useValue: nativeContactsSpy },
                { provide: CONTACTS_REPOSITORY, useClass: ContactsRepositoryMock },
                { provide: ContactStore, useClass: MockContactsStore },
                ContactsService,
            ]
        });

        contactsService = TestBed.inject(ContactsService);
        contactsRepositoryMock = TestBed.inject(CONTACTS_REPOSITORY);
        contactsStoreSpy = TestBed.inject(ContactStore);
    });

    const httpError = {
        status: 'error',
        message: 'Some bad error!',
        statusCode: 500
    };

    const onError = (error: any) => {
        expect(error).toBeDefined('Error is not defined');
        expect(error.statusCode).toEqual(500);
        expect(error.status).toEqual('error');
    };

    const nativeContact = {
        phoneNumbers: [{ value: '1234567890' }]
    };

    it('Should get a non-empty list of Native Contacts', (done: DoneFn) => {

        nativeContactsSpy.find.and.returnValue(Promise.resolve([new Contact()]));

        contactsService.loadRawNativeContacts()
            .subscribe(nativeContactList => {
                expect(nativeContactList).toBeDefined('Native Contac List is not defined');
                expect(nativeContactList[0] instanceof Contact).toBeTruthy('Native ContacList has no instances of Contact');
                done();
            });
    });
    it('Should get an empty list of Native Contacts', (done: DoneFn) => {

        nativeContactsSpy.find.and.returnValue(Promise.resolve([]));

        contactsService.loadRawNativeContacts()
            .subscribe(nativeContactList => {
                expect(nativeContactList).toBeDefined('Native Contac List is not defined');
                done();
            });
    });
    it('Should fail to get Native Contacts', (done: DoneFn) => {
        contactsService.loadRawNativeContacts()
            .subscribe(() => { }, error => {
                expect(error).toEqual('The Contacts Plugin is not installed');
                done();
            });
    });
    it('Should fail to get Native Contacts', (done: DoneFn) => {
        nativeContactsSpy.find.and.rejectWith('The Contacts Plugin is not installed');

        contactsService.loadRawNativeContacts()
            .subscribe(() => { }, error => {
                expect(error).toEqual('The Contacts Plugin is not installed');
                done();
            });
    });

    it('Should pickOne Native Contact', (done: DoneFn) => {

        nativeContactsSpy.find.and.returnValue(Promise.resolve([nativeContact]));

        contactsService.pickOne('1234567890')
            .subscribe((theNativeContact) => {
                expect(theNativeContact).toBeTruthy('Native Contac is undefined');
                done();
            });
    });
    it('Should pickOne empty Native Contact', (done: DoneFn) => {

        nativeContactsSpy.find.and.returnValue(Promise.resolve([nativeContact]));

        contactsService.pickOne('987654321')
            .subscribe((theNativeContact) => {
                expect(theNativeContact).toBeNull('Native Contac is not null');
                done();
            });
    });
    it('Should fail to pickOne Native Contact', (done: DoneFn) => {
        contactsService.pickOne('987654321')
            .subscribe(() => { }, (error) => {
                expect(error).toEqual('The Contacts Plugin is not installed');
                done();
            });
    });
    it('Should fail to pickOne Native Contact', (done: DoneFn) => {
        nativeContactsSpy.find.and.rejectWith('The Contacts Plugin is not installed');

        contactsService.pickOne('987654321')
            .subscribe(() => { }, (error) => {
                expect(error).toEqual('The Contacts Plugin is not installed');
                done();
            });
    });

    it('Should find and load Formatted Native Contacts', (done: DoneFn) => {
        const searchPhone = '1234567890';
        const contact = {
            name: { givenName: 'test', familyName: 'user' },
            phoneNumbers: [{ value: searchPhone }]
        };

        const spy = spyOnProperty(contactsStoreSpy, 'Contacts$')
            .and.returnValue(of([ContactModel.empty()]));

        nativeContactsSpy.find.and.returnValue(Promise.resolve([contact]));

        contactsService.loadFormattedNativeContacts(searchPhone)
            .subscribe((theNativeContact) => {
                expect(spy).toHaveBeenCalled();
                expect(nativeContactsSpy.find).toHaveBeenCalled();
                expect(theNativeContact).toBeTruthy('Native Contac is undefined');
                done();
            });
    });
    it('Should load an empty list of Formatted Native Contacts', (done: DoneFn) => {
        const searchPhone = '1234567890';

        const spy = spyOnProperty(contactsStoreSpy, 'Contacts$')
            .and.returnValue(of([ContactModel.empty()]));

        nativeContactsSpy.find.and.returnValue(Promise.resolve([]));

        contactsService.loadFormattedNativeContacts(searchPhone)
            .subscribe((theNativeContact) => {
                expect(spy).toHaveBeenCalled();
                expect(nativeContactsSpy.find).toHaveBeenCalled();
                expect(theNativeContact).toBeTruthy('Native Contac is undefined');
                done();
            });
    });
    it('Should thow error when getting a list of Formatted Native Contacts', (done: DoneFn) => {
        const spy = spyOnProperty(contactsStoreSpy, 'Contacts$')
            .and.returnValue(throwError('some bad error'));

        nativeContactsSpy.find.and.returnValue(Promise.resolve([]));

        contactsService.loadFormattedNativeContacts('123')
            .subscribe(() => { }, error => {
                expect(error).toBeDefined();
                done();
            });
    });

    it('Should load a non-empty contact list', () => {
        contactsService.loadRemoteContacts()
            .subscribe(contactList => {
                expect(contactList.length).toBeGreaterThan(0, 'ContacList list is empty');
                expect(contactList[0] instanceof ContactModel).toBeTruthy('ContacList is not an instance of ContactModel[]');
            });
    });
    it('Should load an empty contact list', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'getContacts')
            .and.returnValue(of({ data: [], status: 'success' }));

        contactsService.loadRemoteContacts()
            .subscribe(contactList => {
                expect(contactList).toBeDefined();
                expect(contactList.length).toBe(0);
            });
    });
    it('Should fail to load contact list', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'getContacts')
            .and.returnValue(throwError(httpError));

        contactsService.loadRemoteContacts()
            .subscribe(() => { }, error => onError(error));
    });

    it('Should load country codes', () => {
        contactsService.loadCountryCodes()
            .subscribe(countryCodeList => {
                expect(countryCodeList).toBeDefined();
                expect(countryCodeList.length).toEqual(250);
            });
    });
    it('Should fail to load country codes', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'getCountryCodes')
            .and.returnValue(throwError(httpError));

        contactsService.loadCountryCodes()
            .subscribe(() => { }, error => onError(error));
    });

    it('Should load a non-empty Interaction list', () => {
        contactsService.loadContactInteractions(42)
            .subscribe(interactionList => {
                expect(interactionList.length).toBeGreaterThan(0, 'Interaction list is empty');
                expect(interactionList[0] instanceof ContactInteractionModel).toBeTruthy('Interaction is not an instance of ContactInteractionModel');
            });
    });
    it('Should load an empty Interaction list', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'getContactInteractions')
            .and.returnValue(of({ data: [], status: 'success' }));

        contactsService.loadContactInteractions(42)
            .subscribe(interactionList => {
                expect(interactionList).toBeDefined('Interaction list is not defined');
                expect(interactionList.length).toEqual(0, 'Interaction list length is <> 0');
            });
    });
    it('Should fail to load an Interaction list', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'getContactInteractions')
            .and.returnValue(throwError(httpError));

        contactsService.loadContactInteractions(42)
            .subscribe(() => { }, error => onError(error));
    });

    it('Should create a Contact', () => {
        const payload: IContactForm = {
            name: 'Andres',
            last_name: 'Vergara',
            type: 'CLIENT',
            country_code: 'MEX',
            phone_code: '+52'
        };

        contactsService.createContact(payload)
            .subscribe(contactCreated => {
                expect(contactCreated instanceof ContactModel).toBeTruthy('New Contact is not an instance of ContactModel');
            });
    });
    it('Should throw error when creating a Contact', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'createContact')
            .and.returnValue(of({ data: {} as any, status: 'success' }));

        contactsService.createContact({} as IContactForm)
            .subscribe(() => { }, error => {
                expect(error).toBeDefined();
            });
    });
    it('Should fail to create a Contact', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'createContact')
            .and.returnValue(throwError(httpError));

        contactsService.createContact({} as IContactForm)
            .subscribe(() => { }, error => onError(error));
    });

    it('Should delete a Contact', () => {
        const contactId = 42;
        contactsService.deleteContact(contactId)
            .subscribe(id => {
                expect(id).toBeDefined('contact id is not defined');
                expect(id).toEqual(contactId, 'contact id is not same as sent parameter');
            });
    });
    it('Should fail to delete a contact', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'deleteContact')
            .and.returnValue(throwError(httpError));

        contactsService.deleteContact(42)
            .subscribe(() => { }, error => onError(error));
    });

    it('Should update a contact', () => {
        const payload: IContactForm = {
            name: 'Juan',
            last_name: 'Camaney',
            phone: '1231231231',
            type: 'NOT_SPECIFIED',
            country_code: 'MEX',
            phone_code: '+52',
            id: 42
        };

        contactsService.updateContact(payload)
            .subscribe(contactCreated => {
                expect(contactCreated instanceof ContactModel).toBeTruthy('Contact is not an instance of ContactModel');
            });
    });
    it('Should fail to update a contact', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'updateContact')
            .and.returnValue(throwError(httpError));

        contactsService.updateContact({} as IContactForm)
            .subscribe(() => { }, error => onError(error));
    });

    it('Should import a list of contacts', () => {
        const payload: IImportContactsForm[] = [{
            addresses: [
                // { "id": string, "pref": boolean, "type": string, "formatted": string, "streetAddress": string },
            ],
            birthday: null,
            displayName: null,
            emails: [
                { id: '1', pref: false, value: 'test@tes.com', type: null },
            ],
            name: {
                familyName: 'Imported',
                givenName: 'Contact',
                middleName: null,
                formatted: 'Imported Contact'
            },
            nickname: null,
            phoneNumbers: [
                { id: '123', pref: false, value: '9876543210', type: null },
            ],
            client_type: 1
        },
        {
            addresses: [],
            birthday: null,
            displayName: null,
            emails: [
                { id: '1', pref: false, value: 'other_test@tes.com', type: null },
            ],
            name: {
                familyName: 'Other',
                givenName: 'Contact',
                middleName: null,
                formatted: 'Other Contact'
            },
            nickname: null,
            phoneNumbers: [
                { id: '123', pref: false, value: '132435364', type: null },
            ],
            client_type: 2
        }];

        contactsService.importContacts(payload)
            .subscribe(contactList => {
                expect(contactList.length).toEqual(payload.length, 'Imported Contacts list mismatch payload length');
                expect(contactList[0] instanceof ContactModel).toBeTruthy('Updated Contact instance mismatches ContactModel type');
            });
    });
    it('Should fail to import a list of contacts', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'importContacts')
            .and.returnValue(throwError(httpError));

        contactsService.importContacts([])
            .subscribe(() => { }, error => onError(error));
    });

    it('Should create a contact interaction', () => {
        const config: IGenericInteractionProps = {
            action_type: 'create',
            entity: 'contact',
            entity_id: 123
        };

        contactsService.createInteraction(42, config)
            .subscribe(interaction => {
                expect(interaction instanceof ContactInteractionModel).toBeTruthy('Interaction is not an instance of ContactInteractionModel');
            });
    });
    it('Should fail to create a contact interaction', () => {
        nativeContactsSpy = spyOn(contactsRepositoryMock, 'createInteraction')
            .and.returnValue(throwError(httpError));

        contactsService.createInteraction(42, {} as IGenericInteractionProps)
            .subscribe(() => { }, error => onError(error));
    });
});
