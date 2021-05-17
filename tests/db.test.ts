import { db } from '../src/db/db';

describe("Test the database", () => {

  it("it should succes db connection", () => {
    expect(db.connection._connecting).toBe(true);
    db.connection.end();
  })
});
