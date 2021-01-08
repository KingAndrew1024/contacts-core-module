import * as fromReducer from './contact.reducer';
import * as fromActions from './contact.actions';
import { ContactInteractionModel, ContactModel, IContactForm } from '../core';


describe('ContactReducer', () => {
    const { initialState } = fromReducer;

    const thrownError = 'some bad error';


    describe('On unknown Action', () => {
        it('should return the default state', () => {

            const action = { type: 'Unknown' };

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toBe(initialState);
        });
    });

    describe('On Begin Actions', () => {
        it('should set State.isLoading = true', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                isLoading: true
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.FetchContactBeginAction();
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);

            const createAction = fromActions.CreateContactBeginAction({ contactForm: {} as IContactForm });
            state = fromReducer.contactsReducer(initialState, createAction);
            expect(state).toEqual(expectedState);

            const deleteAction = fromActions.DeleteContactBeginAction({ contactId: 123 });
            state = fromReducer.contactsReducer(initialState, deleteAction);
            expect(state).toEqual(expectedState);

            const updateAction = fromActions.UpdateContactBeginAction({ contactForm: {} as IContactForm });
            state = fromReducer.contactsReducer(initialState, updateAction);
            expect(state).toEqual(expectedState);

            const importAction = fromActions.ImportContactBeginAction({ contactList: [] });
            state = fromReducer.contactsReducer(initialState, importAction);
            expect(state).toEqual(expectedState);
        });

        it('FetchCountryCodesBeginAction should set State.countryCodes.isLoading = true', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                countryCodes: {
                    ...initialState.countryCodes,
                    isLoading: true
                }
            };

            const fetchCountryCodesAction = fromActions.FetchCountryCodesBeginAction();
            const state = fromReducer.contactsReducer(initialState, fetchCountryCodesAction);
            expect(state).toEqual(expectedState);
        });

        it('FetchInteractionsBeginAction should set State.interactions.isLoading = true', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                interactions: {
                    ...initialState.interactions,
                    isLoading: true
                }
            };

            const fetchInteractionsAction = fromActions.FetchInteractionsBeginAction({ contactId: 123 });
            const state = fromReducer.contactsReducer(initialState, fetchInteractionsAction);
            expect(state).toEqual(expectedState);
        });
    });

    describe('On Success Actions should update the State', () => {
        it('FetchContactSuccessAction', () => {

            const items = [{
                id: 123,
                name: 'Tests',
                countryCode: 'MEX',
                phoneCode: '+52'
            }];

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                items,
                hasBeenFetched: true,
                success: { after: 'GET' }
            };

            const action = fromActions.FetchContactSuccessAction({ contacList: items });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('FetchCountryCodesSuccessAction', () => {

            const items = [{
                name: 'some name',
                translations: { es: 'some translation' },
                flag: 'some fake url',
                alpha3Code: 'string',
                callingCodes: ['+52']
            }];

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                countryCodes: {
                    ...initialState.countryCodes,
                    items
                }
            };

            const action = fromActions.FetchCountryCodesSuccessAction({ codes: items });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('FetchInteractionsSuccessAction', () => {

            const items: ContactInteractionModel[] = [{
                id: 123,
                contactId: 1,
                entity: '12345',
                entityId: 1234,
                actionType: 'UPDATE_TYPE',
                createdAt: '12/12/2020',
                displayText: 'some text'
            }];

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                interactions: {
                    ...initialState.interactions,
                    items
                }
            };

            const action = fromActions.FetchInteractionsSuccessAction({ interactions: items });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('CreateInteractionSuccessAction', () => {

            const item: ContactInteractionModel = {
                id: 123,
                contactId: 1,
                entity: '1234',
                entityId: 1234,
                actionType: 'CREATE',
                createdAt: '12/12/2020',
                displayText: 'some text'
            };

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                interactions: {
                    ...initialState.interactions,
                    items: [item, ...initialState.interactions.items]
                }
            };

            const action = fromActions.CreateInteractionSuccessAction({ interaction: item });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('CreateContactSuccessAction', () => {

            const item: ContactModel = {
                id: 123,
                name: 'some name',
                countryCode: 'MEX',
                phoneCode: '+52'
            };

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                items: [item, ...initialState.items],
                success: { after: 'CREATE' }
            };

            const action = fromActions.CreateContactSuccessAction({ contact: item });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('ImportContactSuccessAction', () => {

            const items: ContactModel[] = [{
                id: 123,
                name: 'some name',
                countryCode: 'MEX',
                phoneCode: '+52'
            },
            {
                id: 987,
                name: 'other name',
                countryCode: 'MEX',
                phoneCode: '+52'
            }];

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                items: [...items, ...initialState.items],
                success: { after: 'IMPORT' }
            };

            const action = fromActions.ImportContactSuccessAction({ contactList: items });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('DeleteContactSuccessAction', () => {

            const item1: ContactModel = {
                id: 123,
                name: 'item 1',
                countryCode: 'MEX',
                phoneCode: '+52'
            };
            const item2: ContactModel = {
                id: 987,
                name: 'item 2',
                countryCode: 'MEX',
                phoneCode: '+52'
            };

            initialState.items = [item1, item2];

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                items: [item1],
                success: { after: 'DELETE' }
            };

            const action = fromActions.DeleteContactSuccessAction({ contactId: item2.id });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('UpdateContactSuccessAction', () => {

            const item1: ContactModel = {
                id: 123,
                name: 'item 1',
                countryCode: 'MEX',
                phoneCode: '+52'
            };
            const item2: ContactModel = {
                id: 987,
                name: 'item 2',
                countryCode: 'MEX',
                phoneCode: '+52'
            };
            const updatedItem: ContactModel = {
                id: 987,
                name: 'item 2 updated',
                countryCode: 'MEX',
                phoneCode: '+52'
            };

            initialState.items = [item1, item2];

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                items: [item1, updatedItem],
                success: { after: 'UPDATE' }
            };

            const action = fromActions.UpdateContactSuccessAction({ contact: updatedItem });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('FilterContactsSuccessAction', () => {

            const items = [{
                id: 123,
                name: 'some updated name',
                countryCode: 'MEX',
                phoneCode: '+52'
            },
            {
                id: 987,
                name: 'fake name',
                countryCode: 'MEX',
                phoneCode: '+52'
            }];

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                filteredItems: items
            };

            const action = fromActions.FilterContactsSuccessAction({ contactList: items });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });

        it('SelectContactAction', () => {

            const selectedId = 123;

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                selectedId
            };

            const action = fromActions.SelectContactAction({ contactId: selectedId });

            const state = fromReducer.contactsReducer(initialState, action);

            expect(state).toEqual(expectedState);
        });
    });

    describe('On Fail Actions', () => {
        it('FetchContactFailAction should set State.error', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                error: { after: 'GET', error: thrownError }
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.FetchContactFailAction({ errors: thrownError });
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);
        });

        it('CreateContactFailAction should set State.error', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                error: { after: 'CREATE', error: thrownError }
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.CreateContactFailAction({ errors: thrownError });
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);
        });

        it('DeleteContactFailAction should set State.error', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                error: { after: 'DELETE', error: thrownError }
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.DeleteContactFailAction({ errors: thrownError });
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);
        });

        it('UpdateContactFailAction should set State.error', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                error: { after: 'UPDATE', error: thrownError }
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.UpdateContactFailAction({ errors: thrownError });
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);
        });

        it('ImportContactFailAction should set State.error', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                error: { after: 'IMPORT', error: thrownError }
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.ImportContactFailAction({ errors: thrownError });
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);
        });

        it('FetchCountryCodesFailAction should set State.error', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                countryCodes: {
                    ...initialState.countryCodes,
                    error: { after: 'GET', error: thrownError }
                }
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.FetchCountryCodesFailAction({ errors: thrownError });
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);
        });

        it('FetchInteractionsFailAction should set State.error', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                interactions: {
                    ...initialState.interactions,
                    error: { after: 'GET_INTERACTIONS', error: thrownError }
                }
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.FetchInteractionsFailAction({ errors: thrownError });
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);
        });

        it('CreateInteractionFailAction should set State.error', () => {

            const expectedState: fromReducer.ContactState = {
                ...initialState,
                interactions: {
                    ...initialState.interactions,
                    error: { after: 'CREATE', error: thrownError }
                }
            };

            let state: fromReducer.ContactState;

            const fetchAction = fromActions.CreateInteractionFailAction({ errors: thrownError });
            state = fromReducer.contactsReducer(initialState, fetchAction);
            expect(state).toEqual(expectedState);
        });
    });
});
