import {
	IExecuteFunctions,
} from 'n8n-core';

import {
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import {
	discourseApiRequest,
	discourseApiRequestAllItems,
} from './GenericFunctions';

import {
	postFields,
	postOperations,
} from './PostDescription';

import {
	categoryFields,
	categoryOperations,
} from './CategoryDescription';

import {
	groupFields,
	groupOperations,
} from './GroupDescription';

import {
	searchFields,
	searchOperations,
} from './SearchDescription';

//import * as moment from 'moment';

export class Discourse implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Discourse',
		name: 'discourse',
		icon: 'file:discourse.svg',
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Discourse API.',
		defaults: {
			name: 'Discourse',
			color: '#000000',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'discourseApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Category',
						value: 'category',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Search',
						value: 'search',
					},
				],
				default: 'post',
				description: 'The resource to operate on.',
			},
			...categoryOperations,
			...categoryFields,
			...groupOperations,
			...groupFields,
			...postOperations,
			...postFields,
			...searchOperations,
			...searchFields,
		],
	};

	// methods = {
	// 	loadOptions: {
	// 		// Get all the calendars to display them to user so that he can
	// 		// select them easily
	// 		async getGroups(
	// 			this: ILoadOptionsFunctions,
	// 		): Promise<INodePropertyOptions[]> {
	// 			const returnData: INodePropertyOptions[] = [];
	// 			const groups = await googleApiRequestAllItems.call(
	// 				this,
	// 				'contactGroups',
	// 				'GET',
	// 				`/contactGroups`,
	// 			);
	// 			for (const group of groups) {
	// 				const groupName = group.name;
	// 				const groupId = group.resourceName;
	// 				returnData.push({
	// 					name: groupName,
	// 					value: groupId,
	// 				});
	// 			}
	// 			return returnData;
	// 		},
	// 	},
	// };

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = (items.length as unknown) as number;
		const qs: IDataObject = {};
		let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		for (let i = 0; i < length; i++) {
			if (resource === 'category') {
				//https://docs.discourse.org/#tag/Categories/paths/~1categories.json/post
				if (operation === 'create') {
					const  name = this.getNodeParameter('name', i) as string;
					const color = this.getNodeParameter('color', i) as string;
					const textColor = this.getNodeParameter('textColor', i) as string;

					const body: IDataObject = {
						name,
						color,
						text_color: textColor,
					};

					responseData = await discourseApiRequest.call(
						this,
						'POST',
						`/categories.json`,
						body,
					);
				}
				//https://docs.discourse.org/#tag/Categories/paths/~1categories.json/get
				if (operation === 'getAll') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/categories.json`,
						{},
						qs,
					);

					responseData = responseData.category_list.categories;
						
					if (returnAll === false) {
						const limit = this.getNodeParameter('limit', i) as number;
						responseData = responseData.splice(0, limit);
					}
				}
				//https://docs.discourse.org/#tag/Categories/paths/~1categories~1{id}/put
				if (operation === 'update') {
					const categoryId = this.getNodeParameter('categoryId', i) as string;

					const name = this.getNodeParameter('name', i) as string;

					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

					const body: IDataObject = {
						name,
					};

					Object.assign(body, updateFields);

					responseData = await discourseApiRequest.call(
						this,
						'PUT',
						`/categories/${categoryId}.json`,
						{},
					);
				}
			}
			if (resource === 'group') {
				//https://docs.discourse.org/#tag/Posts/paths/~1posts.json/post
				if (operation === 'create') {
					const  name = this.getNodeParameter('name', i) as string;

					const body: IDataObject = {
						name,
					};

					responseData = await discourseApiRequest.call(
						this,
						'POST',
						`/groups.json`,
						{ group: body },
					);
				}
				//https://docs.discourse.org/#tag/Groups/paths/~1groups~1{name}.json/get
				if (operation === 'get') {
					const name = this.getNodeParameter('name', i) as string;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/groups/${name}`,
						{},
						qs,
					);

					responseData = responseData.group;

				}
				//https://docs.discourse.org/#tag/Groups/paths/~1groups.json/get
				if (operation === 'getAll') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/groups.json`,
						{},
						qs,
					);

					responseData = responseData.groups;

					if (returnAll === false) {
						const limit = this.getNodeParameter('limit', i) as number;
						responseData = responseData.splice(0, limit);
					}
				}
				//https://docs.discourse.org/#tag/Posts/paths/~1posts~1{id}.json/put
				if (operation === 'update') {
					const groupId = this.getNodeParameter('groupId', i) as string;

					const name = this.getNodeParameter('name', i) as string;

					const body: IDataObject = {
						name,
					};

					responseData = await discourseApiRequest.call(
						this,
						'PUT',
						`/groups/${groupId}.json`,
						{ group: body },
					);
				}
			}
			if (resource === 'post') {
				//https://docs.discourse.org/#tag/Posts/paths/~1posts.json/post
				if (operation === 'create') {
					const  topicId = this.getNodeParameter('topicId', i) as string;
					const content = this.getNodeParameter('content', i) as string;

					const body: IDataObject = {
						topic_id: topicId,
						raw: content,
					};

					responseData = await discourseApiRequest.call(
						this,
						'POST',
						`/posts.json`,
						body,
					);
				}
				//https://docs.discourse.org/#tag/Posts/paths/~1posts~1{id}.json/get
				if (operation === 'get') {
					const postId = this.getNodeParameter('postId', i) as string;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/posts/${postId}`,
						{},
						qs,
					);
				}
				//https://docs.discourse.org/#tag/Posts/paths/~1posts.json/get
				if (operation === 'getAll') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/posts.json`,
						{},
						qs,
					);

					responseData = responseData.latest_posts;
						
					if (returnAll === false) {
						const limit = this.getNodeParameter('limit', i) as number;
						responseData = responseData.splice(0, limit);
					}
				}
				//https://docs.discourse.org/#tag/Posts/paths/~1posts~1{id}.json/put
				if (operation === 'update') {
					const postId = this.getNodeParameter('postId', i) as string;

					const content = this.getNodeParameter('content', i) as string;

					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

					const body: IDataObject = {
						raw: content,
					};

					Object.assign(body, updateFields);

					responseData = await discourseApiRequest.call(
						this,
						'PUT',
						`/posts/${postId}.json`,
						{},
					);
				}
			}
			if (resource === 'search') {
				//https://docs.discourse.org/#tag/Search/paths/~1search~1query/get
				if (operation === 'query') {
					qs.term = this.getNodeParameter('term', i) as string;

					const simple = this.getNodeParameter('simple', i) as boolean;

					const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

					Object.assign(qs, updateFields);

					qs.page = 1;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/search/query`,
						{},
						qs,
					);

					console.log(Object.keys(responseData));

					qs.page = 2;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/search/query`,
						{},
						qs,
					);

					console.log(Object.keys(responseData));


					qs.page = 3;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/search/query`,
						{},
						qs,
					);

					console.log(Object.keys(responseData));

					qs.page = 4;

					responseData = await discourseApiRequest.call(
						this,
						'GET',
						`/search/query`,
						{},
						qs,
					);

					console.log('aja')

					console.log(Object.keys(responseData));

					if (simple === true) {
						const response = [];
						for (const key of Object.keys(responseData)) {
							console.log(key)
							for (const data of responseData[key]) {
								response.push(Object.assign(data, { __type: key }));
							}
						}
						responseData = response;
					}
				}
			}
		}
		if (Array.isArray(responseData)) {
			returnData.push.apply(returnData, responseData as IDataObject[]);
		} else if (responseData !== undefined) {
			returnData.push(responseData as IDataObject);
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
