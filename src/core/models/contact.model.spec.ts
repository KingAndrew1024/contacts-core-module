import { TEST_CONTACT_API_LIST, TEST_CONTACT_MODEL_LIST } from '../../mocks/contacts.data';
import { ContactInteractionModel, ContactModel } from './contact.model';

describe('ContactModel', () => {
    it('toApiModel should return an object wich includes country_code property', () => {
        const value = ContactModel.toApiModel(TEST_CONTACT_MODEL_LIST[0]);

        expect(Object(value).hasOwnProperty('country_code')).toBeTruthy();
    });

    it('toApiModel should return an object wich NOT includes country_code property', () => {
        const value = ContactModel.toApiModel(TEST_CONTACT_MODEL_LIST[0], ['country_code']);

        expect(Object(value).hasOwnProperty('country_code')).toBeFalsy();
    });

    it('fromDataResponse should return an instance of ContactModel', () => {
        const value = ContactModel.fromDataResponse(TEST_CONTACT_API_LIST[0]);

        expect(value).toBeInstanceOf(ContactModel);
    });

    it('fromContactForm should return an instance of ContactModel', () => {
        const value = ContactModel.fromContactForm({
            name: 'TEST',
            last_name: 'USER',
            type: 'NOT_SPECIFIED',
            country_code: 'MEX',
            phone_code: '+52'
        });

        expect(value).toBeInstanceOf(ContactModel);
    });

    it('fromContactForm should return an instance of ContactModel with default values', () => {
        const value = ContactModel.empty();

        expect(value).toBeInstanceOf(ContactModel);
        expect(value.id).toBe(null);
        expect(value.name).toBe('');
        expect(value.lastName).toBe('');
        expect(value.type).toBe('NOT_SPECIFIED');
        expect(value.origin).toBe('UNKNOWN');
        expect(value.email).toBe('');
        expect(value.phone).toBe('');
        expect(value.countryCode).toBe('MEX');
        expect(value.phoneCode).toBe('+52');
        expect(value.streetAddress).toBe('');
        expect(value.city).toBe('');
        expect(value.stateIso).toBe('');
        expect(value.createdAt).toBe('');
        expect(value.updatedAt).toBe('');
    });

    it('ContactInteractionModel.empty() should return an instance of ContactInteractionModel with default values', () => {
        const value = ContactInteractionModel.empty();

        expect(value).toBeInstanceOf(ContactInteractionModel);
        expect(value.id).toBe(null);
        expect(value.contactId).toBe(null);
        expect(value.entity).toBe('');
        expect(value.entityId).toBe(null);
        expect(value.actionType).toBe(null);
        expect(value.createdAt).toBe(null);
        expect(value.displayText).toBe('');
    });
});
