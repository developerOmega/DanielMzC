import Slider  from '../src/Models/Slider';
import { SliderData } from '../src/interfaces/Models';
import {db} from '../src/db/db';

describe("Test the slider model", () => {

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
    
    await db.query(`DELETE FROM sliders`);
  });
  
  const values:SliderData = {
    img: "portafolio.jpg",
    content: "Este es un contenido para el portafolio",
    url: "/portafolio",
    admin_id: 1
  }
  
  it("it should show a slider by id", async () => {
    const createSlider = await Slider.create(values);
    const slider:any = await Slider.byId(createSlider.id);
    
    expect(createSlider).toStrictEqual(slider);
    await slider.delete();
  });
  
  it("it should update a slider", async () => {
    const slider:any = await Slider.create(values);
    const sliderUdated = await slider.update({
      img: "portafolio_editado.png"
    });
    
    expect(sliderUdated.img).toEqual("portafolio_editado.png");
    await slider.delete();
  });

  it("it should delete a slider", async () => {
    const slider = await Slider.create(values);
    await slider.delete();

    const findSlider = await Slider.byId(slider.id);
    expect(findSlider).toBe(false);
    db.connection.end();
  });

});