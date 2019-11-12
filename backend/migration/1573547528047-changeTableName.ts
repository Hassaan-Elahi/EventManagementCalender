import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTableName1573547528047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "startTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "endTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_time" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_time" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "endTime" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "startTime" character varying NOT NULL`, undefined);
    }

}
