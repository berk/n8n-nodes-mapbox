import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { properties } from './props/properties';
import getStaticImage from './actions/staticMap';
import { forwardGeocode, reverseGeocode } from './actions/geocoding';

export class Mapbox implements INodeType {
  description: INodeTypeDescription = {
    properties: [
			...properties,
    ],
    displayName: 'Mapbox',
    name: 'mapbox',
    icon: 'file:mapbox.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
    description: 'Consume Mapbox API',
    defaults: {
      name: 'Mapbox',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'mapboxApi',
        required: true,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData = [];
    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      if (resource === 'staticMap') {
        if (operation === 'create') {
					const binaryData = await getStaticImage(this, i);

          returnData.push({
            json: {
              success: true,
            },
            binary: {
              data: binaryData,
            },
          });
        }
      } else if (resource === 'geocoding') {
				if (operation === 'forwardGeocode') {
					const response = await forwardGeocode(this, i);

					returnData.push({
						json: response,
					});
				} else if (operation === 'reverseGeocode') {
					const response = await reverseGeocode(this, i);

					returnData.push({
						json: response,
					});
				}
      }
    }

    return [returnData];
  }
}
