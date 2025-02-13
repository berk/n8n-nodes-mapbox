import { INodeProperties } from "n8n-workflow";

export const additionalStaticMapFields: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalStaticMapFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'staticMap',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				displayName: 'Coordinates',
				name: 'coordinates',
				type: 'string',
				default: '',
				placeholder: '-122.4241, 37.78',
				description: 'Coordinates to create the static map image as "longitude, latitude". For example: -122.4241, 37.78. Default is auto.',
			},
			{
				displayName: 'Zoom',
				name: 'zoom',
				type: 'number',
				default: 15,
				description: 'Zoom level of the static map image. Default is 15.',
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'string',
				default: '400x400',
				placeholder: '400x400, 600x800, etc.',
				description: 'The width and height of the static map image. For example: 400x400, 600x800, etc. Default is 400x400.',
			},
			{
				displayName: 'Bearing',
				name: 'bearing',
				type: 'number',
				default: 0,
				description: 'The bearing of the static map image. Default is 0.',
			},
			{
				displayName: 'Pitch',
				name: 'pitch',
				type: 'number',
				default: 0,
				description: 'The pitch of the static map image. Default is 0.',
			},
			{
				displayName: 'Bounding Box',
				name: 'bbox',
				type: 'string',
				default: '',
				placeholder: '-123.173825, 37.639830, -122.281780, 37.929824',
				description: 'Bounding box to create the static map image. For example: -123.173825, 37.639830, -122.281780, 37.929824.',
			},
			{
				displayName: 'Owner',
				name: 'ownerId',
				type: 'string',
				default: 'mapbox',
				description: 'The owner ID to use for the static map image style. Default is mapbox.',
			},
			{
				displayName: 'Style',
				name: 'styleId',
				type: 'string',
				default: 'streets-v12',
				description: 'The style to use for the static map image. For example: streets-v12, dark-v11, light-v11, outdoors-v12, satellite-streets-v12, or your own style. Default is streets-v12.',
			},
			{
				displayName: 'High Resolution',
				name: 'highRes',
				type: 'boolean',
				default: true,
				description: 'Whether to use a high resolution static map image. Default is true.',
			},
			{
				displayName: 'Attribution',
				name: 'attribution',
				type: 'boolean',
				default: true,
				description: 'Whether to include the attribution in the static map image. Default is true.',
			},
			{
				displayName: 'Logo',
				name: 'logo',
				type: 'boolean',
				default: true,
				description: 'Whether to include the Mapbox logo in the static map image. Default is true.',
			},
		],
	},
];
