import { INodeProperties } from "n8n-workflow";
import { additionalGeocodingFields } from "./additionalGeocodingFields";

export const geocodingProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'geocoding',
				],
			},
		},
		options: [
			{
				name: 'Forward Geocode',
				value: 'forwardGeocode',
				description: 'Forward geocoding converts location text into geographic coordinates, turning 2 Lincoln Memorial Circle SW into -77.050,38.889',
				action: 'Forward geocoding',
			},
			{
				name: 'Reverse Geocode',
				value: 'reverseGeocode',
				description: 'Reverse geocoding converts geographic coordinates into location text, turning -77.050,38.889 into 2 Lincoln Memorial Circle SW',
				action: 'Reverse geocoding',
			},
		],
		default: 'forwardGeocode',
		noDataExpression: true,
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'geocoding',
				],
				operation: [
					'forwardGeocode',
				],
			},
		},
		default: 'Los Angeles, CA',
		description: 'The location to geocode. For example: Los Angeles, CA.',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'geocoding',
				],
				operation: [
					'reverseGeocode'
				],
			},
		},
		default: '-122.4241, 37.78',
		description: 'The location to geocode. For example: -122.4241, 37.78.',
	},
	...additionalGeocodingFields,
];
