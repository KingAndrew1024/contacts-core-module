import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { TEST_CONTACT_MODEL_LIST } from '../../mocks/contacts.data';
import * as fromReducer from '../../store/contact.reducer';
import * as fromSelector from '../../store/contact.selectors';
import * as fromActions from '../../store/contact.actions';
import { ContactStore } from './contact.store';
import { CONTACT_TYPE, IContactForm } from '../../core';

describe('ContactStore', () => {

    // let storeSpy: any;
    let store: any;
        // MockStore<AppState>;
        // Store<AppState>;
    let contactStore: ContactStore;

    const initialState = {
        contacts: {
            ...fromReducer.initialState,
            items: TEST_CONTACT_MODEL_LIST
        }
    };

    const thrownError = 'some bad error';

    beforeEach(() => {
        // storeSpy = jasmine.createSpyObj('store', ['select']);

        TestBed.configureTestingModule({
            providers: [
                // provideMockStore({ initialState }),
                {
                    provide: Store,
                    useValue: {pipe: () => of(true), select: () => of(true), dispatch: (val) => {}}// StoreMock,
                },
                ContactStore,
            ]
        });

        contactStore = TestBed.inject(ContactStore);
        // store = TestBed.inject(MockStore);
        store = TestBed.inject(Store);

        spyOn(store, 'select').and.returnValue(of(true));
        spyOn(store, 'dispatch').and.callThrough();
    });


    it('Contacts$ shoud call select once with parameter fromSelector.getContactItems', (done: DoneFn) => {
        contactStore.Contacts$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getContactItems);
            done();
        });
    });

    it('Error$ shoud call select once with parameter fromSelector.getError', (done: DoneFn) => {
        /*const mockLoadingSelector = store.overrideSelector(getIsLoading, false);
        mockLoadingSelector.setResult(isLoading);*/

        contactStore.Error$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getError);
            done();
        });
    });

    it('Success$ shoud call select once with parameter fromSelector.getSuccess', (done: DoneFn) => {
        contactStore.Success$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getSuccess);
            done();
        });
    });

    it('Interactions$ shoud call select once with parameter fromSelector.getContactInteractionItems', (done: DoneFn) => {
        contactStore.Interactions$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getContactInteractionItems);
            done();
        });
    });

    it('InteractionsError$ shoud call select once with parameter fromSelector.getContactInteractionError', (done: DoneFn) => {
        contactStore.InteractionsError$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getContactInteractionError);
            done();
        });
    });

    it('InteractionsSuccess$ shoud call select once with parameter fromSelector.getSuccess', (done: DoneFn) => {
        contactStore.InteractionsSuccess$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getSuccess);
            done();
        });
    });

    it('Loading$ shoud call select once with parameter fromSelector.getIsLoading', (done: DoneFn) => {
        contactStore.Loading$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getIsLoading);
            done();
        });
    });

    it('LoadingInteractions$ shoud call select once with parameter fromSelector.getIsLoadingInteractions', (done: DoneFn) => {
        contactStore.LoadingInteractions$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getIsLoadingInteractions);
            done();
        });
    });

    it('FilteredContacts$ shoud call select once with parameter fromSelector.getFilteredContactItems', (done: DoneFn) => {
        contactStore.FilteredContacts$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getFilteredContactItems);
            done();
        });
    });

    it('HasBeenFetched$ shoud call select once with parameter fromSelector.hasBeenFetched', (done: DoneFn) => {
        contactStore.HasBeenFetched$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.hasBeenFetched);
            done();
        });
    });

    it('LoadingCodes$ shoud call select once with parameter fromSelector.getIsLoadingCountryCodes', (done: DoneFn) => {
        contactStore.LoadingCodes$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getIsLoadingCountryCodes);
            done();
        });
    });

    it('LoadinCodesErrors$ shoud call select once with parameter fromSelector.getCountryCodesErrors', (done: DoneFn) => {
        contactStore.LoadinCodesErrors$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getCountryCodesErrors);
            done();
        });
    });

    it('CountryCodes$ shoud call select once with parameter fromSelector.getCountryCodes', (done: DoneFn) => {
        contactStore.CountryCodes$.subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getCountryCodes);
            done();
        });
    });

    it('ContactById$ shoud call select once with parameter fromSelector.getContactById', (done: DoneFn) => {
        contactStore.ContactById$(123).subscribe(resp => {
            expect(contactStore.store.select).toHaveBeenCalledTimes(1);
            expect(contactStore.store.select as any).toHaveBeenCalledWith(fromSelector.getContactById);
            done();
        });
    });

    it('ContactById$ shoud call dispatch once with parameter fromActions.SelectContactAction({ contactId: number })', (done: DoneFn) => {
        const contactId = 987;
        contactStore.ContactById$(contactId).subscribe(resp => {
            expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
            expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
                fromActions.SelectContactAction({ contactId })
            );
            done();
        });
    });

    it('fetchContacts shoud call dispatch once with parameter fromActions.FetchContactBeginAction()', (done: DoneFn) => {
        contactStore.fetchContacts();
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(fromActions.FetchContactBeginAction());
        done();
    });

    it('fetchInteractions shoud call dispatch once with parameter fromActions.FetchContactBeginAction()', (done: DoneFn) => {
        const contactId = 765;
        contactStore.fetchInteractions$(contactId);
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
            fromActions.FetchInteractionsBeginAction({ contactId})
        );
        done();
    });

    it('filterContacts shoud call dispatch once with parameter fromActions.FilterContactsBeginAction()', (done: DoneFn) => {
        const clientType: CONTACT_TYPE = 'CLIENT';
        contactStore.filterContacts(clientType);
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
            fromActions.FilterContactsBeginAction({ clientType })
        );
        done();
    });

    it('importContacts shoud call dispatch once with parameter fromActions.ImportContactBeginAction()', (done: DoneFn) => {
        const contactList = TEST_CONTACT_MODEL_LIST;
        contactStore.importContacts(contactList);
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
            fromActions.ImportContactBeginAction({ contactList })
        );
        done();
    });

    it('createContact shoud call dispatch once with parameter fromActions.CreateContactBeginAction()', (done: DoneFn) => {
        const contactForm: IContactForm = {
            name: 'Test',
            last_name: 'User',
            type: 'NOT_SPECIFIED',
            country_code: 'MEX',
            phone_code: '+52'
        };
        contactStore.createContact(contactForm);
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
            fromActions.CreateContactBeginAction({ contactForm })
        );
        done();
    });

    it('deleteContact shoud call dispatch once with parameter fromActions.DeleteContactBeginAction()', (done: DoneFn) => {
        const contactId = 123;
        contactStore.deleteContact(contactId);
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
            fromActions.DeleteContactBeginAction({ contactId })
        );
        done();
    });

    it('updateContact shoud call dispatch once with parameter fromActions.UpdateContactBeginAction()', (done: DoneFn) => {
        const contactForm: IContactForm = {
            name: 'Test',
            last_name: 'User',
            type: 'NOT_SPECIFIED',
            country_code: 'MEX',
            phone_code: '+52',
            id: 123
        };

        contactStore.updateContact(contactForm);
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
            fromActions.UpdateContactBeginAction({ contactForm })
        );
        done();
    });

    it('fetchCountryCodes shoud call dispatch once with parameter fromActions.FetchCountryCodesBeginAction()', (done: DoneFn) => {
        contactStore.fetchCountryCodes();
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
            fromActions.FetchCountryCodesBeginAction()
        );
        done();
    });

    it('createInteraction shoud call dispatch once with parameter fromActions.CreateInteractionBeginAction()', (done: DoneFn) => {
        const contactId = 123;
        const config = {
            action_type: 'some fake action',
            entity: 'some fake entity',
            entity_id: 123
        };

        contactStore.createInteraction(contactId, config);
        expect(contactStore.store.dispatch).toHaveBeenCalledTimes(1);
        expect(contactStore.store.dispatch as any).toHaveBeenCalledWith(
            fromActions.CreateInteractionBeginAction({ contactId, config })
        );
        done();
    });
});
