import Open from './open';

export default class TextEditorScript extends Open {
  form;
  textarea;
  tagId;

  constructor(tagId, pathname) {
    super(pathname);
    this.tagId = tagId;
    this.form = document.querySelector('#form-blog');
    this.textarea = document. querySelector('#content')
  }

  main() {
    console.log("Estamos en el editor de tecto ckeditor")
    CKEDITOR.replace(this.tagId);
  }
}
