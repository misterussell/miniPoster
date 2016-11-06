import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.View.extend({
  initialize(opts) {
    console.log(opts.session);
    this.session = opts.session;
  },
  tagName: 'ul',
  template() {
    return `
      <li class="userName">User Name:${this.model.get('userName')}</li>
      <li class="bio">About Me: ${this.model.get('bio')}</li>
      <li class="creationDate">Profile Created:${this.model.get('created')}</li>
    `;
  },
  render() {
    this.$el.append(this.template());
    if (this.model.get('ownerId') === this.session.get('ownerId')) {
      let editButton = $(`<button class="edit">Edit</button>`);
      let saveButton = $(`<button class="save">Save</button">`);
      this.$('bio').append(editButton, saveButton);
      $(saveButton).hide();
    }
    this.model.on('change', () => {
      this.$el.empty();
      console.log(this.model);
      this.$el.append(this.template());
    });
  },
  events: {
    'click .edit' : 'edit',
    'click .save' : 'save'
  },
  edit(e) {
    e.preventDefault();
    console.log('clicked');
    // $('.edit').hide();
    e.hide();
    $('.bio').attr('contenteditable', 'true');
    $('.save').show();
  },
  save(e) {
    e.preventDefault();
    console.log('clicked');
    e.hide();
    $('.bio').removeAttr('contenteditable');
    $('.edit').show();
  }
});
