import { INodeProperties } from "n8n-workflow";
import { staticMapProperties } from "./map/staticMapProperties";
import { geocodingProperties } from "./geocoding/geocodingProperties";

export const properties: INodeProperties[] = [
	{
		displayName: 'Mapbox',
		name: 'resource',
		type: 'options',
		options: [
			{
				name: 'Static Map',
				value: 'staticMap',
			},
			{
				name: 'Geocoding',
				value: 'geocoding',
			},
		],
		default: 'staticMap',
		noDataExpression: true,
		required: true,
		description: 'Create a static map image or geocode a location',
	},
	...staticMapProperties,
	...geocodingProperties,
];
