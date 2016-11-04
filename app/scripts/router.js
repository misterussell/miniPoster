import $ from 'jquery';
import Backbone from 'backbone';
//collections
import Posts from './collections/Posts';
import Users from './collections/Users';
//models
import Session from './models/Session';
//views
import NavView from './views/navView';
import LoginForm from './views/login';
import RegisterForm from './views/register';
import PostForm from './views/newPost';
import PostList from './views/postList';

//other req. files
import config from './config';
import headers from './headers';

const container = $('.container');
let session = new Session();
let posts = new Posts();
let users = new Users();

//.ajaxSend header control
headers(session);

const Router = Backbone.Router.extend({
  routes: {
    ''        : 'home',
    'login'   : 'login',
    'register': 'signUp',
    'post'    : 'submitPost',
    'allPosts': 'viewAll'
  },
  home() {
    if (session.get('user-token')) {
      this.navigate('allPosts', {trigger: true});
    } else {
      this.navigate('login', {trigger: true});
    }
  },
  login(){
    let loginForm = new LoginForm({model: session});
    let loginPage = new NavView({
      model: session,
      children: [loginForm]
    });
    container.empty();
    loginPage.render();
    container.append(loginPage.el);
    console.log(session);
  },
  signUp() {
    container.empty();
    let registerForm = new RegisterForm({model: session});
    let registerPage = new NavView({
      model: session,
      children: [registerForm]
    });
    registerPage.render();
    container.append(registerPage.el);
    console.log(session);
  },
  submitPost() {
    if (!session.get('user-token')) {
      this.navigate('', {trigger: true});
    } else {
      let postForm = new PostForm({
        model: session,
        collection: posts
      });
      let postPage = new NavView({
        model: session,
        collection: posts,
        children: [postForm]
      });
      container.empty();
      postPage.render();
      container.append(postPage.el);
    }
    console.log(session);
  },
  viewAll() {
    if (!session.get('user-token')) {
      this.navigate('', {trigger: true});
    } else {
      posts.fetch();
      container.empty();
      let postList = new PostList({
        session: session,
        collection: posts
      });
      let allPosts = new NavView({
        model: session,
        collection: posts,
        children: [postList]
      });
      allPosts.render();
      container.append(allPosts.el);
    }
    console.log(session);
  }
});

let router = new Router();

export default router;
