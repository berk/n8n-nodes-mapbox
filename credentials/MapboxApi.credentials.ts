import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MapboxApi implements ICredentialType {
	name = 'mapboxApi';
	displayName = 'Mapbox API';
	icon = 'file:mapbox.svg';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				access_token: '={{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.mapbox.com',
			url: '/styles/v1/mapbox/streets-v12/static/-122.4241,37.78,15.25,0,60/100x100',
		},
	};
}
