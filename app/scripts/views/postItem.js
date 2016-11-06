import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.View.extend({
  initialize(opts) {
    this.session = opts.session;
  },
  tagName: 'li',
  // initialize(opts) {
  //   this.userName = opts.session.get('userName');
  //   this.session = opts.session;
  // },
  template() {
    let postData = $(`<a href="#user/${this.model.get('ownerId')}"></a>`);
    let header = `<h2>${this.model.get('userName')}</h2>`;
    let body = `<p>${this.model.get('body')}</p>`;
    // console.log(this.model.get('ownerId'), this.session.get('ownerId'));
    // if (this.model.get('ownerId') === this.session.get('ownerId')) {
    //   let editButton = `<button class="edit">Edit</button>`;
    //   let deleteButton = `<button class="delete" value="Delete">Delete</button>`;
    //   postData.append(header, body,editButton, deleteButton);
    // } else postData.append(header, body);
    postData.append(header, body);
    return postData;
  },
  render() {
    console.log('list item made!');
    this.$el.append(this.template());
    if (this.model.get('ownerId') === this.session.get('ownerId')) {
      let editButton = `<button class="edit">Edit</button>`;
      let saveButton = $(`<button class="save">Save</button">`);
      let deleteButton = `<button class="delete" value="Delete">Delete</button>`;
      this.$el.append(editButton, saveButton, deleteButton);
      $('.save').hide();
    }
  },
  events: {
    'click .edit' : 'edit',
    'click .delete' : 'delete'
  },
  edit() {

  },
  delete(e) {
    e.preventDefault();
    $.ajax({
      url: `https://api.backendless.com/v1/data/Posts/` + `${this.model.get('objectId')}`,
      type: 'DELETE',
      success(response) {
        console.log(response);
      }
    });
  }
});
