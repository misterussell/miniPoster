import Backbone from 'backbone';

import user from '../models/Session';

export default Backbone.Collection.extend({
  model: user,
  url: 'https://api.backendless.com/v1/users',
  parse(data) {
    return data.data;
  }
});
