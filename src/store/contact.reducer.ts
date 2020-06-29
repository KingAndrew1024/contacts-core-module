import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from './contact.actions';
import { ContactModel, ContactInteractionModel } from '../core/models/contact.model';
import { ICountryCodes } from '../core/contracts/IContact.repository';
import { IContactsStateError, IContactsStateSuccess } from '../core/contracts/IStateErrorSuccess';


export interface ContactState {
    isLoading: boolean
    items: ContactModel[]
    filteredItems: ContactModel[]
    selectedId: number
    interactions: {
        isLoading: boolean
        items: Array<ContactInteractionModel>
        error: any
    }
    hasBeenFetched: boolean

    countryCodes: {
        items: Array<ICountryCodes>
        isLoading: boolean
        error: any
    },
    error: IContactsStateError
    success: IContactsStateSuccess
}

export const initialState: ContactState = {
    isLoading: false,
    items: [],
    filteredItems: [],
    selectedId: null,
    interactions: {
        isLoading: false,
        items: [],
        error: null
    },
    countryCodes: {
        items: [],
        isLoading: false,
        error: null
    },
    hasBeenFetched: false,
    error: null,
    success: null
}

const reducer = createReducer(
    initialState,
    //On Begin Actions
    on(
        fromActions.FetchContactBeginAction,
        fromActions.CreateContactBeginAction,
        fromActions.DeleteContactBeginAction,
        fromActions.UpdateContactBeginAction,
        fromActions.ImportContactBeginAction,
        (state): ContactState => ({
            ...state,
            isLoading: true,
            error: null,
            success: null
        })
    ),
    on(
        fromActions.FetchCountryCodesBeginAction,
        (state): ContactState => ({
            ...state,
            countryCodes: {
                ...state.countryCodes,
                error: null,
                isLoading: true
            }
        })
    ),

    on(
        fromActions.FetchInteractionsBeginAction,
        (state): ContactState => ({
            ...state,
            interactions: {
                ...state.interactions,
                isLoading: true,
                items: [],
                error: null
            }
        })
    ),

    //ON Fail Actions
    on(
        fromActions.FetchContactFailAction,
        fromActions.CreateContactFailAction,
        fromActions.DeleteContactFailAction,
        fromActions.UpdateContactFailAction,
        fromActions.ImportContactFailAction,
        (state, action): ContactState => ({
            ...state,
            isLoading: false,
            error: { after: getErrorActionType(action.type), error: action.errors }
        })
    ),
    on(
        fromActions.FetchCountryCodesFailAction,
        (state, action): ContactState => ({
            ...state,
            countryCodes: {
                ...state.countryCodes,
                isLoading: false,
                error: { after: getErrorActionType(action.type), error: action.errors }
            }
        })
    ),

    on(
        fromActions.FetchInteractionsFailAction,
        (state, action): ContactState => ({
            ...state,
            interactions: {
                ...state.interactions,
                isLoading: false,
                error: { after: getErrorActionType(action.type), error: action.errors }
            }
        })
    ),
    on(
        fromActions.CreateInteractionFailAction,
        (state, action): ContactState => ({
            ...state,
            interactions: {
                ...state.interactions,
                isLoading: false,
                error: { after: getErrorActionType(action.type), error: action.errors }
            }
        })
    ),

    //ON Success Actions:
    //FETCH
    on(fromActions.FetchContactSuccessAction, (state, action): ContactState => ({
        ...state,
        isLoading: false,
        items: action.contacList,
        hasBeenFetched: true,
    })),

    on(fromActions.FetchCountryCodesSuccessAction, (state, action): ContactState => ({
        ...state,
        countryCodes: {
            ...state.countryCodes,
            items: action.codes,
            isLoading: false,
        }
    })),

    on(fromActions.FetchInteractionsSuccessAction, (state, action): ContactState => ({
        ...state,
        interactions: {
            ...state.interactions,
            isLoading: false,
            items: action.interactions
        }
    })),
    on(fromActions.CreateInteractionSuccessAction, (state, action): ContactState => ({
        ...state,
        interactions: {
            ...state.interactions,
            isLoading: false,
            items: [action.interaction, ...state.interactions.items]
        }
    })),

    //INSERT Contacts:
    on(fromActions.CreateContactSuccessAction, (state, action): ContactState => ({
        ...state,
        isLoading: false,
        items: [action.contact, ...state.items],
        success: { after: getSuccessActionType(action.type) }
    })),
    on(fromActions.ImportContactSuccessAction, (state, action): ContactState => ({
        ...state,
        isLoading: false,
        items: [...action.contactList, ...state.items],
        success: { after: getSuccessActionType(action.type) }
    })),

    //REMOVES Contacts
    on(fromActions.DeleteContactSuccessAction, (state, action): ContactState => ({
        ...state,
        isLoading: false,
        items: [
            ...state.items.filter((c: ContactModel) => c.id != action.contactId)
        ],
        success: { after: getSuccessActionType(action.type) }
    })),

    //UPDATES Contacts
    on(fromActions.UpdateContactSuccessAction, (state, action): ContactState => ({
        ...state,
        isLoading: false,
        items: [
            ...((cl) => {
                let tmp = [...cl];

                const idx = cl.findIndex((m) => m.id == action.contact.id);

                if (idx !== -1)
                    tmp.splice(idx, 1, action.contact)

                return tmp;
            })(state.items),
        ],
        success: { after: getSuccessActionType(action.type) }
    })),

    //FILTER
    on(fromActions.FilterContactsSuccessAction, (state, action): ContactState => ({
        ...state,
        filteredItems: action.contactList,
        isLoading: false,
        error: null,
        success: null
    })),

    //SELECT
    on(fromActions.SelectContactAction, (state, action): ContactState => ({
        ...state,
        selectedId: action.contactId,
        error: null,
        success: null
    })),
)

function getErrorActionType(type: fromActions.ContactsActionTypes) {

    let action: 'GET' | 'GET_INTERACTIONS' | 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT' | 'UNKNOWN' = "UNKNOWN";

    switch (type) {
        case fromActions.ContactsActionTypes.FetchContactFail:
            action = "GET"; break;
        case fromActions.ContactsActionTypes.FetchInteractionsFail:
            action = "GET_INTERACTIONS"; break;
        case fromActions.ContactsActionTypes.CreateContactFail:
            action = "CREATE"; break;
        case fromActions.ContactsActionTypes.UpdateContactFail:
            action = "UPDATE"; break;
        case fromActions.ContactsActionTypes.DeleteContactFail:
            action = "DELETE"; break;
        case fromActions.ContactsActionTypes.ImportContactFail:
            action = "IMPORT"; break;
    }

    return action;
}

function getSuccessActionType(type: fromActions.ContactsActionTypes) {

    let action: 'GET' | 'CREATE' | 'UPDATE' | 'DELETE' | 'IMPORT' | 'UNKNOWN' = "UNKNOWN";

    switch (type) {
        case fromActions.ContactsActionTypes.FetchContactSuccess:
            action = "GET"; break;
        case fromActions.ContactsActionTypes.CreateContactSuccess:
            action = "CREATE"; break;
        case fromActions.ContactsActionTypes.UpdateContactSuccess:
            action = "UPDATE"; break;
        case fromActions.ContactsActionTypes.DeleteContactSuccess:
            action = "DELETE"; break;
        case fromActions.ContactsActionTypes.ImportContactSuccess:
            action = "IMPORT"; break;
    }

    return action;
}

export function contactsReducer(state: ContactState | undefined, action: Action) {
    return reducer(state, action);
}