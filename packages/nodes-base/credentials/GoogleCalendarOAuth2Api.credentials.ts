import {
	ICredentialType,
	NodePropertyTypes,
} from 'n8n-workflow';

const scopes = [
	'https://www.googleapis.com/auth/calendar',
	'https://www.googleapis.com/auth/calendar.events',
];

export class GoogleCalendarOAuth2Api implements ICredentialType {
	name = 'googleCalendarOAuth2Api';
	extends = [
		'googleOAuth2Api',
	];
	displayName = 'Google OAuth2 API';
	properties = [
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden' as NodePropertyTypes,
			default: scopes.join(' '),
		},
	];
}
