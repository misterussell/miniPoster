import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'nav',
  template() {
    let menu = `
    <a href="#register">Register</a>
    <a href="#post">New Post</a>
    <a href="#allPosts">All Posts</a>
    <a href='#yourPosts'>Your Posts</a>
    <a href='#yourProfile'>Your Profile</a>
    `;
    return menu;
  },
  render() {
    this.$el.append(this.template());
  }

});
