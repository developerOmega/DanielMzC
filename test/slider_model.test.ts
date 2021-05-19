import Slider  from '../src/Models/Slider';
import { SliderData } from '../src/interfaces/Models';
import {db} from '../src/db/db';

describe("Test the slider model", () => {

  beforeAll(async () => {
    const values:SliderData = {
      img: "portafolio.jpg",
      content: "Este es un contenido para el portafolio",
      url: "/portafolio",
      admin_id: 1
    }
    return await Slider.create(values);
  });

  afterAll(async () => {
    await db.query(`DELETE FROM sliders`);
    db.connection.end();
  })

  it( "it should show all sliders", async () => {
    expect(typeof await Slider.all()).toBe('object');
  });
  
  it( "it should show two first sliders", async () => {
    
    for(let i = 0; i < 2; i++) {
      await Slider.create({
        img: `portafolio-${i}.jpg`,
        content: `Este contenido es un default ${i}`,
        url: "/portafolio",
        admin_id: 1
      });
    }
    
    const sliders:any = await Slider.paginate(1, 2);
    expect(sliders.length).toBe(2);
    
  });

  it("it should show the admin of slider", async () => {
    const slider:any = await Slider.first();

    expect( (await slider.admin()).id ).toBe(slider.admin_id);
  });
  
  it("it should show a slider by id", async () => {
    const findSlider = await Slider.first();
    const slider:any = await Slider.byId(findSlider.id);
    
    expect(findSlider).toStrictEqual(slider);
  });
  
  it("it should update a slider", async () => {
    const slider:any = await Slider.first();
    const sliderUdated = await slider.update({
      img: "portafolio_editado.png"
    });
    
    expect(sliderUdated.img).toEqual("portafolio_editado.png");
  });

  it("it should delete a slider", async () => {
    const slider = await Slider.first();
    await slider.delete();

    const findSlider = await Slider.byId(slider.id);
    expect(findSlider).toBe(false);
  });

});