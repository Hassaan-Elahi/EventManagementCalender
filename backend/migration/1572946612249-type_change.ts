import {MigrationInterface, QueryRunner} from "typeorm";

export class typeChange1572946612249 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" boolean NOT NULL`, undefined);
    }

}
