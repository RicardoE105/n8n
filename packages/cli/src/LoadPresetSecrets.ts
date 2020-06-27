import { ICredentialsOverwrite } from "./Interfaces";

import { GenericHelpers } from ".";

import * as request from 'request-promise-native';

export class LoadPresetSecrets {

	static async run() : Promise<ICredentialsOverwrite | undefined> {

		const url = await GenericHelpers.getConfigValue('credentials.overwrite.url') as string;

		// url was not defined so return undefined
		if (url === '') {
			return;
		}

		const options: request.OptionsWithUrl = {
			method: 'GET',
			url,
			json: true,
		};

		// if basic authentication is enabled add credentials to the request object

		const basicAuth = await GenericHelpers.getConfigValue('security.basicAuth.active') as Boolean;

		if (basicAuth) {
			const [user, password] = await Promise.all([
				GenericHelpers.getConfigValue('security.basicAuth.user'),
				GenericHelpers.getConfigValue('security.basicAuth.password'),
			]);

			if (user !== '' && password !== '') {
				options.auth = {
					user: user as string,
					password: password as string,
				}
			}
		}

		let data;

		try {
			data = await request(options);
		} catch (exception) {
			throw exception;
		}

		// set env/config variable to default value so that they cannot be used anymore
		GenericHelpers.resetConfigValue('credentials.overwrite.url');

		return data;
	}
}
