import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.View.extend({
  initialize(opts) {
    console.log(opts.session);
    this.session = opts.session;
  },
  tagName: 'ul',
  template() {
    return $(`
      <li class="userName">User Name:${this.model.get('userName')}</li>
      <li class="bio">${this.model.get('bio')}</li>
      <li class="creationDate">Profile Created:${this.model.get('created')}</li>
    `);
  },
  render() {
    this.$el.append(this.template());
    if (this.model.get('ownerId') === this.session.get('ownerId')) {
      let editButton = $(`<button class="editBio">Edit</button>`);
      let saveButton = $(`<button class="saveBio">Save</button">`);
      this.$el.append(editButton, saveButton);
      $(saveButton).hide();
    }
    this.model.on('change', () => {
      this.$el.empty();
      console.log(this.model);
      this.$el.append(this.template());
    });
  },
  events: {
    'click .editBio' : 'edit',
    'click .saveBio' : 'save'
  },
  edit(e) {
    e.preventDefault();
    console.log('clicked');
    $('.editBio').hide();
    this.$('.bio').attr('contenteditable', 'true');
    $('.saveBio').show();
  },
  save(e) {
    e.preventDefault();
    console.log('clicked');
    this.$('.bio').removeAttr('contenteditable');
    let newBio = this.$('.bio').val();
    console.log(newBio);
    // $.ajax({
    //   url: `https://api.backendless.com/v1/data/Users/` + this.model.get('ownerId'),
    //   type: 'PUT',
    //   data: {
    //     'bio': newBio
    //   },
    //   success() {
    //     console.log('added');
    //   }
    // });
    this.$('.bio').removeAttr('contenteditable');
    $('.saveBio').hide();
    $('.editBio').show();
  }
});
