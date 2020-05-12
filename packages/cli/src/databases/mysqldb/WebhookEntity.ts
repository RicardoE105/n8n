import {
	IConnections,
	IDataObject,
	INode,
	IWorkflowSettings,
	IWebhookData,
} from 'n8n-workflow';

import {
	Column,
	Entity,
} from 'typeorm';

import { IWebhookDb } from '../../Interfaces';

@Entity()
export class WebhookEntity implements IWebhookDb {

	@Column({ primary: true })
	worKflowId: number;

	@Column({ primary: true })
	webhookId: string;

	@Column({ primary: true })
	method: string;

	@Column('json')
	webhookData: IWebhookData;
}
