import { Path, SimpleMarker } from "@mapbox/mapbox-sdk/services/static";
import { GeoJsonOverlay } from "@mapbox/mapbox-sdk/services/static";
import { PathOverlay } from "@mapbox/mapbox-sdk/services/static";
import { CustomMarkerOverlay } from "@mapbox/mapbox-sdk/services/static";
import { SimpleMarkerOverlay } from "@mapbox/mapbox-sdk/services/static";
import { INodeProperties } from "n8n-workflow";
import { additionalStaticMapFields } from "./additionalStaticMapFields";

const sampleMarker: SimpleMarker = {
	coordinates: [-122.46589000000002, 37.773430000000005],
	label: 'embassy',
	color: '#462eff',
	size: 'small',
};

const samplePath: Path = {
	coordinates: [[-122.46589000000002, 37.773430000000005], [-122.45473000000001, 37.77465], [-122.45327, 37.76637], [-122.44503000000002, 37.76753], [-122.44464, 37.766510000000004], [-122.44361, 37.76532], [-122.44125000000001, 37.765390000000004], [-122.43954000000001, 37.766510000000004], [-122.43692000000001, 37.76576], [-122.43104000000001, 37.76597], [-122.43044, 37.759550000000004], [-122.42816, 37.75965]],
	strokeWidth: 2,
	strokeColor: '#462eff',
	strokeOpacity: 1,
};

const sampleGeoJson: GeoJSON.GeoJSON = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [-122.42816, 37.75965]
			},
			"properties": {
				"marker-color": "#462eff",
				"marker-size": "medium",
				"marker-symbol": "racetrack"
			}
		}
	]
};

const sampleOverlays: Array<CustomMarkerOverlay | SimpleMarkerOverlay | PathOverlay | GeoJsonOverlay> = [
	{
		marker: sampleMarker,
	},
	{
		path: samplePath,
	},
	{
		geoJson: sampleGeoJson,
	},
];

export const staticMapProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'staticMap',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a static map image',
				action: 'Create a static map image',
			},
		],
		default: 'create',
		noDataExpression: true,
	},
	{
		displayName: 'Overlays',
		name: 'overlays',
		type: 'json',
		displayOptions: {
			show: {
				resource: [
					'staticMap',
				],
			},
		},
		default: JSON.stringify(sampleOverlays, null, 2),
		description: 'JSON representation of the overlays that can include markers, paths, and geojson objects. Documentation can be found https://docs.mapbox.com/api/maps/static-images/. Maki icons can be used by providing the icon name in the label field. See https://labs.mapbox.com/maki-icons/ for a list of available icons.',
	},
	...additionalStaticMapFields,
];
