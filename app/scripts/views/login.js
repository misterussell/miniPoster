import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.View.extend({

  tagName: 'form',
  template() {
    let baseline = `
      <input type="text" class="email" name="email" placeholder="Email" value="maxruss.87@gmail.com">
      <input type="password" class="pw" name="password" placeholder="Password" value="555">
      <input type="submit" class="submit" value="Log In">
    `;
    return baseline;
  },
  render() {
    this.$el.empty();
    this.$el.append(this.template());
  },
  events: {
    'submit' : 'submitEvt'
  },
  submitEvt(e) {
    e.preventDefault();
    let email = this.$('.email').val();
    let password = this.$('.pw').val();
    this.model.login(email, password);
  }
});
