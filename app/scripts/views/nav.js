import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'nav',
  template() {
    let menu = `<a href="#posts">See Posts</a>`;
    return menu;
  },
  render() {
    this.$el.append(this.template());
  }

});
