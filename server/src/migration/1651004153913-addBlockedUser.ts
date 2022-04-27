import { MigrationInterface, QueryRunner } from "typeorm";

export class addBlockedUser1651004153913 implements MigrationInterface {
    name = 'addBlockedUser1651004153913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`blocked\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`blocked\``);
    }

}
