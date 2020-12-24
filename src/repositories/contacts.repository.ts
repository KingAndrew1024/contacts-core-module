import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    IContactApiProps,
    IContactForm,
    IContactInteractionsApiProps,
    IContactRepository,
    ICountryCodes,
    IGenericInteractionProps,
    IImportContactsResponse
} from '../core/contracts/IContact.repository';
import { IHttpBasicResponse } from '../core/contracts/IHttpBasicResponse';
import { AppSettingsService } from '../providers/global-params';

@Injectable()
export class ContactsRepository implements IContactRepository {
    readonly BASE_URL = `${this.appSettings.getApiUrl()}/api/${this.appSettings.getInstanceName()}/v1/contacts`;

    constructor(
        private httpClient: HttpClient,
        private appSettings: AppSettingsService
    ) { }

    getContacts(): Observable<IHttpBasicResponse<Array<IContactApiProps>>> {
        return this.httpClient.get<IHttpBasicResponse<Array<IContactApiProps>>>(`${this.BASE_URL}`);
    }

    getCountryCodes(): Observable<Array<ICountryCodes>> {
        return this.httpClient.get<Array<ICountryCodes>>(
            // `https://restcountries.eu/rest/v2/all?fields=flag;alpha3Code;callingCodes;translations;name`
            './../assets/countryCodes.json'
        );
    }

    getContactInteractions(contactId: number): Observable<IHttpBasicResponse<Array<IContactInteractionsApiProps>>> {
        return this.httpClient.get<IHttpBasicResponse<Array<IContactInteractionsApiProps>>>(`${this.BASE_URL}/interactions/${contactId}`);
    }

    createContact(payload: IContactForm): Observable<IHttpBasicResponse<IContactApiProps>> {
        let params = new HttpParams();

        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                params = params.append(key, payload[key]);
            }
        }

        const body = params.toString();

        return this.httpClient.post<IHttpBasicResponse<IContactApiProps>>(`${this.BASE_URL}/create`, body);
    }

    deleteContact(contactId: number): Observable<IHttpBasicResponse<null>> {
        return this.httpClient.delete<IHttpBasicResponse<null>>(`${this.BASE_URL}/delete/${contactId}`);
    }

    updateContact(payload: IContactForm): Observable<IHttpBasicResponse<IContactApiProps>> {
        let params = new HttpParams();

        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                params = params.append(key, payload[key]);
            }
        }

        const body = params.toString();

        return this.httpClient.post<IHttpBasicResponse<IContactApiProps>>(`${this.BASE_URL}/update/${payload.id}`, body);
    }

    importContacts(payload: Array<any>): Observable<IHttpBasicResponse<IImportContactsResponse>> {

        const data = { export_data: JSON.stringify({ contacts: payload }) };

        const urlSearchParams = new URLSearchParams();
        Object.keys(data).forEach((key: string) => {
            urlSearchParams.append(key, data[key]);
        });

        const body = urlSearchParams.toString();

        return this.httpClient.post<IHttpBasicResponse<IImportContactsResponse>>(
            `${this.BASE_URL}/export_from_mobile`,
            body
        );
    }

    createInteraction(contactId: number, config: IGenericInteractionProps): Observable<IHttpBasicResponse<IContactInteractionsApiProps>> {

        const urlSearchParams = new URLSearchParams();
        Object.keys(config).forEach((key: string) => {
            urlSearchParams.append(key, config[key]);
        });
        const body = urlSearchParams.toString();

        return this.httpClient.post<IHttpBasicResponse<IContactInteractionsApiProps>>(
            `${this.BASE_URL}/create_interaction/${contactId}`, body
        );
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
