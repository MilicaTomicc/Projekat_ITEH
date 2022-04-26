import { MigrationInterface, QueryRunner } from "typeorm";

export class createPostCategory1651002932694 implements MigrationInterface {
    name = 'createPostCategory1651002932694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`postCategoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_cbeb49c5aeb20144c612817c0cc\` FOREIGN KEY (\`postCategoryId\`) REFERENCES \`post_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_cbeb49c5aeb20144c612817c0cc\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`postCategoryId\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`userId\``);
        await queryRunner.query(`DROP TABLE \`post_category\``);
    }

}
