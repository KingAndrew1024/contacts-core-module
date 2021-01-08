import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
    IContactApiProps,
    IContactForm,
    IContactInteractionsApiProps,
    IContactRepository,
    ICountryCodes,
    IGenericInteractionProps,
    IImportContactsForm,
    IImportContactsResponse
} from '../core/contracts/IContact.repository';
import { IHttpBasicResponse } from '../core/contracts/IHttpBasicResponse';
import { TEST_CONTACT_API_LIST, TEST_CONTACT_INTERACTION_API_LIST } from './contacts.data';

@Injectable()
export class MockContactsRepository implements IContactRepository {

    readonly responseError: IHttpBasicResponse<null> = {
        status: 'error',
        message: 'Some bad error!',
        statusCode: 500
    };

    getContacts(): Observable<IHttpBasicResponse<IContactApiProps[]>> {

        const data = TEST_CONTACT_API_LIST;

        const responseOk: IHttpBasicResponse<IContactApiProps[]> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    getCountryCodes(): Observable<ICountryCodes[]> {

        const COUNTRY_CODE_LIST = require('src/assets/countryCodes.json');

        return of(COUNTRY_CODE_LIST);

    }

    getContactInteractions(contactId: number): Observable<IHttpBasicResponse<IContactInteractionsApiProps[]>> {

        const data: IContactInteractionsApiProps[] = TEST_CONTACT_INTERACTION_API_LIST;

        const responseOk: IHttpBasicResponse<IContactInteractionsApiProps[]> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    createContact(payload: IContactForm): Observable<IHttpBasicResponse<IContactApiProps>> {

        const data: IContactApiProps = TEST_CONTACT_API_LIST[0];

        const responseOk: IHttpBasicResponse<IContactApiProps> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    deleteContact(contactId: number): Observable<IHttpBasicResponse<null>> {

        const data = null;

        const responseOk: IHttpBasicResponse<null> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    updateContact(payload: IContactForm): Observable<IHttpBasicResponse<IContactApiProps>> {
        const { id, name, last_name, phone, type, country_code, phone_code } = payload;
        const data: IContactApiProps = {
            ...TEST_CONTACT_API_LIST[0],
            id: id.toString(),
            ...{ name, last_name, phone, type, country_code, phone_code }
        };

        const responseOk: IHttpBasicResponse<IContactApiProps> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    importContacts(payload: IImportContactsForm[]): Observable<IHttpBasicResponse<IImportContactsResponse>> {
        const importedContacts: IContactApiProps[] = [];

        payload.forEach((c, index) => {
            importedContacts.push({
                id: (999 + index).toString(),
                client_id: (876 + index).toString(),
                name: c.name.familyName,
                last_name: c.name.givenName,
                type: 'CLIENT',
                origin: 'MOBILE_APP',
                email: c.emails[0].value,
                country_code: 'MEX',
                phone: c.phoneNumbers[0].value,
                street_address: null,
                state_iso: null,
                city: null,
                created_at: '2020-11-30 14:22:02',
                updated_at: '2020-11-30 14:22:02',
                phone_code: '+52',
                full_name: 'Prueba Fake'
            });
        });

        const data: IImportContactsResponse = { contacts_exported: importedContacts };

        const responseOk: IHttpBasicResponse<IImportContactsResponse> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }

    createInteraction(
        contactId: number,
        config: IGenericInteractionProps
    ): Observable<IHttpBasicResponse<IContactInteractionsApiProps>> {

        const data: IContactInteractionsApiProps = TEST_CONTACT_INTERACTION_API_LIST[0];

        const responseOk: IHttpBasicResponse<IContactInteractionsApiProps> = {
            data,
            status: 'success'
        };

        return of(responseOk);
    }
}




/*export const countryCallingCodes:{[key: string]: string} = {
    //Country codes, source: https://countrycode.org

    //Note:
    //https://faq.whatsapp.com/sv/wp/21016748/?category=5245236
    //Make sure to remove any leading 0's or special calling codes
    //All phone numbers in Argentina (country code "54") should have a "9"
    // between the country code and area code. The prefix "15" must be removed so the
    // final number will have 13 digits total: +54 9 xxx xxx xxxx
    //Phone numbers in Mexico (country code "52") need to have "1" after "+52", even if they're Nextel numbers.

    'ARG': '54 9',//Argentina
    'MEX': '52 1',//México
  };*/

// Use the nex api: https://restcountries.eu/
// Example:
// https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}
// https://restcountries.eu/rest/v2/all?fields=name;capital;currencies
// https://restcountries.eu/rest/v2/name/mexico?fields=flag;alpha3Code;callingCodes;translations
export const COUNTRY_CALLING_CODES = [
    { alpha3Code: 'ARG', callingCodes: ['54'], flag: 'https://restcountries.eu/data/arg.svg', name: 'Argentina', translations: { es: 'Argentina' } },
    {
        alpha3Code: 'MEX',
        callingCodes: ['52'],
        flag: 'https://restcountries.eu/data/mex.svg',
        name: 'México', translations: { es: 'México' }
    },
    { alpha3Code: 'USA', callingCodes: ['1'], flag: 'https://restcountries.eu/data/usa.svg', name: 'Estado Unidos', translations: { es: 'Estado Unidos' } },
];


