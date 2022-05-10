import { MigrationInterface, QueryRunner } from "typeorm";

export class changedColumns1652214092409 implements MigrationInterface {
    name = 'changedColumns1652214092409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`title\` varchar(255) NOT NULL`);
    }

}
