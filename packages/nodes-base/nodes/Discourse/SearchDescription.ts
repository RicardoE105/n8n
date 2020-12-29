import {
	INodeProperties,
} from 'n8n-workflow';

export const searchOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		description: 'Choose an operation',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'search',
				],
			},
		},
		options: [
			{
				name: 'Query',
				value: 'query',
				description: 'Search for something',
			},
		],
		default: 'query',
	},
] as INodeProperties[];

export const searchFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                search:query                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Term',
		name: 'term',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'search',
				],
				operation: [
					'query',
				],
			},
		},
		default: '',
		description: 'Term to search',
	},
	{
		displayName: 'Simple',
		name: 'simple',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: [
					'search',
				],
				operation: [
					'query',
				],
			},
		},
		default: true,
		description: 'When set to true a simplify version of the response will be used else the raw data.',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'search',
				],
				operation: [
					'query',
				],
			},
		},
		options: [
			{
				displayName: 'Include Blurbs',
				name: 'include_blurbs',
				type: 'boolean',
				default: false,
			},
		],
	},
];
