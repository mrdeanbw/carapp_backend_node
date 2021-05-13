import { createConnection, getConnection } from "typeorm";
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";
import { User } from "../entity/User";

export const newConnection = async () => {
    console.log("get a connection & create new query runner");
    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    console.log("establish real database connection");
    // establish real database connection using our new query runner
    await queryRunner.connect();
    console.log("execute a query");
    // now we can execute any queries on a query runner, for example:
    await queryRunner.query("SELECT * FROM user");
    console.log("access entity manager");
    // we can also access entity manager that works with connection created by a query runner:
    const users = await queryRunner.manager.find(User);
    console.log("start a transaction");
    // lets now open a new transaction:
    await queryRunner.startTransaction();
    console.log("try block");

    try {

        let photos = null;
        let user1 = null;
        // execute some operations on this transaction:
        await queryRunner.manager.save(user1);
        await queryRunner.manager.save(photos);
        console.log("executing some operations on this transaction");

        // commit transaction now:
        await queryRunner.commitTransaction();
        console.log("committing transaction");

    } catch (err) {

        // since we have errors let's rollback changes we made
        await queryRunner.rollbackTransaction();
        console.log("since we have errors let's rollback changes we made");

    } finally {

        // you need to release query runner which is manually created:
        await queryRunner.release();
        console.log("released query runner");

    }
};