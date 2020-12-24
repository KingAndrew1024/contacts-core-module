import { TestBed } from '@angular/core/testing';
import { ContactsRepository, IContactForm, IContactRepository, IGenericInteractionProps } from '..';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppSettingsService } from '../providers/global-params';
import { IContactInteractionsApiProps } from '../core';
import { TEST_CONTACT_API_LIST, TEST_CONTACT_INTERACTION_API_LIST, TEST_CONTACT_MODEL_LIST } from '../mocks/contacts.data';

describe('ContactsRepository', () => {
    let contactsRepository: IContactRepository;
    let appSettingsServiceSpy: any;
    let httpTestingController: HttpTestingController;
    const baseUrl = '/v1/contacts';

    const contactId = 43;

    beforeEach(() => {
        appSettingsServiceSpy = jasmine.createSpyObj('AppSettingsService', ['getApiUrl', 'getInstanceName']);
        appSettingsServiceSpy.getApiUrl.and.returnValue('any_string');
        appSettingsServiceSpy.getInstanceName.and.returnValue('any_string');

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ContactsRepository,
                { provide: AppSettingsService, useValue: appSettingsServiceSpy }
            ]
        });

        contactsRepository = TestBed.inject(ContactsRepository);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('Should get all Contacts', () => {

        contactsRepository.getContacts()
            .subscribe(response => {
                const contactList = response.data;
                const status = response.status;

                expect(status).toEqual('success');

                expect(contactList).toBeTruthy('No Contacts returned');

                expect(contactList.length).toBe(TEST_CONTACT_MODEL_LIST.length, 'Incorrect number of Contacts returned');

                const contact = contactList.find(item => item.id === TEST_CONTACT_MODEL_LIST[2].id.toString());

                expect(contact.name).toBe(TEST_CONTACT_MODEL_LIST[2].name);
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith(baseUrl));

        expect(req.request.method).toEqual('GET');

        req.flush({ data: TEST_CONTACT_API_LIST, status: 'success' });
    });

    it('Should get Country Code List', () => {
        const COUNTRY_CODE_LIST = require('src/assets/countryCodes.json');

        contactsRepository.getCountryCodes()
            .subscribe(countryCodeList => {

                expect(countryCodeList).toBeTruthy('No Country Code list returned');

                expect(countryCodeList.length).toBe(250, 'Incorrect number of Country Codes returned');

                const mexCode = countryCodeList.filter(code => code.alpha3Code === 'MEX');
                expect(mexCode).toBeTruthy('MEX code not found');
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith('/assets/countryCodes.json'));

        expect(req.request.method).toEqual('GET');

        req.flush(COUNTRY_CODE_LIST);
    });

    it('Should get Contact interactions', () => {

        contactsRepository.getContactInteractions(contactId)
            .subscribe(response => {
                const interactionList = response.data;
                const status = response.status;

                expect(status).toEqual('success');

                expect(interactionList).toBeTruthy('No Interactions returned');

                expect(interactionList.length).toBe(TEST_CONTACT_INTERACTION_API_LIST.length, 'Incorrect number of Interactions returned');

                const interaction = interactionList.find(item => item.contact_id === TEST_CONTACT_INTERACTION_API_LIST[2].contact_id);

                expect(interaction).toBeDefined();
                expect(interaction.contact_id).toEqual(TEST_CONTACT_INTERACTION_API_LIST[2].contact_id);
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith(baseUrl + '/interactions/' + contactId));

        expect(req.request.method).toEqual('GET');

        req.flush({ data: TEST_CONTACT_INTERACTION_API_LIST, status: 'success' });
    });

    it('Should Create a Contact', () => {

        contactsRepository.createContact(TEST_CONTACT_API_LIST[0] as unknown as IContactForm)
            .subscribe(response => {
                const contact = response.data;
                const status = response.status;

                expect(status).toEqual('success');

                expect(contact).toBeTruthy('No new Contact returned');

                expect(contact.email).toEqual(TEST_CONTACT_API_LIST[0].email);
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith(baseUrl + '/create'));

        expect(req.request.method).toEqual('POST');

        req.flush({ data: TEST_CONTACT_API_LIST[0], status: 'success' });
    });

    it('Should delete a Contact', () => {

        contactsRepository.deleteContact(contactId)
            .subscribe(response => {
                const status = response.status;

                expect(status).toEqual('success');
            });

        const req = httpTestingController.expectOne(request => request.url.endsWith(baseUrl + '/delete/' + contactId));

        expect(req.request.method).toEqual('DELETE');

        req.flush({ data: 'success', status: 'success' });
    });

    it('Should update a Contact', () => {

        contactsRepository.updateContact(TEST_CONTACT_API_LIST[1] as unknown as IContactForm)
            .subscribe(response => {
                const status = response.status;
                const contact = response.data;

                expect(status).toEqual('success');
                expect(contact).toBeTruthy('No contact was received');
                expect(contact.name).toEqual(TEST_CONTACT_API_LIST[1].name, 'New contact name does not match');
            });

        const req = httpTestingController.expectOne(
            request => request.url.endsWith(baseUrl + '/update/' + TEST_CONTACT_API_LIST[1].id)
        );

        expect(req.request.method).toEqual('POST');

        req.flush({ data: TEST_CONTACT_API_LIST[1], status: 'success' });
    });

    it('Should import a list of Contacts', () => {

        contactsRepository.importContacts(TEST_CONTACT_API_LIST as any)
            .subscribe(response => {
                const status = response.status;
                const contactLst = response.data.contacts_exported;

                expect(status).toEqual('success');
                expect(response.data).toBeTruthy('No contact was received');
                expect(contactLst.length).toBeTruthy('No contact was received');
                expect(contactLst[0].name).toEqual(TEST_CONTACT_API_LIST[0].name, 'New contact[0] name does not match');
                expect(contactLst[1].name).toEqual(TEST_CONTACT_API_LIST[1].name, 'New contact[1] name does not match');
            });

        const req = httpTestingController.expectOne(
            request => request.url.endsWith(baseUrl + '/export_from_mobile')
        );

        expect(req.request.method).toEqual('POST');

        req.flush({ data: {contacts_exported: TEST_CONTACT_API_LIST}, status: 'success' });
    });

    it('Should create a Contact interaction', () => {
        const newInteraction: IGenericInteractionProps = {
            action_type: 'create',
            entity: 'contact',
            entity_id: 123
        };

        const postInteractionResponse: IContactInteractionsApiProps = {
            id: '123',
            contact_id: '321',
            entity: 'contacts',
            entity_id: '1234',
            action_type: 'CREATE',
            created_at: '12/12/2020',
            display_text: 'Se creo el contacto',
        };

        contactsRepository.createInteraction(contactId, newInteraction)
            .subscribe(response => {
                const status = response.status;
                const interaction = response.data;

                expect(status).toEqual('success');
                expect(interaction).toBeTruthy('No interaction was created');
                expect(interaction.action_type).toEqual('CREATE', 'Interaction type mismatch');
            });

        const req = httpTestingController.expectOne(
            request => request.url.endsWith(baseUrl + '/create_interaction/' + contactId)
        );

        expect(req.request.method).toEqual('POST');

        req.flush({ data: postInteractionResponse, status: 'success' });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
