import { MigrationInterface, QueryRunner } from 'typeorm'

export class newColumns1616536462014 implements MigrationInterface {
  name = 'newColumns1616536462014'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE  "user " ( "id " SERIAL NOT NULL,  "email " character varying NOT NULL,  "password " character varying NOT NULL,  "firstName " character varying NOT NULL,  "lastName " character varying NOT NULL,  "license " integer NOT NULL, CONSTRAINT  "PK_cace4a159ff9f2512dd42373760 " PRIMARY KEY ( "id "))')
    await queryRunner.query('CREATE TABLE  "car " ( "id " SERIAL NOT NULL,  "lease " boolean NOT NULL,  "seats " integer NOT NULL,  "year " integer NOT NULL,  "make " character varying NOT NULL,  "model " character varying NOT NULL,  "trim " character varying NOT NULL,  "specs " character varying NOT NULL,  "userId " integer, CONSTRAINT  "PK_55bbdeb14e0b1d7ab417d11ee6d " PRIMARY KEY ( "id "))')
    await queryRunner.query('ALTER TABLE  "car " ADD CONSTRAINT  "FK_a4f3cb1b950608959ba75e8df36 " FOREIGN KEY ( "userId ") REFERENCES  "user "( "id ") ON DELETE NO ACTION ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE  "car " DROP CONSTRAINT  "FK_a4f3cb1b950608959ba75e8df36 "')
    await queryRunner.query('DROP TABLE  "car "')
    await queryRunner.query('DROP TABLE  "user "')
  }
}
