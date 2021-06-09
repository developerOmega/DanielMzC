import Open from './open';
import Slider from './plugins/slider';

export default class SliderScript extends Open {

  slider;
  sliderCont;
  data;

  constructor(pathname) {
    super(pathname);

    this.sliderCont = document.querySelector('#slider-cont');
    this.sliderCont.className = "none";

    this.slider = document.querySelector("#slider");
    this.data = this.setData();
  }

  main() {
    const slider = new Slider.on(this.slider, this.data);
    slider.active(15000);
  }

  setData() {
    
    const sliderTags = this.sliderCont.children;
    const data = [];

    for(let sl of sliderTags) {
      
      data.push({
        img: sl.children[0].innerText,
        description: sl.children[1].innerText,
        url: sl.children[2].innerText
      });

    }

    console.log(data);

    return data;
  }

}
