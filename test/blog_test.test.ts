import Blog from '../src/Models/Blog';
import { BlogData } from '../src/interfaces/Models';
import {db} from '../src/db/db';

describe( "Test the blog model", () => {

  beforeAll(async () => {
    const values: BlogData = {
      title: `Titulo Blog`,
      description: `Descripcion de blog`,
      content: `Este es el contenido del blog`,
      main_img: "img.jpg",
      admin_id: 1
    }
    
    const blog:any = await Blog.create(values);
  });

  afterAll(async () => {
    await db.query(`DELETE FROM blogs`);
    db.connection.end();
  })
  
  it( "it should show all bogs", async () => {
    expect(typeof await Blog.all()).toBe('object');
  });


  it( "it should show two first blogs", async () => {
    
    for(let i = 0; i < 2; i++) {
      await Blog.create({
        title: `Blog No.${i}`,
        description: `Descripcion de blog numero ${i}`,
        content: `Este es el contenido del blog numero ${i}`,
        main_img: "img.jpg",
        admin_id: 1
      });
    }
    
    const blogs:any = await Blog.paginate(1, 2);
    expect(blogs.length).toBe(2);
    
  });
  
  
  it("it should show the admin of blog", async () => {
    const blog:any = await Blog.first();

    expect( (await blog.admin()).id ).toBe(blog.admin_id);
  });
  
  it("it should show a blog by id", async () => {
    const findBlog = await Blog.first();
    const blog:any = await Blog.byId(findBlog.id);
    
    expect(findBlog).toStrictEqual(blog);
  });
  
  it("it should update a blog", async () => {
    const blog:any = await Blog.first();
    const blogUdated = await blog.update({
      description: "Este el contenido del blog EDITADO"
    });
    
    expect(blogUdated.description).toEqual("Este el contenido del blog EDITADO");
  });

  it("it should delete a blog", async () => {
    const blog = await Blog.first();
    await blog.delete();

    const findBlog = await Blog.byId(blog.id);
    expect(findBlog).toBe(false);
  });
  
});