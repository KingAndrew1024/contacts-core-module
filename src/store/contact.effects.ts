import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import * as fromActions from './contact.actions';
import * as fromReducer from './contact.reducer';
import { ContactsService } from '../services/contacts.service';
import { ContactModel, ContactInteractionModel } from '../core/models/contact.model';
import { ICountryCodes } from '../core/contracts/IContact.repository';




@Injectable()
export class ContactsEffects {

    load$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.ContactsActionTypes.FetchContactBegin),
            switchMap(() => {
                return this.service.loadRemoteContacts().pipe(
                    map((contacList: ContactModel[]) => fromActions.FetchContactSuccessAction({ contacList })),
                    catchError(error => {
                        console.error("Couldn't fetch contacts");
                        return of(fromActions.FetchContactFailAction({ errors: error }));
                    })
                )
            }),
        )
    )

    loadCountryCodes$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.ContactsActionTypes.FetchCountryCodesBegin),
            switchMap(() => {
                return this.service.loadCountryCodes().pipe(
                    map((codes: ICountryCodes[]) => fromActions.FetchCountryCodesSuccessAction({ codes })),
                    catchError(error => {
                        console.error("Couldn't fetch contacts");
                        return of(fromActions.FetchCountryCodesFailAction({ errors: error }));
                    })
                )
            }),
        )
    )

    loadInteractions$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.ContactsActionTypes.FetchInteractionsBegin),
            switchMap((action: any) => {
                return this.service.loadContactInteractions(action.contactId).pipe(
                    map((interactions: ContactInteractionModel[]) => fromActions.FetchInteractionsSuccessAction({ interactions })),
                    catchError(error => {
                        console.error("Couldn't fetch contact interactions");
                        return of(fromActions.FetchInteractionsFailAction({ errors: error }));
                    })
                )
            }),
        )
    )

    create$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.ContactsActionTypes.CreateContactBegin),
            switchMap((action: any) => {
                return this.service.createContact(action.contactForm).pipe(
                    map((contact: ContactModel) => fromActions.CreateContactSuccessAction({ contact })),
                    catchError(errors => {
                        console.error("Couldn't Create contact");
                        return of(fromActions.CreateContactFailAction({ errors }));
                    })
                )
            })
        )
    )

    delete$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.ContactsActionTypes.DeleteContactBegin),
            switchMap((action: any) => this.service.deleteContact(action.contactId).pipe(
                map(contactId => fromActions.DeleteContactSuccessAction({ contactId })),
                catchError(errors => {
                    console.error("Couldn't Delete contact");
                    return of(fromActions.DeleteContactFailAction({ errors }));
                })
            )
            )
        )
    )

    update$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.ContactsActionTypes.UpdateContactBegin),
            switchMap((action: any) => this.service.updateContact(action.contactForm).pipe(
                map((updatedContact) => fromActions.UpdateContactSuccessAction({ contact: updatedContact })),
                catchError(errors => {
                    console.error("Couldn't Update contact");
                    return of(fromActions.UpdateContactFailAction({ errors }));
                })
            ))
        )
    )


    import$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.ContactsActionTypes.ImportContactBegin),
            switchMap((action: any) => {
                return this.service.importContacts(action.contactList).pipe(
                    map(contactList => {
                        return fromActions.ImportContactSuccessAction({ contactList })
                    }),
                    catchError(errors => {
                        return of(fromActions.ImportContactFailAction({ errors }))
                    })
                )
            })
        )
    )

    filter$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.ContactsActionTypes.FilterContactsBegin),
            withLatestFrom(this.store$),
            switchMap(([action, store]) => {
                let contactList = (<any>action).clientType == "ALL" ? store.contacts.items :
                    store.contacts.items.filter(item => item.type == (<any>action).clientType);
                return of(
                    fromActions.FilterContactsSuccessAction({ contactList })
                );
            }),
            catchError(e => {
                console.error("Filter contacts Error", e);
                throw e
            })
        )
    )

    constructor(
        private actions$: Actions,
        private store$: Store<AppState>,
        private service: ContactsService
    ) { }
}

interface AppState{
    contacts: fromReducer.ContactState,
}