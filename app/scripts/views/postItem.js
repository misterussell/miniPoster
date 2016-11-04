import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'li',
  // initialize(opts) {
  //   this.userName = opts.session.get('userName');
  //   this.session = opts.session;
  // },
  template() {
    return `
      <h2>${this.model.get('userName')}</h2>
      <a href="#post/${this.model.id}">${this.model.get('body')}</a>
    `;
  },
  render() {
    this.$el.append(this.template());
  }

});
