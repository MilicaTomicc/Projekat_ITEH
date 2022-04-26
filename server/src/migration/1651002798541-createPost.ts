import {MigrationInterface, QueryRunner} from "typeorm";

export class createPost1651002798541 implements MigrationInterface {
    name = 'createPost1651002798541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`imageUrl\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`DROP TABLE \`post\``);
    }

}
