import $ from 'jquery';
import Backbone from 'backbone';

import PostItem from './postItem';

export default Backbone.View.extend({
  // initialize(opts) {
  //   this.session = opts.session;
  // },
  tagName: 'ul',
  className: 'post-list',
  render() {
    this.$el.empty();
    this.collection.on('update', () => {
    this.collection.forEach((item, i, arr) => {
      let listItem = new PostItem({model: item});
      // let listItem = new PostItem({model: item, session: this.session});
      listItem.render();
      this.$el.append(listItem.el);
      // console.log(userName);
    });
  });
  }
});
