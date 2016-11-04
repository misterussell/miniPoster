import $ from 'jquery';
import Backbone from 'backbone';

import PostItem from './postItem';

export default Backbone.View.extend({
  tagName: 'ul',
  className: 'post-list',
  render() {
    this.$el.empty();
    this.collection.on('update', () => {
    this.collection.forEach((item, i, arr) => {
      let listItem = new PostItem({model: item});
      listItem.render();
      this.$el.append(listItem.el);
    });
  });
  }
});
