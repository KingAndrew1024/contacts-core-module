import { AppSettingsService } from './global-params';

describe('AppSettingsService', () => {
    const apiUrl = 'the api url';
    const instanceName = 'the instance name';

    it('Should run setApiUrl on constructor', () => {
        const spyOnSetApiUrl = spyOn(AppSettingsService.prototype, 'setApiUrl' as never).and.callThrough();
        const spyOnSetInstanceName = spyOn(AppSettingsService.prototype, 'setInstanceName' as never).and.callThrough();

        const appSettinsService = new AppSettingsService({
            apiUrl,
            instanceName
        });

        expect(spyOnSetApiUrl).toHaveBeenCalledTimes(1);
        expect(spyOnSetInstanceName).toHaveBeenCalledTimes(1);
        expect(appSettinsService.getApiUrl()).toEqual(apiUrl);
        expect(appSettinsService.getInstanceName()).toEqual(instanceName);
    });
});
