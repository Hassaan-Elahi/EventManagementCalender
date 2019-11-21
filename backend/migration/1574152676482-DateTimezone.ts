import {MigrationInterface, QueryRunner} from "typeorm";

export class DateTimezone1574152676482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_time" TIMESTAMP WITH TIME ZONE NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_time" TIMESTAMP WITH TIME ZONE NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "end_time" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_time"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "start_time" TIMESTAMP NOT NULL`, undefined);
    }

}
