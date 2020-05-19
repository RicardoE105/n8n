import {MigrationInterface, QueryRunner} from 'typeorm';

import { IWorkflowDb, NodeTypes, WebhookHelpers, WorkflowCredentials, WorkflowExecuteAdditionalData } from '../../..';
import { Workflow } from 'n8n-workflow/dist/src/Workflow';
import { IWebhookDb } from '../../../Interfaces';

export class WebhookModel1589476000887 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.query(`CREATE TABLE IF NOT EXISTS "public"."webhook_entity" ("workflowId" integer NOT NULL, "webhookPath" character varying NOT NULL, "method" character varying NOT NULL, "node" json NOT NULL, CONSTRAINT "PK_b18e251f7487160c8db5ec7d0ff" PRIMARY KEY ("workflowId", "webhookPath", "method"))`, undefined);

		const workflows = await queryRunner.query(`SELECT * FROM "public"."workflow_entity" WHERE active=true`) as IWorkflowDb[];
		const data: IWebhookDb[] = [];
		const nodeTypes = NodeTypes();
		for (const workflow of workflows) {
			const workflowInstance = new Workflow({ id: workflow.id as string, name: workflow.name, nodes: workflow.nodes, connections: workflow.connections, active: workflow.active, nodeTypes, staticData: workflow.staticData, settings: workflow.settings });
			const credentials = await WorkflowCredentials(workflow.nodes);
			const additionalData = await WorkflowExecuteAdditionalData.getBase(credentials);
			const webhooks = WebhookHelpers.getWorkflowWebhooks(workflowInstance, additionalData);
			for (const webhook of webhooks) {
				data.push({
					workflowId: parseInt(workflowInstance.id as string, 10),
					webhookPath: webhook.path,
					method: webhook.httpMethod,
					node: workflowInstance.getNode(webhook.node)!,
				 });
			}
		}
		if (data.length !== 0) {
			await queryRunner.manager.createQueryBuilder()
			.insert()
			.into('public.webhook_entity')
			.values(data)
			.execute();
		}
	}

    async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(`DROP TABLE "public"."webhook_entity"`, undefined);
    }

}
