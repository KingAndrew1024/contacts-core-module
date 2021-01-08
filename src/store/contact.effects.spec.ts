import { TestBed } from '@angular/core/testing';
import { Contact } from '@ionic-native/contacts';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { ContactInteractionModel, ContactModel, IContactsService, ICountryCodes } from '../core';
import { CONTACTS_SERVICE } from '../services/identifiers';
import { ContactStore } from '../services/state/contact.store';
import { ContactsActionTypes } from './contact.actions';
import { AppState, ContactsEffects } from './contact.effects';


class MockContactsService {
    loadRemoteContacts() { }

    loadCountryCodes() { }

    loadContactInteractions() { }

    createContact() { }

    deleteContact() { }

    updateContact() { }

    importContacts() { }

    createInteraction() { }
}

describe('ContactsEffects', () => {
    let actions$ = new Observable<Action>();
    let effects: ContactsEffects;
    let store: MockStore<AppState>;
    let contactService: IContactsService<Contact, ContactModel>;

    const clientContactList = [
        { id: 1, name: 'hola', type: 'CLIENT' },
        { id: 2, name: 'hola', type: 'CLIENT' },
    ];

    const unknownClientList = [
        { id: 3, name: 'hola', type: 'NOT_SPECIFIED' },
        { id: 4, name: 'hola', type: 'NOT_SPECIFIED' },
    ];

    const prospectClientList = [
        { id: 5, name: 'hola', type: 'PROSPECT' },
        { id: 6, name: 'hola', type: 'PROSPECT' },
    ];

    const initialState = {
        contacts: {
            items: [
                ...clientContactList,
                ...unknownClientList,
                ...prospectClientList
            ]
        }
    };

    const errorString = 'some bad error';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContactStore,
                ContactsEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState }),
                { provide: CONTACTS_SERVICE, useClass: MockContactsService }
            ],
        });

        effects = TestBed.inject(ContactsEffects);
        store = TestBed.inject(MockStore);
        contactService = TestBed.inject(CONTACTS_SERVICE);
    });

    it('Should be created', () => {
        expect(effects).toBeTruthy('ContactsEffects not created');
    });

    it('load$ Should return a FetchContactSuccess action with the expected payload', (done: DoneFn) => {
        const expectedPayload: any = [{ hello: 'World' }];

        const spy = spyOn(contactService, 'loadRemoteContacts').and.returnValue(of(expectedPayload));

        actions$ = of({ type: ContactsActionTypes.FetchContactBegin });

        effects.load$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FetchContactSuccess);
            expect((response as any).contacList).toEqual(expectedPayload);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('load$ Should return a FetchContactFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(contactService, 'loadRemoteContacts').and.returnValue(throwError(errorString));

        actions$ = of({ type: ContactsActionTypes.FetchContactBegin });

        effects.load$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FetchContactFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toEqual(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('loadCountryCodes$ Should call a FetchCountryCodesSuccessAction with the expected payload', (done: DoneFn) => {
        const expectedPayload: any = [{ hello: 'World' }];

        const spy = spyOn(contactService, 'loadCountryCodes').and.returnValue(of(expectedPayload));

        actions$ = of({ type: ContactsActionTypes.FetchCountryCodesBegin });

        effects.loadCountryCodes$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FetchCountryCodesSuccess);
            expect((response as any).codes).toEqual(expectedPayload);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('loadCountryCodes$ Should return a FetchCountryCodesFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(contactService, 'loadCountryCodes').and.returnValue(throwError(errorString));

        actions$ = of({ type: ContactsActionTypes.FetchCountryCodesBegin });

        effects.loadCountryCodes$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FetchCountryCodesFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toEqual(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('loadInteractions$ Should return a FetchInteractionsSuccess action with the expected payload', (done: DoneFn) => {
        const expectedPayload: any = [{ hello: 'World' }];

        const spy = spyOn(contactService, 'loadContactInteractions').and.returnValue(of(expectedPayload));

        actions$ = of({ type: ContactsActionTypes.FetchInteractionsBegin });

        effects.loadInteractions$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FetchInteractionsSuccess);
            expect((response as any).interactions).toEqual(expectedPayload);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('loadInteractions$ Should return a FetchInteractionsFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(contactService, 'loadContactInteractions').and.returnValue(throwError(errorString));

        actions$ = of({ type: ContactsActionTypes.FetchInteractionsBegin });

        effects.loadInteractions$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FetchInteractionsFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toEqual(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('create$ Should return a CreateContactSuccess action with the expected payload', (done: DoneFn) => {
        const expectedPayload: any = { hello: 'World' };

        const spy = spyOn(contactService, 'createContact').and.returnValue(of(expectedPayload));

        actions$ = of({ type: ContactsActionTypes.CreateContactBegin });

        effects.create$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.CreateContactSuccess);
            expect((response as any).contact).toEqual(expectedPayload);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('create$ Should return a CreateContactFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(contactService, 'createContact').and.returnValue(throwError(errorString));

        actions$ = of({ type: ContactsActionTypes.CreateContactBegin });

        effects.create$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.CreateContactFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toEqual(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('delete$ Should return a DeleteContactSuccess action with the expected payload', (done: DoneFn) => {
        const expectedPayload: any = 123;

        const spy = spyOn(contactService, 'deleteContact').and.returnValue(of(expectedPayload));

        actions$ = of({ type: ContactsActionTypes.DeleteContactBegin });

        effects.delete$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.DeleteContactSuccess);
            expect((response as any).contactId).toBe(expectedPayload);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('delete$ Should return a DeleteContactFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(contactService, 'deleteContact').and.returnValue(throwError(errorString));

        actions$ = of({ type: ContactsActionTypes.DeleteContactBegin });

        effects.delete$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.DeleteContactFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toEqual(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('update$ Should return a UpdateContactSuccess action with expected payload', (done: DoneFn) => {
        const expectedPayload: any = { hello: 'World' };

        const spy = spyOn(contactService, 'updateContact').and.returnValue(of(expectedPayload));

        actions$ = of({ type: ContactsActionTypes.UpdateContactBegin });

        effects.update$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.UpdateContactSuccess);
            expect((response as any).contact).toBe(expectedPayload);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });
    it('update$ Should return a UpdateContactFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(contactService, 'updateContact').and.returnValue(throwError(errorString));

        actions$ = of({ type: ContactsActionTypes.UpdateContactBegin });

        effects.update$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.UpdateContactFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toEqual(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('import$ Should return a ImportContactSuccess action with the expected payload', (done: DoneFn) => {
        const expectedPayload: any = [{ hello: 'World' }];

        const spy = spyOn(contactService, 'importContacts').and.returnValue(of(expectedPayload));

        actions$ = of({ type: ContactsActionTypes.ImportContactBegin });

        effects.import$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.ImportContactSuccess);
            expect((response as any).contactList).toBe(expectedPayload);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });

    });
    it('import$ Should return a ImportContactFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(contactService, 'importContacts').and.returnValue(throwError(errorString));

        actions$ = of({ type: ContactsActionTypes.ImportContactBegin });

        effects.import$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.ImportContactFail);
            expect((response as any).errors).toBeDefined();
            expect((response as any).errors).toEqual(errorString);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        done();
    });

    it('filter$ Should return a FilterContactsSuccess action with the expected payload (filter: ALL)', (done: DoneFn) => {
        actions$ = of({ type: ContactsActionTypes.FilterContactsBegin, clientType: 'ALL' });

        effects.filter$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FilterContactsSuccess);
            expect((response as any).contactList).toBeDefined();
            done();
        });

    });
    it('filter$ Should return a FilterContactsSuccess action with the expected payload (fileter: CLIENT)', (done: DoneFn) => {
        actions$ = of({ type: ContactsActionTypes.FilterContactsBegin, clientType: 'CLIENT' });

        effects.filter$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FilterContactsSuccess);
            expect((response as any).contactList).toBeDefined();
            done();
        });

    });
    it('filter$ Should return a FilterContactsSuccess action with the expected payload (filter: NOT_SPECIFIED)', (done: DoneFn) => {
        actions$ = of({ type: ContactsActionTypes.FilterContactsBegin, clientType: 'NOT_SPECIFIED' });

        effects.filter$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FilterContactsSuccess);
            expect((response as any).contactList).toBeDefined();
            done();
        });

    });
    it('filter$ Should return a ImportContactFail action with the error object on failure', (done: DoneFn) => {

        store.setState({ contacts: { items: null } } as AppState);

        actions$ = of({ type: ContactsActionTypes.FilterContactsBegin, clientType: {} });

        effects.filter$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.FilterContactsFail);
            expect((response as any).errors).toBeDefined();
        });

        done();
    });

    it('createInteraction$ Should return a CreateInteractionSuccess action with the expected payload', (done: DoneFn) => {
        const expectedPayload: any = { hello: 'World' };

        const spy = spyOn(contactService, 'createInteraction').and.returnValue(of(expectedPayload));

        actions$ = of({ type: ContactsActionTypes.CreateInteractionBegin });

        effects.createInteraction$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.CreateInteractionSuccess);
            expect((response as any).interaction).toBe(expectedPayload);
        });

        done();
    });
    it('createInteraction$ Should return a CreateInteractionFail action with the error object on failure', (done: DoneFn) => {
        const spy = spyOn(contactService, 'createInteraction').and.returnValue(throwError(errorString));

        actions$ = of({ type: ContactsActionTypes.CreateInteractionBegin, clientType: {} });

        effects.createInteraction$.subscribe((response) => {
            expect(response.type).toEqual(ContactsActionTypes.CreateInteractionFail);
            expect((response as any).errors).toBeDefined();
        });

        done();
    });
});
