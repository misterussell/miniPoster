import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'nav',
  template() {
    let menu = `
      <div>
      <a href="#register">Register</a>
      <a href="#post">New Post</a>
      <a href="#feed">All Posts</a>
      <a href='#profile'>Your Profile</a>
      </div>
    `;
    return menu;
  },
  render() {
    this.$el.append(this.template());
  }

});
