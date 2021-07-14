import Email from '../src/Models/Email';
import Admin from '../src/Models/Admin';
import { AdminData } from '../src/interfaces/Models';
import { db } from '../src/db/db';

describe("Test the Email model", () => {
  beforeAll(async () => {
    const value:AdminData = {
      name: "Taco",
      email: "taco@email.com",
      password: "qwerty123",
      is_su_admin: false
    };

    const admin:any = await Admin.create(value);
  });

  afterAll(async () => {
    const admin: Admin = await Admin.last();
    await admin.delete();

    db.connection.end();
  });

  it("it should create a email", async () => {
    const admin: Admin = await Admin.last();
    
    const email: any = await Email.create({
      _from: "daniel@email.com",
      _to: "manuel@email.com",
      subject: "Hola bro",
      html: "<h1> Esto en un email sin ningun error gramatical :v </h1>",
      admin_id: admin.id
    });

    expect(email._from).toEqual("daniel@email.com")
  });

  it("it should show all email", async () => {
    expect(typeof await Email.all()).toBe('object');
  });

  it("it should show email by id", async () => {
    const findEmail: Email = await Email.last();
    const email: Email = await Email.byId(findEmail.id);

    expect(email).toStrictEqual(findEmail);
  });

  it("it should update email", async () => {
    const findEmail: Email = await Email.last();
    const email = await findEmail.update({
      subject: "Hola!! Mucho gusto"
    });

    expect(email.subject).toEqual("Hola!! Mucho gusto")
  });

  it("it should delete email", async() => {
    const email: Email = await Email.last();
    await email.delete();

    const findEmail = await Email.byId(email.id);
    expect(findEmail).toBe(false);
  });

})
