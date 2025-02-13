import { IExecuteFunctions } from 'n8n-core';
import { IDataObject } from 'n8n-workflow';
import Geocode, { GeocodeQueryType, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';

const getTypes = (types: string): GeocodeQueryType[] | undefined => {
	return types ? types.split(',').map(type => type.trim() as GeocodeQueryType) as GeocodeQueryType[] : undefined;
}

const getProximity = (proximity: string): [number, number] | "ip" | undefined => {
	return proximity === 'ip' ? 'ip' :
		proximity ? proximity.split(',').map(Number) as [number, number] :
		undefined;
}

const getBoundingBox = (bbox: string): [number, number, number, number] | undefined => {
	return bbox ? bbox.split(',').map(Number) as [number, number, number, number] : undefined;
}

const getLanguage = (language: string): string[] => {
	return language.split(',') as string[];
}

const buildForwardGeocodeRequest = (executor: IExecuteFunctions, i: number): GeocodeRequest => {
	const query = executor.getNodeParameter('query', i) as string;

	const additionalFields = executor.getNodeParameter('additionalGeocodingFields', i) as IDataObject;
	const resultLimit = additionalFields['resultLimit'] as number ?? 1;
	const types = additionalFields['types'] as string ?? 'place, address, poi';
	const bbox = additionalFields['bbox'] as string ?? null;
	const proximity = additionalFields['proximity'] as string ?? null;
	const language = additionalFields['language'] as string ?? 'en';

	const request: GeocodeRequest = {
		query: query,
		limit: resultLimit,
		types: getTypes(types),
		bbox: getBoundingBox(bbox),
		proximity: getProximity(proximity),
		language: getLanguage(language),
	}

	return request;
}

const buildReverseGeocodeRequest = (executor: IExecuteFunctions, i: number): GeocodeRequest => {
	const query = executor.getNodeParameter('query', i) as string;
	const coords = query.split(',').map(Number) as [number, number];

	const additionalFields = executor.getNodeParameter('additionalGeocodingFields', i) as IDataObject;
	const resultLimit = additionalFields['resultLimit'] as number ?? 1;
	const types = additionalFields['types'] as string ?? 'place, address, poi';
	const language = additionalFields['language'] as string ?? 'en';

	const request: GeocodeRequest = {
		query: coords,
		limit: resultLimit,
		types: getTypes(types),
		language: getLanguage(language),
	}

	return request;
}

async function forwardGeocode(executor: IExecuteFunctions, i: number): Promise<IDataObject> {
	const credentials = await executor.getCredentials('mapboxApi');
	const geocodingClient = Geocode({ accessToken: credentials.accessToken as string });

	const request: GeocodeRequest = buildForwardGeocodeRequest(executor, i);

	const response = await geocodingClient.forwardGeocode(request).send();

	return {
		response: response.body,
	};
};

async function reverseGeocode(executor: IExecuteFunctions, i: number): Promise<IDataObject> {
	const credentials = await executor.getCredentials('mapboxApi');
	const geocodingClient = Geocode({ accessToken: credentials.accessToken as string });

	const request: GeocodeRequest = buildReverseGeocodeRequest(executor, i);

	const response = await geocodingClient.reverseGeocode(request).send();

	return {
		response: response.body,
	};
};

export { forwardGeocode, reverseGeocode };
