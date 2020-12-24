import { ContactModel, IContactApiProps, IContactInteractionsApiProps } from '../core';

export const TEST_CONTACT_API_LIST: IContactApiProps[] = [{
    id: '2',
    client_id: '3',
    name: 'Daniel',
    last_name: 'Higgins',
    type: 'NOT_SPECIFIED',
    origin: 'WEB',
    email: 'd-higgins@mac.com',
    country_code: 'MEX',
    phone: '5554787672',
    street_address: '',
    state_iso: '',
    city: '',
    created_at: '2020-07-23 10:29:59',
    updated_at: '2020-07-23 10:29:59',
    phone_code: '+52',
    full_name: 'Daniel Higgins'
}, {
    id: '3',
    client_id: '3',
    name: 'David',
    last_name: 'Taylor',
    type: 'NOT_SPECIFIED',
    origin: 'WEB',
    email: '',
    country_code: 'MEX',
    phone: '5556106679',
    street_address: '',
    state_iso: '',
    city: '',
    created_at: '2020-07-23 10:29:59',
    updated_at: '2020-07-23 10:29:59',
    phone_code: '+52',
    full_name: 'David Taylor'
},
{
    id: '5',
    client_id: '3',
    name: 'John',
    last_name: 'Appleseed',
    type: 'PROSPECT',
    origin: 'WEB',
    email: 'John-Appleseed@mac.com',
    country_code: 'MEX',
    phone: '8885555512',
    street_address: '',
    state_iso: '',
    city: '',
    created_at: '2020-07-23 10:29:59',
    updated_at: '2020-09-28 15:11:03',
    phone_code: '+52',
    full_name: 'John Appleseed'
},
{
    id: '9',
    client_id: '3',
    name: 'Daniel',
    last_name: 'test',
    type: 'PROSPECT',
    origin: 'MOBILE_APP',
    email: 'daniel@testemail.com',
    country_code: 'MEX',
    phone: '4567851235',
    street_address: '',
    state_iso: null,
    city: '',
    created_at: '2020-10-26 17:33:18',
    updated_at: '2020-10-26 17:33:18',
    phone_code: '+52',
    full_name: 'Daniel test'
},
{
    id: '11',
    client_id: '3',
    name: 'Pedro',
    last_name: 'quinzanos',
    type: 'NOT_SPECIFIED',
    origin: 'MOBILE_APP',
    email: 'pquinzanos@gmail.com',
    country_code: 'MEX',
    phone: '5555555555',
    street_address: '',
    state_iso: null,
    city: '',
    created_at: '2020-11-21 08:37:56',
    updated_at: '2020-11-21 08:37:56',
    phone_code: '+52',
    full_name: 'Pedro quinzanos'
}];


export const TEST_CONTACT_MODEL_LIST: ContactModel[] = [{
    id: 11,
    name: 'Pedro',
    lastName: 'quinzanos',
    type: 'NOT_SPECIFIED',
    origin: 'MOBILE_APP',
    email: 'pquinzanos@gmail.com',
    phone: '5555555555',
    countryCode: 'MEX',
    phoneCode: '+52',
    streetAddress: '',
    city: '',
    stateIso: '',
    createdAt: '2020-11-21 08:37:56',
    updatedAt: '2020-11-21 08:37:56'
},
{
    id: 9,
    name: 'Daniel',
    lastName: 'test',
    type: 'PROSPECT',
    origin: 'MOBILE_APP',
    email: 'daniel@testemail.com',
    phone: '4567851235',
    countryCode: 'MEX',
    phoneCode: '+52',
    streetAddress: '',
    city: '',
    stateIso: '',
    createdAt: '2020-10-26 17:33:18',
    updatedAt: '2020-10-26 17:33:18'
},
{
    id: 5,
    name: 'John',
    lastName: 'Appleseed',
    type: 'PROSPECT',
    origin: 'WEB',
    email: 'John-Appleseed@mac.com',
    phone: '8885555512',
    countryCode: 'MEX',
    phoneCode: '+52',
    streetAddress: '',
    city: '',
    stateIso: '',
    createdAt: '2020-07-23 10:29:59',
    updatedAt: '2020-09-28 15:11:03'
},
{
    id: 3,
    name: 'David',
    lastName: 'Taylor',
    type: 'NOT_SPECIFIED',
    origin: 'WEB',
    email: '',
    phone: '5556106679',
    countryCode: 'MEX',
    phoneCode: '+52',
    streetAddress: '',
    city: '',
    stateIso: '',
    createdAt: '2020-07-23 10:29:59',
    updatedAt: '2020-07-23 10:29:59'
},
{
    id: 2,
    name: 'Daniel',
    lastName: 'Higgins',
    type: 'NOT_SPECIFIED',
    origin: 'WEB',
    email: 'd-higgins@mac.com',
    phone: '5554787672',
    countryCode: 'MEX',
    phoneCode: '+52',
    streetAddress: '',
    city: '',
    stateIso: '',
    createdAt: '2020-07-23 10:29:59',
    updatedAt: '2020-07-23 10:29:59'
}];

export const TEST_CONTACT_INTERACTION_API_LIST: IContactInteractionsApiProps[] = [{
    id: '30',
    contact_id: '5',
    entity: 'contacts',
    entity_id: '5',
    action_type: 'CONTACT_CALL',
    created_at: '2020-12-23 12:27:38',
    display_text: 'interaction_contact_call'
},
{
    id: '29', contact_id: '5',
    entity: 'schedule',
    entity_id: '0',
    action_type: 'CONTACT_SCHEDULED',
    created_at: '2020-12-23 12:27:32',
    display_text: 'interaction_contact_scheduled'
},
{
    id: '28',
    contact_id: '5', entity: 'contacts',
    entity_id: '5',
    action_type: 'CONTACT_EMAIL',
    created_at: '2020-12-23 12:26:58',
    display_text: 'interaction_contact_email'
},
{
    id: '6', contact_id: '5',
    entity: 'contacts',
    entity_id: '5', action_type: 'UPDATE_TYPE',
    created_at: '2020-09-28 15:11:03',
    display_text: 'Se ha cambiado el tipo de contacto'
},
{
    id: '5', contact_id: '5',
    entity: 'contacts',
    entity_id: '5',
    action_type: 'CREATE',
    created_at: '2020-07-23 10:29:59',
    display_text: 'Se cre\u00f3 el contacto'
}];
