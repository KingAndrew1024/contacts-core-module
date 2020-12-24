import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContact from './contact.reducer';

export const getContactState = createFeatureSelector<fromContact.ContactState>('contacts');

export const getContactPageState = createSelector(
    getContactState,
    state => state
);

export const stateGetIsLoading = (state: fromContact.ContactState) => state.isLoading;
export const stateGetItems = (state: fromContact.ContactState) => state.items;
export const stateGetIsLoadingInteractions = (state: fromContact.ContactState) => state.interactions.isLoading;
export const stateGetInteractionItems = (state: fromContact.ContactState) => state.interactions.items;
export const stateGetFilteredItems = (state: fromContact.ContactState) => state.filteredItems;
export const stateHasBeenFetched = (state: fromContact.ContactState) => state.hasBeenFetched;

export const getIsLoading = createSelector(
    getContactPageState,
    stateGetIsLoading
);

export const getError = createSelector(
    getContactPageState,
    (state) => {
        console.log('getError.state', state);

        return state.error;
    }
);

export const getSuccess = createSelector(
    getContactPageState,
    state => state.success
);



export const getContactItems = createSelector(
    getContactPageState,
    stateGetItems
);

export const getIsLoadingInteractions = createSelector(
    getContactPageState,
    stateGetIsLoadingInteractions
);
export const getContactInteractionItems = createSelector(
    getContactPageState,
    stateGetInteractionItems
);
export const getContactInteractionError = createSelector(
    getContactPageState,
    state => state.interactions.error
);

export const getFilteredContactItems = createSelector(
    getContactPageState,
    stateGetFilteredItems
);

export const getIsLoadingCountryCodes = createSelector(
    getContactPageState,
    state => state.countryCodes.isLoading
);

export const getCountryCodes = createSelector(
    getContactPageState,
    state => state.countryCodes.items
);

export const getCountryCodesErrors = createSelector(
    getContactPageState,
    state => state.countryCodes.error
);

export const getContactById = createSelector(
    getContactPageState,
    state => state.items.filter(c => +c.id === state.selectedId)[0]
);

export const hasBeenFetched = createSelector(
    getContactPageState,
    stateHasBeenFetched
);
