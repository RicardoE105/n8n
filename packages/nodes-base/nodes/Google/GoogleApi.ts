
import { JWT,  OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { IGoogleAuth2Credentials, IGoogleAuthCredentials } from './GoogleSheet';

/**
 * Returns the authentication client needed to access spreadsheet
 */

export async function getAuthenticationClient(credentials: IGoogleAuthCredentials): Promise <JWT> {
	const client = new google.auth.JWT(
		credentials.email,
		undefined,
		credentials.privateKey,
		credentials.scopes,
		undefined
	);

	// TODO: Check later if this or the above should be cached
	await client.authorize();

	// @ts-ignore
	return client;
}

export function getOAuth2Client(credentials: IGoogleAuth2Credentials): OAuth2Client {
	const client = new google.auth.OAuth2(
		credentials.clientId,
		credentials.clientSecret,
	);

	client.setCredentials(credentials.oauthTokenData);

	client.on('tokens', credentials.refreshToken);

	return client;
}
