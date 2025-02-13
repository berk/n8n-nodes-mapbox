import { INodeProperties } from "n8n-workflow";

const commonFields: INodeProperties[] = [
	{
		displayName: 'Results Limit',
		name: 'resultLimit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 10,
		},
		default: 1,
		placeholder: '1..10',
		description: 'Max number of results to return',
	},
	{
		displayName: 'Types',
		name: 'types',
		type: 'string',
		default: 'place, address, poi',
		placeholder: 'place, address, poi',
		description: 'Filter results to include only a subset (one or more) of the available feature types. Options are country, region, postcode, district, place, locality, neighborhood, address, poi, poi.landmark. Multiple options can be comma-separated.',
	},
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		default: 'en',
		placeholder: 'en',
		description: 'Language in which to return results using ISO_639. https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes. Optionally, one or more IETF subtags for country or script.',
	},
]

const forwardGeocodingFields: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalGeocodingFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
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
		options: [
			...commonFields,
			{
				displayName: 'Bounding Box',
				name: 'bbox',
				type: 'string',
				default: '',
				placeholder: '-122.4241, 37.78, -122.5241, 38.78',
				description: 'Limit results to only those contained within the supplied bounding box. Bounding boxes should be supplied as four numbers separated by commas, in minLon,minLat,maxLon,maxLat order. The bounding box cannot cross the 180th meridian.',
			},
			{
				displayName: 'Proximity',
				name: 'proximity',
				type: 'string',
				default: '',
				placeholder: '-122.4241, 37.78',
				description: 'Bias the response to favor results that are closer to this location. Provided as two comma-separated coordinates in longitude,latitude order, or the string ip to bias based on reverse IP lookup.',
			},
		],
	},
];

const reverseGeocodingFields: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalGeocodingFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'geocoding',
				],
				operation: [
					'reverseGeocode',
				],
			},
		},
		options: [
			...commonFields,
		],
	},
];

export const additionalGeocodingFields: INodeProperties[] = [
	...forwardGeocodingFields,
	...reverseGeocodingFields,
];
