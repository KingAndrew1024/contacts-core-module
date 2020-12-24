import { InjectionToken } from '@angular/core';
import { Contact } from '@ionic-native/contacts';
import { IContactRepository } from '../core';
import { IContactsService } from '../core/contracts/IContact.service';
import { ContactModel } from '../core/models/contact.model';

export const CONTACTS_SERVICE = new InjectionToken<IContactsService<Contact, ContactModel>>('contactsService');
export const CONTACTS_REPOSITORY = new InjectionToken<IContactRepository>('contactsRepository');
