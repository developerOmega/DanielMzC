import { toBindingIdentifierName } from '@babel/types';
import { db } from '../src/db/db';

describe("Test the database", () => {

  it("it should succes db connection", () => {
    expect(db.connection._connecting).toBe(true);
  })
  
  it("it should get all data of any table", async () => {
    expect(typeof await db.query(`SELECT * FROM admins`)).toMatch("object");
  })
  
  const values = {
    name: "Eduardo",
    email: "eduardo@mail.com",
    password: "qwerty123"
  }

  it("it should create a new data in any table", async () => {
    const data:any = await db.queryPost(`INSERT INTO admins data? VALUES params? RETURNING *`, [values]);

    expect(typeof data).toMatch("object");

    await db.query(`DELETE FROM admins WHERE id = ?`, [data[0].id]);
  });

  it("it should udpate data in any table", async () => {
    const valUpdate = {
      name: "Eduardo Mendoza"
    }

    const data:any = await db.queryPost(`INSERT INTO admins data? VALUES params? RETURNING *`, [values]);
    const dataUpdate:any = await db.queryPatch(`UPDATE admins SET data? WHERE id = ? RETURNING *`, [valUpdate, data[0].id]);
  
    expect(typeof dataUpdate).toMatch("object");

    await db.query(`DELETE FROM admins WHERE id = ?`, [dataUpdate[0].id]);
    db.connection.end();

  });

});
