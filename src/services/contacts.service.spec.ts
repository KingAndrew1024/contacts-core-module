import { TestBed } from '@angular/core/testing';
import { Contact } from '@ionic-native/contacts';
import {
    ContactInteractionModel,
    ContactModel,
    IContactApiProps,
    IContactForm,
    IContactRepository,
    IContactsService,
    IGenericInteractionProps,
} from '../core';
import { MockContactsRepository } from '../mocks/contacts.respository.mock';
import { ContactsService } from './contacts.service';
import { Contacts } from '@ionic-native/contacts';
import { ContactStore } from './state/contact.store';
import { of, throwError } from 'rxjs';
import { CONTACTS_REPOSITORY, CONTACTS_SERVICE } from './identifiers';
import { COUNTRY_CALLING_CODES } from '../repositories/contacts.repository';


class MockContactsStore {
    get Contacts$() {
        return of([]);
    }
}

describe('ContactsService', () => {
    let contactsService: IContactsService<Contact, ContactModel>;
    let mockMontactsRepository: IContactRepository;
    let mockContactsStore: any;
    let nativeContactsSpy: any;


    beforeEach(() => {
        nativeContactsSpy = jasmine.createSpyObj('Contacts', ['find']);

        TestBed.configureTestingModule({
            providers: [
                { provide: Contacts, useValue: nativeContactsSpy },
                { provide: CONTACTS_REPOSITORY, useClass: MockContactsRepository },
                { provide: CONTACTS_SERVICE, useClass: ContactsService },
                { provide: ContactStore, useClass: MockContactsStore },
            ]
        });

        contactsService = TestBed.inject(CONTACTS_SERVICE);
        mockMontactsRepository = TestBed.inject(CONTACTS_REPOSITORY);
        mockContactsStore = TestBed.inject(ContactStore);
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
        name: { givenName: 'some fake name' },
        phoneNumbers: [{ value: '1234567890' }],
        emails: [{ value: 'fake@email.com' }]
    };

    it('Should be created', () => {
        expect(contactsService).toBeTruthy();
    });

    it('loadRawNativeContacts Should get a non-empty list of Native Contacts', (done: DoneFn) => {
        const fakeNativeContact1: any = { ...nativeContact, name: { givenName: 'fake contact1' } };
        const fakeNativeContact2: any = { ...nativeContact, name: { givenName: 'fake contact2', familyname: 'fake family name' } };
        const fakeNativeContact3: any = { ...nativeContact, name: { givenName: 'fake contact3' } };
        const fakeNativeContactList: any = [fakeNativeContact1, fakeNativeContact2, fakeNativeContact3];

        nativeContactsSpy.find.and.returnValue(Promise.resolve(fakeNativeContactList));

        contactsService.loadRawNativeContacts()
            .subscribe(nativeContactList => {
                expect(nativeContactList).toBeDefined('Native Contac List is not defined');
                expect(nativeContactList as any).toEqual(fakeNativeContactList);
                done();
            });
    });
    it('loadRawNativeContacts Should get an empty list of Native Contacts', (done: DoneFn) => {

        nativeContactsSpy.find.and.returnValue(Promise.resolve([]));

        contactsService.loadRawNativeContacts()
            .subscribe(nativeContactList => {
                expect(nativeContactList).toBeDefined('Native Contac List is not defined');
                done();
            });
    });
    it('loadRawNativeContacts Should fail to get Native Contacts', (done: DoneFn) => {
        contactsService.loadRawNativeContacts()
            .subscribe(() => { }, error => {
                expect(error).toEqual('The Contacts Plugin is not installed');
                done();
            });
    });
    it('loadRawNativeContacts Should fail to get Native Contacts', (done: DoneFn) => {
        nativeContactsSpy.find.and.rejectWith('The Contacts Plugin is not installed');

        contactsService.loadRawNativeContacts()
            .subscribe(() => { }, error => {
                expect(error).toEqual('The Contacts Plugin is not installed');
                done();
            });
    });

    it('pickOne Should pickOne Native Contact', (done: DoneFn) => {

        nativeContactsSpy.find.and.returnValue(Promise.resolve([nativeContact]));

        contactsService.pickOne('1234567890')
            .subscribe((theNativeContact) => {
                expect(theNativeContact).toBeTruthy('Native Contac is undefined');
                done();
            });
    });
    it('pickOne Should pickOne empty Native Contact', (done: DoneFn) => {

        nativeContactsSpy.find.and.returnValue(Promise.resolve([nativeContact]));

        contactsService.pickOne('987654321')
            .subscribe((theNativeContact) => {
                expect(theNativeContact).toBeNull('Native Contac is not null');
                done();
            });
    });
    it('pickOne Should fail to pickOne Native Contact', (done: DoneFn) => {
        contactsService.pickOne('987654321')
            .subscribe(() => { }, (error) => {
                expect(error).toEqual('The Contacts Plugin is not installed');
                done();
            });
    });
    it('pickOne Should fail to pickOne Native Contact', (done: DoneFn) => {
        nativeContactsSpy.find.and.rejectWith('The Contacts Plugin is not installed');

        contactsService.pickOne('987654321')
            .subscribe(() => { }, (error) => {
                expect(error).toEqual('The Contacts Plugin is not installed');
                done();
            });
    });

    it('loadFormattedNativeContacts Should find and load Formatted Native Contacts', (done: DoneFn) => {
        const searchPhone = '1234567890';

        const fakeNativeContact1: any = {
            ...nativeContact,
            phoneNumbers: [{ value: searchPhone }]
        };
        const fakeNativeContact2: any = {
            ...nativeContact,
            name: { familyname: 'fake family name' },
            phoneNumbers: [{ value: '123' }]
        };
        const fakeNativeContact3: any = {
            ...nativeContact,
            name: { givenName: 'fake contact3' },
            phoneNumbers: [{ value: '456' }]
        };
        const fakeNativeContactList: any = [
            fakeNativeContact1,
            fakeNativeContact2,
            fakeNativeContact3
        ];

        const spy = spyOnProperty(mockContactsStore, 'Contacts$')
            .and.returnValue(of([ContactModel.empty()]));

        nativeContactsSpy.find.and.returnValue(Promise.resolve(fakeNativeContactList));

        contactsService.loadFormattedNativeContacts(searchPhone)
            .subscribe((theNativeContact) => {
                expect(spy).toHaveBeenCalled();
                expect(nativeContactsSpy.find).toHaveBeenCalled();
                expect(theNativeContact).toBeTruthy('Native Contac is undefined');
                done();
            });
    });
    it('loadFormattedNativeContacts Should find and load Formatted Native Contacts', (done: DoneFn) => {
        const searchPhone = '1234567890';

        const fakeNativeContact1: any = {
            // phoneNumbers: [{ value: searchPhone }]
        };
        const fakeNativeContact2: any = {
            ...nativeContact,
            name: { familyname: 'fake family name' },
            phoneNumbers: [{ value: '123' }]
        };
        const fakeNativeContact3: any = {
            ...nativeContact,
            name: { givenName: 'fake contact3' },
            phoneNumbers: [{ value: '456' }]
        };
        const fakeNativeContactList: any = [
            fakeNativeContact1,
            fakeNativeContact2,
            fakeNativeContact3,
        ];

        const spy = spyOnProperty(mockContactsStore, 'Contacts$')
            .and.returnValue(of([ContactModel.empty()]));

        nativeContactsSpy.find.and.returnValue(Promise.resolve(fakeNativeContactList));

        contactsService.loadFormattedNativeContacts(searchPhone)
            .subscribe((theNativeContact) => {
                expect(spy).toHaveBeenCalled();
                expect(nativeContactsSpy.find).toHaveBeenCalled();
                expect(theNativeContact).toBeTruthy('Native Contac is undefined');
                done();
            });
    });
    it('loadFormattedNativeContacts Should load an empty list of Formatted Native Contacts', (done: DoneFn) => {
        const searchPhone = '1234567890';

        const spy = spyOnProperty(mockContactsStore, 'Contacts$')
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
    it('loadFormattedNativeContacts Should thow error when getting a list of Formatted Native Contacts', (done: DoneFn) => {
        const spy = spyOnProperty(mockContactsStore, 'Contacts$')
            .and.returnValue(throwError('some bad error'));

        nativeContactsSpy.find.and.returnValue(Promise.resolve([]));

        contactsService.loadFormattedNativeContacts('123')
            .subscribe(() => { }, error => {
                expect(error).toBeDefined();
                done();
            });
    });

    it('loadRemoteContacts Should load a non-empty contact list', () => {
        contactsService.loadRemoteContacts()
            .subscribe(contactList => {
                expect(contactList.length).toBeGreaterThan(0, 'ContacList list is empty');
                expect(contactList[0] instanceof ContactModel).toBeTruthy('ContacList is not an instance of ContactModel[]');
            });
    });
    it('loadRemoteContacts Should load an empty contact list', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'getContacts')
            .and.returnValue(of({ data: [], status: 'success' }));

        contactsService.loadRemoteContacts()
            .subscribe(contactList => {
                expect(contactList).toBeDefined();
                expect(contactList.length).toBe(0);
            });
    });
    it('loadRemoteContacts Should fail to load contact list', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'getContacts')
            .and.returnValue(throwError(httpError));

        contactsService.loadRemoteContacts()
            .subscribe(() => { }, error => onError(error));
    });

    it('loadCountryCodes Should load country codes', () => {
        contactsService.loadCountryCodes()
            .subscribe(countryCodeList => {
                expect(countryCodeList).toBeDefined();
                expect(countryCodeList.length).toEqual(250);
            });
    });
    it('loadCountryCodes Should load an the default list of country codes', () => {
        const spy = spyOn(mockMontactsRepository, 'getCountryCodes').and.returnValue(of([]));
        contactsService.loadCountryCodes()
            .subscribe(countryCodeList => {
                expect(countryCodeList).toBeDefined();
                expect(countryCodeList.length).toEqual(COUNTRY_CALLING_CODES.length);
            });
    });
    it('loadCountryCodes Should fail to load country codes', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'getCountryCodes')
            .and.returnValue(throwError(httpError));

        contactsService.loadCountryCodes()
            .subscribe(() => { }, error => onError(error));
    });

    it('loadContactInteractions Should load a non-empty Interaction list', () => {
        contactsService.loadContactInteractions(42)
            .subscribe(interactionList => {
                expect(interactionList.length).toBeGreaterThan(0, 'Interaction list is empty');
                expect(interactionList[0] instanceof ContactInteractionModel).toBeTruthy('Interaction is not an instance of ContactInteractionModel');
            });
    });
    it('loadContactInteractions Should load an empty Interaction list', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'getContactInteractions')
            .and.returnValue(of({ data: [], status: 'success' }));

        contactsService.loadContactInteractions(42)
            .subscribe(interactionList => {
                expect(interactionList).toBeDefined('Interaction list is not defined');
                expect(interactionList.length).toEqual(0, 'Interaction list length is <> 0');
            });
    });
    it('loadContactInteractions Should fail to load an Interaction list', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'getContactInteractions')
            .and.returnValue(throwError(httpError));

        contactsService.loadContactInteractions(42)
            .subscribe(() => { }, error => onError(error));
    });

    it('createContact Should create a Contact', () => {
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
    it('createContact Should throw error when creating a Contact', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'createContact')
            .and.returnValue(of({ data: {} as any, status: 'success' }));

        contactsService.createContact({} as IContactForm)
            .subscribe(() => { }, error => {
                expect(error).toBeDefined();
            });
    });
    it('createContact Should fail to create a Contact', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'createContact')
            .and.returnValue(throwError(httpError));

        contactsService.createContact({} as IContactForm)
            .subscribe(() => { }, error => onError(error));
    });

    it('deleteContact Should delete a Contact', () => {
        const contactId = 42;
        contactsService.deleteContact(contactId)
            .subscribe(id => {
                expect(id).toBeDefined('contact id is not defined');
                expect(id).toEqual(contactId, 'contact id is not same as sent parameter');
            });
    });
    it('deleteContact Should fail to delete a contact', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'deleteContact')
            .and.returnValue(of({ status: 'error' }));

        contactsService.deleteContact(42)
            .subscribe(() => { }, error => onError(error));
    });
    it('deleteContact Should fail to delete a contact', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'deleteContact')
            .and.returnValue(throwError(httpError));

        contactsService.deleteContact(42)
            .subscribe(() => { }, error => onError(error));
    });

    it('updateContact Should update a contact', () => {
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
    it('updateContact Should fail to update a contact', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'updateContact')
            .and.returnValue(throwError(httpError));

        contactsService.updateContact({} as IContactForm)
            .subscribe(() => { }, error => onError(error));
    });

    it('importContacts Should import a list of contacts', () => {
        const payload: IContactApiProps[] = [{
            id: null,
            client_id: null,
            country_code: 'MEX',
            phone_code: '+52',
            name: 'some1',
            last_name: 'name1',
            type: 'CLIENT',
            origin: 'MOBILE_APP',
            email: 'example@mail.com',
            phone: '1111111111',
            street_address: null,
            state_iso: null,
            city: null,
            created_at: null,
            updated_at: null,
            full_name: null,
        },
        {
            id: null,
            client_id: null,
            country_code: 'MEX',
            phone_code: '+52',
            name: 'some2',
            last_name: 'name2',
            type: 'CLIENT',
            origin: 'MOBILE_APP',
            email: 'example@mail.com',
            phone: '2222222222',
            street_address: null,
            state_iso: null,
            city: null,
            created_at: null,
            updated_at: null,
            full_name: null,
        }];

        contactsService.importContacts(payload)
            .subscribe(contactList => {
                expect(contactList.length).toEqual(payload.length, 'Imported Contacts list mismatch payload length');
                expect(contactList[0] instanceof ContactModel).toBeTruthy('Updated Contact instance mismatches ContactModel type');
            });
    });
    it('importContacts Should fail to import a list of contacts', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'importContacts')
            .and.returnValue(throwError(httpError));

        contactsService.importContacts([])
            .subscribe(() => { }, error => onError(error));
    });

    it('createInteraction Should create a contact interaction', () => {
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
    it('createInteraction Should fail to create a contact interaction', () => {
        nativeContactsSpy = spyOn(mockMontactsRepository, 'createInteraction')
            .and.returnValue(throwError(httpError));

        contactsService.createInteraction(42, {} as IGenericInteractionProps)
            .subscribe(() => { }, error => onError(error));
    });
});
