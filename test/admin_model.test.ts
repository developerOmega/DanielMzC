import Admin  from '../src/Models/Admin';
import { AdminData } from '../src/interfaces/Models';
import {db} from '../src/db/db';

describe("Test the admin model", () => {

  it( "it should show all admins", async () => {
    expect(typeof await Admin.all()).toBe('object');
  })

  it( "it should show two first admins", async () => {
    const admins:any = await Admin.paginate(1, 2);
    expect(admins.length).toBe(2);
  });
  
  const values:AdminData = {
    name: "Taco",
    email: "taco@email.com",
    password: "qwerty123",
    is_su_admin: false
  };
  
  it("it should show a admin by id", async () => {
    const createAdmin = await Admin.create(values);
    const admin:any = await Admin.byId(createAdmin.id);
    
    expect(createAdmin).toStrictEqual(admin);
    await admin.delete();
  });

  it("it should show a admin by email", async () => {
    const createAdmin:any = await Admin.create(values);
    const admin = await Admin.byEmail(createAdmin.email);

    expect(createAdmin).toStrictEqual(admin);
    await admin.delete();
  });
  
  it("it should update a admin", async () => {
    const admin:any = await Admin.create(values);
    const adminUdated = await admin.update({
      name: "Eduardo Mendoza"
    });
    
    expect(adminUdated.name).toEqual("Eduardo Mendoza");
    await admin.delete();
  });
  
  it("it should delete a admin", async () => {
    const admin = await Admin.create(values);
    await admin.delete();

    const findAdmin = await Admin.byId(admin.id);
    expect(findAdmin).toBe(false);
    db.connection.end();
  });

});