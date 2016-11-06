import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'ul',
  template() {
    return `
      <li class="userName">User Name:${this.model.get('userName')}</li>
      <li class="bio">Bio info here</li>
      <li class="creationDate">Profile Created:${this.model.get('created')}</li>
    `;
  },
  render() {
    this.$el.append(this.template());
    this.model.on('change', () => {
      this.$el.empty();
      console.log(this.model);
      this.$el.append(this.template());
    });
  }
});
