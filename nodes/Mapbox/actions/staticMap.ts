import { IExecuteFunctions } from 'n8n-core';
import { IBinaryData, IDataObject } from 'n8n-workflow';
import StaticImage, { CustomMarkerOverlay, PathOverlay, SimpleMarkerOverlay, GeoJsonOverlay, StaticMapRequest } from '@mapbox/mapbox-sdk/services/static';

/**
 * The position for the static map request
 */
type Position = {
	coordinates: [number, number] | "auto";
	zoom: number;
	bearing?: number | undefined;
	pitch?: number | undefined;
} | { bbox: [number, number, number, number] }
	| "auto"

/**
 * The size for the static map request
 */
type Size = { width: number, height: number }


/**
 * Get the zoom for the static map request
 * @param zoom - The zoom of the static map image. Default is 15.
 * @returns The zoom for the static map request
 */
const getZoom = (zoom: number | null, defaultZoom: number): number => {
	if (zoom) {
		if (zoom < 0 || zoom > 22) {
			throw new Error('Invalid zoom');
		}

		return zoom;
	}

	return defaultZoom;
}

/**
 * Get the bearing for the static map request
 * @param bearing - The bearing of the static map image. Default is 0.
 * @returns The bearing for the static map request
 */
const getBearing = (bearing: number | null, defaultBearing: number): number => {
	if (bearing) {
		if (bearing < 0 || bearing > 360) {
			throw new Error('Invalid bearing');
		}

		return bearing;
	}

	return defaultBearing;
}

/**
 * Get the pitch for the static map request
 * @param pitch - The pitch of the static map image. Default is 0.
 * @returns The pitch for the static map request
 */
const getPitch = (pitch: number | null, defaultPitch: number): number => {
	if (pitch) {
		if (pitch < 0 || pitch > 60) {
			throw new Error('Invalid pitch');
		}

		return pitch;
	}

	return defaultPitch;
}

/**
 * Get the position for the static map request
 * @param location - The location to create the static map image. Default is auto. Alternatively, provide a bounding box or a GeoJSON object, which will be used to calculate the bounds of the map. If both are provided, the location will take precedence.
 * @param bbox - The bounding box to create the static map image. For example: -123.173825, 37.639830, -122.281780, 37.929824.
 * @param zoom - The zoom level of the static map image. Default is 15.
 * @param bearing - The bearing of the static map image. Default is 0.
 * @param pitch - The pitch of the static map image. Default is 0.
 * @returns The position for the static map request
 */
const getPosition = (coordinates: string | null, bbox: string | null, zoom: number | null, bearing: number | null, pitch: number | null): Position => {
	if (bbox) {
		const [bboxMinLng, bboxMinLat, bboxMaxLng, bboxMaxLat] = bbox.split(',').map(Number);
		if (bboxMinLng && bboxMinLat && bboxMaxLng && bboxMaxLat) {
			if (bboxMinLng < -180 || bboxMinLng > 180 || bboxMinLat < -90 || bboxMinLat > 90 || bboxMaxLng < -180 || bboxMaxLng > 180 || bboxMaxLat < -90 || bboxMaxLat > 90) {
				throw new Error('Invalid bounding box');
			}

			return {
				bbox: [bboxMinLng, bboxMinLat, bboxMaxLng, bboxMaxLat]
			}
		} else {
			throw new Error('Invalid bounding box');
		}
	}

	if (coordinates) {
		const [lng, lat] = coordinates.split(',').map(Number);
		if (lat && lng) {
			if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
				throw new Error('Invalid latitude or longitude');
			}

			return {
				coordinates: [lng, lat],
				zoom: getZoom(zoom, 15),
				bearing: getBearing(bearing, 0),
				pitch: getPitch(pitch, 0),
			}
		} else {
			throw new Error('Invalid location');
		}
	}

	if (zoom || bearing || pitch) {
		return {
			coordinates: 'auto',
			zoom: getZoom(zoom, 15),
			bearing: getBearing(bearing, 0),
			pitch: getPitch(pitch, 0),
		}
	}

	return 'auto';
}

/**
 * Get the size for the static map request
 * @param size - The size of the static map image. For example: 400x400.
 * @returns The size for the static map request
 */
const getSize = (size: string | null, defaultSize: Size): Size => {
	if (size) {
		const [width, height] = size.split('x').map(Number);
		if (width && height) {
			return { width, height };
		}
	}

	return defaultSize;
}


/**
 * Get the overlays for the static map request
 * @param overlays - The overlays of the static map image.
 * @returns The overlays for the static map request
 */
const getOverlays = (overlays: string | null): Array<CustomMarkerOverlay | SimpleMarkerOverlay | PathOverlay | GeoJsonOverlay> => {
	if (overlays) {
		const parsedOverlays = JSON.parse(overlays);
		return parsedOverlays;
	}

	return [];
}

/**
 * Create a static map
 * @param executor - The executor
 * @param i - The index
 * @returns The static map
 */
async function getStaticImage(executor: IExecuteFunctions, i: number): Promise<IBinaryData> {
	const credentials = await executor.getCredentials('mapboxApi');
	const staticClient = StaticImage({ accessToken: credentials.accessToken as string });

	const overlays = getOverlays(executor.getNodeParameter('overlays', i) as string ?? null);

	const additionalFields = executor.getNodeParameter('additionalStaticMapFields', i) as IDataObject;

	const ownerId = additionalFields['ownerId'] as string ?? 'mapbox';
	const styleId = additionalFields['styleId'] as string ?? 'streets-v12';

	const size = getSize(additionalFields['size'] as string, { width: 400, height: 400 });
	const zoom = additionalFields['zoom'] as number;
	const bearing = additionalFields['bearing'] as number;
	const pitch = additionalFields['pitch'] as number;

	const highRes = additionalFields['highRes'] as boolean ?? true;
	const attribution = additionalFields['attribution'] as boolean ?? true;
	const logo = additionalFields['logo'] as boolean ?? true;

	const coordinates = additionalFields['coordinates'] as string ?? null;
	const bbox = additionalFields['bbox'] as string ?? null;

	const request: StaticMapRequest = {
		ownerId,
		styleId,
		width: size.width,
		height: size.height,
		position: getPosition(coordinates, bbox, zoom, bearing, pitch),
		highRes,
		overlays,
		attribution,
		logo,
	}

	const response = await staticClient.getStaticImage(request).send()

	const binaryData = await executor.helpers.prepareBinaryData(
		Buffer.from(response.rawBody, 'binary'),
		'map.png',
		'image/png',
	);

	return binaryData;
};

export default getStaticImage;
