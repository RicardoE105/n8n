import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

export class HttpOAuth2Api implements ICredentialType {
	name = 'httpOAuth2Api';
	extends = [
		'oAuth2Api',
	];
	displayName = 'OAuth2 API';
	properties = [
		{
			displayName: 'Include Credentials on Body',
			name: 'includeCredentialsOnBody',
			type: 'boolean' as NodePropertyTypes,
			default: false,
			description: `Weather to include client id and secret in the body when refreshing the token.`,
		},
	];
}
