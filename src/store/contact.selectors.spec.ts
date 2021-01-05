import * as fromReducer from './contact.reducer';
import {
    getContactById,
    getContactInteractionError,
    getContactPageState,
    getCountryCodes,
    getCountryCodesErrors,
    getError,
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
    const state = fromReducer.initialState;

    it('getContactPageState should retrieve state', () => {
        expect(getContactPageState({ contacts: state })).toBe(state);
    });

    it('stateGetIsLoading should retrieve state.isLoading value', () => {
        expect(stateGetIsLoading(state)).toBe(state.isLoading);
    });

    it('stateGetItems should retrieve state.items value', () => {
        expect(stateGetItems(state)).toBe(state.items);
    });

    it('stateGetIsLoadingInteractions should retrieve state.interactions.isLoading value', () => {
        expect(stateGetIsLoadingInteractions(state)).toBe(state.interactions.isLoading);
    });

    it('stateGetInteractionItems should retrieve state.interactions.items value', () => {
        expect(stateGetInteractionItems(state)).toBe(state.interactions.items);
    });

    it('stateGetFilteredItems should retrieve state.filteredItems value', () => {
        expect(stateGetFilteredItems(state)).toBe(state.filteredItems);
    });

    it('stateHasBeenFetched should retrieve state.hasBeenFetched value', () => {
        expect(stateHasBeenFetched(state)).toBe(state.hasBeenFetched);
    });

    it('getIsLoading should retrieve state.isLoading value', () => {
        expect(getIsLoading({ contacts: state })).toBe(state.isLoading);
    });

    it('getError should retrieve state.error value', () => {
        expect(getError({ contacts: state })).toBe(state.error);
    });

    it('getSuccess should retrieve state.success value', () => {
        expect(getSuccess({ contacts: state })).toBe(state.success);
    });

    it('getContactInteractionError should retrieve state.interactions.error value', () => {
        expect(getContactInteractionError({ contacts: state })).toBe(state.interactions.error);
    });

    it('getIsLoadingCountryCodes should retrieve state.countryCodes.isLoading value', () => {
        expect(getIsLoadingCountryCodes({ contacts: state })).toBe(state.countryCodes.isLoading);
    });

    it('getCountryCodes should retrieve state.countryCodes.items value', () => {
        expect(getCountryCodes({ contacts: state })).toBe(state.countryCodes.items);
    });

    it('getCountryCodesErrors should retrieve state.countryCodes.error value', () => {
        expect(getCountryCodesErrors({ contacts: state })).toBe(state.countryCodes.error);
    });

    it('getContactById should retrieve a contact value', () => {
        expect(getContactById({ contacts: state })).toBe(state.items.filter(c => +c.id === state.selectedId)[0]);
    });

    it('getContactById should retrieve an empty contact value', () => {
        const state2 = { contacts: { ...state, selectedId: 123 } };
        expect(getContactById(state2)).not.toBeDefined();
    });
});
