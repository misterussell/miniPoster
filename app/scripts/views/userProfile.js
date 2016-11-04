import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'ul',
  template() {
    return `
      <li class="userName">UserName</li>
      <li class="creationDate">Date of Creation</li>
    `;
  },
  render() {
    this.$el.append(this.template());
  }
});
