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
import ProfileData from './views/userProfile';

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
    'feed'    : 'viewAll',
    'profile' : 'myProfile',
    'user/:id': 'userProfile'
  },
  home() {
    if (session.get('user-token')) {
      this.navigate('feed', {trigger: true});
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
  },
  myProfile() {
    container.empty();
    posts.fetch({url: `https://api.backendless.com/v1/data/Posts?where=` + escape(`ownerId='${session.get('ownerId')}'`)});
    console.log(session);
    console.log(posts);
    let profileData = new ProfileData({model: session});
    let postList = new PostList({collection: posts, session});
    let userProfile = new NavView({children: [profileData, postList]});
    userProfile.render();
    container.append(userProfile.el);
  },
  userProfile(id) {
    // console.log(id, session.get('ownerId'));
    if(id === session.get('ownerId')) {
      // if id = session id navigate to my profile
      this.navigate('profile', {trigger: true});
    } else {
      let user = new Session();
      users.fetch({url: `https://api.backendless.com/v1/data/Users?where=` + escape(`ownerId='${id}'`)});
      user.get({url: `https://api.backendless.com/v1/data/Users?where=` + escape(`ownerId='${id}'`)});
      posts.fetch({url: `https://api.backendless.com/v1/data/Posts?where=` + escape(`ownerId='${id}'`)});
      console.log(user, users);

      let profileData = new ProfileData({model: users});
      let postList = new PostList({collection: posts, session: user});
      let userProfile = new NavView({children: [profileData, postList]});
      container.empty();
      userProfile.render();
      container.append(userProfile.el);
    }
  }
});

let router = new Router();

export default router;
