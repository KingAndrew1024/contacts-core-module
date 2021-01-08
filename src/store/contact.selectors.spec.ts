import * as fromReducer from './contact.reducer';
import {
    getContactById,
    getContactInteractionError,
    getContactPageState,
    getCountryCodes,
    getCountryCodesErrors,
    getError,
    getFilteredContactItems,
    getIsLoading,
    getIsLoadingCountryCodes,
    getSuccess,
    stateGetFilteredItems,
    stateGetInteractionItems,
    stateGetIsLoading,
    stateGetIsLoadingInteractions,
    stateGetItems,
    stateHasBeenFetched
} from './contact.selectors';

describe('Contact Selectors', () => {
    const clientContactList: any = [
        { id: 1, name: 'hola', type: 'CLIENT' },
        { id: 2, name: 'hola', type: 'CLIENT' },
    ];

    const unknownClientList: any = [
        { id: 3, name: 'hola', type: 'NOT_SPECIFIED' },
        { id: 4, name: 'hola', type: 'NOT_SPECIFIED' },
    ];

    const prospectClientList: any = [
        { id: 5, name: 'hola', type: 'PROSPECT' },
        { id: 6, name: 'hola', type: 'PROSPECT' },
    ];


    const expectedIsLoading = true;
    const expectedItems = [
        ...clientContactList,
        ...unknownClientList,
        ...prospectClientList
    ];
    const expectedFilteredItems = prospectClientList;
    const expectedSelectedId = 3;
    const expectedInteractions = {
        isLoading: false,
        items: [],
        error: null
    };
    const expectedHasBeenFetched = true;

    const state: fromReducer.ContactState = {
        ...fromReducer.initialState,
        isLoading: expectedIsLoading,
        items: expectedItems,
        filteredItems: expectedFilteredItems,
        selectedId: expectedSelectedId,
        interactions: expectedInteractions,
        countryCodes: {
            items: [],
            isLoading: false,
            error: null
        },
        hasBeenFetched: expectedHasBeenFetched,
        error: null,
        success: null
    };

    const appState = { contacts: state };

    it('getContactPageState should retrieve state', () => {
        expect(getContactPageState(appState)).toBe(state);
    });

    it('stateGetIsLoading should retrieve state.isLoading value', () => {
        expect(stateGetIsLoading(state)).toBe(expectedIsLoading);
    });

    it('stateGetItems should retrieve state.items value', () => {
        expect(stateGetItems(state)).toBe(expectedItems);
    });

    it('stateGetIsLoadingInteractions should retrieve state.interactions.isLoading value', () => {
        expect(stateGetIsLoadingInteractions(state)).toBe(expectedInteractions.isLoading);
    });

    it('stateGetInteractionItems should retrieve state.interactions.items value', () => {
        expect(stateGetInteractionItems(state)).toBe(expectedInteractions.items);
    });

    it('stateGetFilteredItems should retrieve state.filteredItems value', () => {
        expect(stateGetFilteredItems(state)).toBe(expectedFilteredItems);
    });

    it('stateHasBeenFetched should retrieve state.hasBeenFetched value', () => {
        expect(stateHasBeenFetched(state)).toBe(expectedHasBeenFetched);
    });

    it('getIsLoading should retrieve state.isLoading value', () => {
        expect(getIsLoading(appState)).toBe(expectedIsLoading);
    });

    it('getError should retrieve state.error value', () => {
        expect(getError(appState)).toBe(state.error);
    });

    it('getSuccess should retrieve state.success value', () => {
        expect(getSuccess(appState)).toBe(state.success);
    });

    it('getContactInteractionError should retrieve state.interactions.error value', () => {
        expect(getContactInteractionError(appState)).toBe(expectedInteractions.error);
    });

    it('getIsLoadingCountryCodes should retrieve state.countryCodes.isLoading value', () => {
        expect(getIsLoadingCountryCodes(appState)).toBe(state.countryCodes.isLoading);
    });

    it('getCountryCodes should retrieve state.countryCodes.items value', () => {
        expect(getCountryCodes(appState)).toBe(state.countryCodes.items);
    });

    it('getCountryCodesErrors should retrieve state.countryCodes.error value', () => {
        expect(getCountryCodesErrors(appState)).toBe(state.countryCodes.error);
    });

    it('getContactById should retrieve a contact value', () => {
        expect(getContactById(appState)).toEqual(unknownClientList.filter(c => c.id === expectedSelectedId)[0]);
    });

    it('getContactById should retrieve an empty contact value', () => {
        const state2 = { contacts: { ...state, selectedId: 123 } };
        expect(getContactById(state2)).not.toBeDefined();
    });
});
