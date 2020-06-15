import { InjectionToken } from '@angular/core';
import { Contact } from '@ionic-native/contacts';
import { ContactModel } from '../core/models/contact.model';
import { IContactsService } from '../core/contracts/IContact.service';


export const CONTACTS_SERVICE = new InjectionToken<IContactsService<Contact, ContactModel>>('contactsService');

