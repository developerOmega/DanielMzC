import Open from './open';

export default class TextEditorScript extends Open {
  form;
  textarea

  constructor(pathname) {
    super(pathname);
    this.form = document.querySelector('#form-blog');
    this.textarea = document. querySelector('#content')
  }

  main() {
    console.log("Estamos en el editor de tecto ckeditor")
    CKEDITOR.replace('content');
  }
}
