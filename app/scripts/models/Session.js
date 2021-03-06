import $ from 'jquery';
import Backbone from 'backbone';

import router from '../router';
import config from '../config';
import headers from '../headers';

export default Backbone.Model.extend({
  idAttribute: '_id',
  initialize() {
  //   console.log(this);
    if (window.localStorage.getItem('user-token')) {
      let id = window.localStorage.getItem('user-token');

      this.set('userName', window.localStorage.getItem('userName'));
      this.set('user-token', window.localStorage.getItem('user-token'));
      this.set('ownerId', window.localStorage.getItem('ownerId'));
    }
  },
  register(email, password, name) {
    this.save(
      {email, password, name},
      {
        url: 'https://api.backendless.com/v1/users/register',
        success: (response) => {
          this.login(email, password);
        },
        error: (response) => {
          // console.log(response);
          console.log('User data not saved to server.');
        }
      }
    );
  },
  login(login, password) {
    this.save(
      {login, password},
      {
        url: 'https://api.backendless.com/v1/users/login',
        success: (response) => {
          // console.log(response);
          console.log('Successfuly logged in.');
          window.localStorage.setItem('user-token', response.get('user-token'));
          window.localStorage.setItem('userName', response.get('userName'));
          window.localStorage.setItem('ownerId', response.get('ownerId'));
          router.navigate('feed', {trigger: true});
        },
        error: function(response) {
          // console.log(response);
          alert('Log in not successful. Please try again.');
        }
    });
  },
  logout() {
		$.ajax({
			url: 'https://api.backendless.com/v1/users/logout',
			success: () => {
				this.clear();
				window.localStorage.clear();
        router.navigate('', {trigger: true});
			}
		});
	},
});
