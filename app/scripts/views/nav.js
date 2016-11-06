import Backbone from 'backbone';

export default Backbone.View.extend({
  tagName: 'nav',
  template() {
    let menu = ``;
    console.log(this.model);
    if(this.model.get('user-token')){
     menu = `
      <div>
      <a href="#post">New Post</a>
      <a href="#feed">All Posts</a>
      <a href='#profile'>Your Profile</a>
      <a class="log-out">Log Out</a>
      </div>
      `;
    }else{
      menu +=`
      <div>
      <a href="#login">Login</a>
      <a href="#register">Sign-Up</a>
      </div>
      `;
    }
    return menu;
  },
  render() {
    this.$el.append(this.template());
  },
  events: {
    'click .log-out': 'logout'
  },
  logout(e) {
    e.preventDefault();
    this.model.logout();

  }

});
