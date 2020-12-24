import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CONTACT_TYPE, IContactForm, IGenericInteractionProps } from '../../core/contracts/IContact.repository';
import { ContactModel } from '../../core/models/contact.model';
import * as fromActions from '../../store/contact.actions';
import * as fromContacts from '../../store/contact.reducer';
import * as fromSelector from '../../store/contact.selectors';

@Injectable()
export class ContactStore {
    constructor(public store: Store<fromContacts.ContactState>) { }

    get Contacts$() {
        return this.store.select(fromSelector.getContactItems);
    }

    get Error$() {
        return this.store.select(fromSelector.getError);
    }

    get Success$() {
        return this.store.select(fromSelector.getSuccess);
    }

    get Interactions$() {
        return this.store.select(fromSelector.getContactInteractionItems);
    }

    get InteractionsError$() {
        return this.store.select(fromSelector.getContactInteractionError);
    }

    get InteractionsSuccess$() {
        return this.store.select(fromSelector.getSuccess);
    }

    ContactById$(id: number) {
        this.store.dispatch(fromActions.SelectContactAction({ contactId: id }));
        return this.store.select(fromSelector.getContactById);
    }

    get Loading$() {
        return this.store.select(fromSelector.getIsLoading);
    }

    get LoadingInteractions$() {
        return this.store.select(fromSelector.getIsLoadingInteractions);
    }

    fetchContacts() {
        this.store.dispatch(fromActions.FetchContactBeginAction());
    }

    fetchInteractions$(contactId: number) {
        this.store.dispatch(fromActions.FetchInteractionsBeginAction({ contactId }));
    }

    filterContacts(criteria: CONTACT_TYPE) {
        this.store.dispatch(fromActions.FilterContactsBeginAction({ clientType: criteria }));
    }
    get FilteredContacts$() {
        return this.store.select(fromSelector.getFilteredContactItems);
    }

    importContacts(contactList: ContactModel[]) {
        this.store.dispatch(fromActions.ImportContactBeginAction({ contactList }));
    }

    createContact(contactForm: IContactForm) {
        this.store.dispatch(fromActions.CreateContactBeginAction({ contactForm }));
    }

    deleteContact(contactId: number) {
        this.store.dispatch(fromActions.DeleteContactBeginAction({ contactId }));
    }

    updateContact(contactForm: IContactForm) {
        this.store.dispatch(fromActions.UpdateContactBeginAction({ contactForm }));
    }

    get HasBeenFetched$() {
        return this.store.select(fromSelector.hasBeenFetched);
    }

    fetchCountryCodes() {
        this.store.dispatch(fromActions.FetchCountryCodesBeginAction());
    }

    get LoadingCodes$() {
        return this.store.select(fromSelector.getIsLoadingCountryCodes);
    }

    get LoadinCodesErrors$() {
        return this.store.select(fromSelector.getCountryCodesErrors);
    }

    get CountryCodes$() {
        return this.store.select(fromSelector.getCountryCodes);
    }

    createInteraction(contactId: number, config: IGenericInteractionProps) {
        this.store.dispatch(fromActions.CreateInteractionBeginAction({ contactId, config }));
    }
}
