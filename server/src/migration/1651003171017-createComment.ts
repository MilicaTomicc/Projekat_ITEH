import { MigrationInterface, QueryRunner } from "typeorm";

export class createComment1651003171017 implements MigrationInterface {
    name = 'createComment1651003171017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`postId\` int NOT NULL, \`userId\` int NOT NULL, \`content\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`, \`postId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
