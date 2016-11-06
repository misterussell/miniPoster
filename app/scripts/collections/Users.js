import Backbone from 'backbone';

import user from '../models/Session';

export default Backbone.Collection.extend({
  model: user,
  url: 'https://api.backendless.com/v1/data/Users',
  search(id) {
    console.log(id);
    let filter = this.forEach(function(profile, i, arr) {
      console.log(profile.get('ownerId'));
      return profile.get('ownerId') === id;
    });
    console.log(filter);
    return filter;
  },
  parse(data) {
    return data.data;
  }
});
