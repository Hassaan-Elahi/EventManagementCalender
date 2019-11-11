import {MigrationInterface, QueryRunner} from "typeorm";

export class DateToString1573467745655 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "startTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "startTime" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "endTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "endTime" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "endTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "endTime" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "startTime"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "startTime" TIMESTAMP NOT NULL`, undefined);
    }

}
