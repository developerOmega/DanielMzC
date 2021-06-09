import Admin from '../Models/Admin';
import { AdminData } from '../interfaces/Models';
import bcrypt from 'bcrypt'

const params: AdminData = {
  name: "Daniel Mendoza",
  email: "danos98@hotmail.com",
  password: bcrypt.hashSync("qwerty123", 10),
  is_su_admin: true
}

const createAdmin = async () => {
  const admin:any = await Admin.byEmail("theskip98@gmail.com");
  if(!admin.id) {
    await Admin.create(params)
  } 

}

const addInitializer = async () => {
  await createAdmin();
}

export default addInitializer;
