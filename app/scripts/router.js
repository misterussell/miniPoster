import $ from 'jquery';
import Backbone from 'backbone';
//collections
import Posts from './collections/Posts';
//models
import Session from './models/Session';
//views
import NavView from './views/navView';
import LoginForm from './views/login';
import RegisterForm from './views/register';
import PostForm from './views/newPost';

//other req. files
import config from './config';
import headers from './headers';

const container = $('.container');

let session = new Session();
let posts = new Posts();

const Router = Backbone.Router.extend({
  routes: {
    ''        : 'home',
    'register': 'signUp',
    'post'    : 'submitPost'
  },
  home() {
    let loginForm = new LoginForm({model: session});
    let loginPage = new NavView({
      model: session,
      children: [loginForm]
    });
    loginPage.render();
    container.append(loginPage.el);
  },
  signUp() {
    let registerForm = new RegisterForm({model: session});
    let registerPage = new NavView({
      model: session,
      children: [registerForm]
    });
    registerPage.render();
    container.append(registerPage.el);
  },
  submitPost() {
    let postForm = new PostForm({
      model: session,
      collection: posts
    });
    let postPage = new NavView({
      model: session,
      collection: posts,
      children: [postForm]
    });
  }
});

let router = new Router();

export default router;
