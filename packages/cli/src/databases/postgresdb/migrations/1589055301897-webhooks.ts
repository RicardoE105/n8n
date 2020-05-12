import {MigrationInterface, QueryRunner} from "typeorm";

export class webhooks1589055301897 implements MigrationInterface {
    name = 'webhooks1589055301897';

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_07fde106c0b471d8cc80a64fc8"`, undefined);
        await queryRunner.query(`DROP INDEX "public"."idx_c4d999a5e90784e8caccf5589d"`, undefined);
        await queryRunner.query(`CREATE TABLE "public"."webhook_entity" ("worKflowId" integer NOT NULL, "webhookId" character varying NOT NULL, "method" character varying NOT NULL, "webhookData" json NOT NULL, CONSTRAINT "PK_1005de773e307153e8a0c0b1348" PRIMARY KEY ("worKflowId", "webhookId", "method"))`, undefined);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."webhook_entity"`, undefined);
        await queryRunner.query(`CREATE INDEX "idx_c4d999a5e90784e8caccf5589d" ON "public"."execution_entity" ("workflowId") `, undefined);
        await queryRunner.query(`CREATE INDEX "idx_07fde106c0b471d8cc80a64fc8" ON "public"."credentials_entity" ("type") `, undefined);
    }

}
