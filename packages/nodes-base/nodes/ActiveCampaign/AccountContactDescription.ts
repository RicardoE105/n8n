import { INodeProperties } from "n8n-workflow";

export const accountContactOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'accountContact',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an association',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an association',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an association',
			},
		],
		default: 'create',
		description: 'The operation to perform.',
	},
] as INodeProperties[];

export const accountContactFields = [
	// ----------------------------------
	//         accountContact:create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'account',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'accountContact',
				],
			},
		},
		description: 'Account ID',
	},
	{
		displayName: 'Contact ID',
		name: 'contact',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'accountContact',
				],
			},
		},
		description: 'Contact ID',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				operation: [
					'create',
				],
				resource: [
					'accountContact',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Job title',
				name: 'jobTitle',
				type: 'string',
				default: '',
				description: 'Job Title of the contact at the account',
			},
		],
	},
	// ----------------------------------
	//         accountContact:delete
	// ----------------------------------
	{
		displayName: 'Account Contact ID',
		name: 'accountContactId',
		type: 'string',
		displayOptions: {
			show: {
				operation: [
					'delete',
				],
				resource: [
					'accountContact',
				],
			},
		},
		default: 0,
		required: true,
		description: 'ID of the account contact to delete.',
	},
	// ----------------------------------
	//         accountContact:update
	// ----------------------------------
	{
		displayName: 'Account Contact ID',
		name: 'accountContactId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'accountContact',
				],
			},
		},
		description: 'Account ID',
	},

	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		description: 'The fields to update.',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				operation: [
					'update',
				],
				resource: [
					'tag',
				],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Job title',
				name: 'jobTitle',
				type: 'string',
				default: '',
				description: 'Job Title of the contact at the account',
			},
		],
	},
] as INodeProperties[];
