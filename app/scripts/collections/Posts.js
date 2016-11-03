import Backbone from 'backbone';

import post from '../models/post';

export default Backbone.Collection.extend({
  model: post,
  url: 'https://api.backendless.com/v1/data/Posts',
  parse(data) {
    return data.data;
  }
});
