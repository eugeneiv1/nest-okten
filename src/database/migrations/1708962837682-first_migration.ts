import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1708962837682 implements MigrationInterface {
  name = 'FirstMigration1708962837682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "test"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "test" text`);
  }
}
