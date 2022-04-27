import { MigrationInterface, QueryRunner } from "typeorm";

export class addCreatedAtMessage1651008398831 implements MigrationInterface {
    name = 'addCreatedAtMessage1651008398831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`message\` DROP COLUMN \`createdAt\``);
    }

}
