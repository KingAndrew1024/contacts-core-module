import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromContact from './contact.reducer';

export const getContactState = createFeatureSelector<fromContact.ContactState>('contacts');

export const getContactPageState = createSelector(
    getContactState,
    state => state
);

export const _getIsLoading = (state: fromContact.ContactState) => state.isLoading;
export const _getItems = (state: fromContact.ContactState) => state.items;
export const _getIsLoadingInteractions = (state: fromContact.ContactState) => state.interactions.isLoading;
export const _getInteractionItems = (state: fromContact.ContactState) => state.interactions.items;
export const _getFilteredItems = (state: fromContact.ContactState) => state.filteredItems;
export const _hasBeenFetched = (state: fromContact.ContactState) => state.hasBeenFetched;

export const getIsLoading = createSelector(
    getContactPageState,
    _getIsLoading
)

export const getError = createSelector(
    getContactPageState,
    state => state.error
)

export const getSuccess = createSelector(
    getContactPageState,
    state => state.success
)



export const getContactItems = createSelector(
    getContactPageState,
    _getItems
)

export const getIsLoadingInteractions = createSelector(
    getContactPageState,
    _getIsLoadingInteractions
)
export const getContactInteractionItems = createSelector(
    getContactPageState,
    _getInteractionItems
)
export const getContactInteractionError = createSelector(
    getContactPageState,
    state => state.interactions.error
)

export const getFilteredContactItems = createSelector(
    getContactPageState,
    _getFilteredItems
)

export const getIsLoadingCountryCodes = createSelector(
    getContactPageState,
    state => state.countryCodes.isLoading
)

export const getCountryCodes = createSelector(
    getContactPageState,
    state => state.countryCodes.items
)

export const getCountryCodesErrors = createSelector(
    getContactPageState,
    state => state.countryCodes.error
)

export const getContactById = createSelector(
    getContactPageState,
    state => state.items.filter(c => +c.id == state.selectedId)[0]
)

export const hasBeenFetched = createSelector(
    getContactPageState,
    _hasBeenFetched
)