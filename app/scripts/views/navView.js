import Backbone from 'backbone';
import Nav from './nav';

export default Backbone.View.extend({
  initialize(opts) {
    this.children = opts.children || [];
    console.log(this.model);
  },
  render() {
    let nav = new Nav({model: this.model});
    nav.render();
    this.$el.append(nav.el);
    this.children.forEach((child, i, arr) => {
      if (child.collection) {
        child.collection.on('update', () => { child.render(); });
        // console.log('collection rendering child');
      }
      if (child.model) {
        child.model.on('change', () => { child.render(); });
        // console.log('model rendering child');
      }

      child.render();
      this.$el.append(child.el);
    });
  }
});
