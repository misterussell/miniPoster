import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'form',
  className: 'newPost',
  template() {
    let postOptions = `
      <input type="text" class="postBody" name="name" value="">
      <input type="submit" name="name" value="Submit">
    `;
    return postOptions;
  },
  render() {
    this.$el.append(this.template());
  },
  events: {
    'submit': 'submitEvt'
  },
  submitEvt(e) {
    e.preventDefault();
    let body = $('.postBody').val();
    console.log(body);
  }
});
