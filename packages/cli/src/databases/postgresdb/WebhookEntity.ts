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
	workflowId: number;

	@Column({ primary: true })
	webhookPath: string;

	@Column({ primary: true })
	method: string;

	@Column('json')
	node: INode;
}
