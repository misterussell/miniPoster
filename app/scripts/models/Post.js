import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    body: '',
    userName: '',
  }
});
