import { createAction, props } from '@ngrx/store';
import { CONTACT_TYPE, IContactApiProps, IContactForm, ICountryCodes, IGenericInteractionProps } from '../core/contracts/IContact.repository';
import { ContactInteractionModel, ContactModel } from '../core/models/contact.model';

export enum ContactsActionTypes {
    FetchContactBegin = '[Contacs] Fetch contact begin',
    FetchContactSuccess = '[Contacs] Fetch contact success',
    FetchContactFail = '[Contacs] Fetch contact failure',

    FetchInteractionsBegin = '[Contacs] Fetch Interactions begin',
    FetchInteractionsSuccess = '[Contacs] Fetch Interactions success',
    FetchInteractionsFail = '[Contacs] Fetch Interactions failure',

    CreateContactBegin = '[Contacs] Create begin',
    CreateContactSuccess = '[Contacs] Create success',
    CreateContactFail = '[Contacs] Create failure',

    DeleteContactBegin = '[Contacs] Delete contact begin',
    DeleteContactSuccess = '[Contacs] Delete contact success',
    DeleteContactFail = '[Contacs] Delete contact failure',

    UpdateContactBegin = '[Contacs] Update contact begin',
    UpdateContactSuccess = '[Contacs] Update contact success',
    UpdateContactFail = '[Contacs] Update contact failure',

    ImportContactBegin = '[Contacs] Import contact begin',
    ImportContactSuccess = '[Contacs] Import contact success',
    ImportContactFail = '[Contacs] Import contact failure',

    FilterContactsBegin = '[Contacs] Filter contact begin',
    FilterContactsSuccess = '[Contacs] Filter contact success',
    FilterContactsFail = '[Contacs] Filter contact failure',

    SelectContact = '[Contacs] Select contact',

    FetchCountryCodesBegin = '[Contacs] Fetch Country Codes Begin',
    FetchCountryCodesSuccess = '[Contacs] Fetch Country Codes Success',
    FetchCountryCodesFail = '[Contacs] Fetch Country Codes Fail',

    CreateInteractionBegin = '[Contacs] Create Interacion Begin',
    CreateInteractionSuccess = '[Contacs] Create Interacion Success',
    CreateInteractionFail = '[Contacs] Create Interacion Fail'
}

// Fetch contacts from remote API
export const FetchContactBeginAction = createAction(
    ContactsActionTypes.FetchContactBegin
);

export const FetchContactSuccessAction = createAction(
    ContactsActionTypes.FetchContactSuccess,
    props<{ contacList: ContactModel[] }>()
);

export const FetchContactFailAction = createAction(
    ContactsActionTypes.FetchContactFail,
    props<{ errors: any }>()
);

export const FetchInteractionsBeginAction = createAction(
    ContactsActionTypes.FetchInteractionsBegin,
    props<{ contactId: number }>()
);

export const FetchInteractionsSuccessAction = createAction(
    ContactsActionTypes.FetchInteractionsSuccess,
    props<{ interactions: ContactInteractionModel[] }>()
);

export const FetchInteractionsFailAction = createAction(
    ContactsActionTypes.FetchInteractionsFail,
    props<{ errors: any }>()
);

// Create contacts
export const CreateContactBeginAction = createAction(
    ContactsActionTypes.CreateContactBegin,
    props<{ contactForm: IContactForm }>()
);

export const CreateContactSuccessAction = createAction(
    ContactsActionTypes.CreateContactSuccess,
    props<{ contact: ContactModel }>()
);

export const CreateContactFailAction = createAction(
    ContactsActionTypes.CreateContactFail,
    props<{ errors: any }>()
);

// Delete contacts
export const DeleteContactBeginAction = createAction(
    ContactsActionTypes.DeleteContactBegin,
    props<{ contactId: number }>()
);

export const DeleteContactSuccessAction = createAction(
    ContactsActionTypes.DeleteContactSuccess,
    props<{ contactId: number }>()
);

export const DeleteContactFailAction = createAction(
    ContactsActionTypes.DeleteContactFail,
    props<{ errors: any }>()
);

// Update contacts
export const UpdateContactBeginAction = createAction(
    ContactsActionTypes.UpdateContactBegin,
    props<{ contactForm: IContactForm }>()
);

export const UpdateContactSuccessAction = createAction(
    ContactsActionTypes.UpdateContactSuccess,
    props<{ contact: ContactModel }>()
);

export const UpdateContactFailAction = createAction(
    ContactsActionTypes.UpdateContactFail,
    props<{ errors: any }>()
);

// Import contacts
export const ImportContactBeginAction = createAction(
    ContactsActionTypes.ImportContactBegin,
    props<{ contactList: IContactApiProps[] }>()
);

export const ImportContactSuccessAction = createAction(
    ContactsActionTypes.ImportContactSuccess,
    props<{ contactList: ContactModel[] }>()
);

export const ImportContactFailAction = createAction(
    ContactsActionTypes.ImportContactFail,
    props<{ errors: any }>()
);

// FILTERING
export const FilterContactsBeginAction = createAction(
    ContactsActionTypes.FilterContactsBegin,
    props<{ clientType: CONTACT_TYPE }>()
);

export const FilterContactsSuccessAction = createAction(
    ContactsActionTypes.FilterContactsSuccess,
    props<{ contactList: ContactModel[] }>()
);

export const FilterContactsFailAction = createAction(
    ContactsActionTypes.FilterContactsFail,
    props<{ errors: any }>()
);

export const SelectContactAction = createAction(
    ContactsActionTypes.SelectContact,
    props<{ contactId: number }>()
);

export const FetchCountryCodesBeginAction = createAction(
    ContactsActionTypes.FetchCountryCodesBegin
);

export const FetchCountryCodesSuccessAction = createAction(
    ContactsActionTypes.FetchCountryCodesSuccess,
    props<{ codes: Array<ICountryCodes> }>()
);

export const FetchCountryCodesFailAction = createAction(
    ContactsActionTypes.FetchCountryCodesFail,
    props<{ errors: any }>()
);

export const CreateInteractionBeginAction = createAction(
    ContactsActionTypes.CreateInteractionBegin,
    props<{ contactId: number, config: IGenericInteractionProps }>()
);

export const CreateInteractionSuccessAction = createAction(
    ContactsActionTypes.CreateInteractionSuccess,
    props<{ interaction: ContactInteractionModel }>()
);

export const CreateInteractionFailAction = createAction(
    ContactsActionTypes.CreateInteractionFail,
    props<{ errors: any }>()
);
