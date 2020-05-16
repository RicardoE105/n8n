
import { JWT,  } from 'google-auth-library';
import { google } from 'googleapis';
import { IDataObject } from 'n8n-workflow';


/**
 * Returns the authentication client needed to access spreadsheet
 */
export async function getAuthenticationClient(email: string, privateKey: string, scopes: string[]): Promise <JWT> {
	const client = new google.auth.JWT(
		email,
		undefined,
		privateKey,
		scopes,
		undefined
	);

	// TODO: Check later if this or the above should be cached
	await client.authorize();

	// @ts-ignore
	return client;
}

export async function getOAuth2Client(credentials: IDataObject): Promise <any> {
	const client = new google.auth.OAuth2(
		undefined,
		undefined,
	);

	// //export interface Credentials {
	// 	refresh_token?: string | null;
	// 	expiry_date?: number | null;
	// 	access_token?: string | null;
	// 	token_type?: string | null;
	// 	id_token?: string | null;
	// }

	// client.setCredentials()

	client.on('tokens', (tokens) => {
		if (tokens.refresh_token) {
			// find additonal data
		  // store the refresh_token in my database!
		  console.log(tokens.refresh_token);
		}
	  });

	return client;
}
