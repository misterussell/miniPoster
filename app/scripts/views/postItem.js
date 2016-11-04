import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'li',
  template() {
    return `
      <a href="#post/${this.model.id}">${this.model.get('body')}</a>
    `;
  },
  render() {
    this.$el.append(this.template());
  }

});
