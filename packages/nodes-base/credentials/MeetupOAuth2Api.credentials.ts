import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

const scopes = [
	'ageless',
	'event_management',
];

export class MeetupOAuth2Api implements ICredentialType {
	name = 'meetupOAuth2Api';
	extends = [
		'oAuth2Api',
	];
	displayName = 'Meetup OAuth2 API';
	properties = [
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden' as NodePropertyTypes,
			default: 'https://secure.meetup.com/oauth2/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden' as NodePropertyTypes,
			default: 'https://secure.meetup.com/oauth2/access',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden' as NodePropertyTypes,
			default: scopes.join(' '),
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden' as NodePropertyTypes,
			default: 'response_type=code',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden' as NodePropertyTypes,
			default: 'body',
		},
	];
}
