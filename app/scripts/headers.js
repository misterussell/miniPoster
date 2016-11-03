import Backbone from 'backbone';

export default function() {

return $(document).ajaxSend((evt, xhr, opts) => {
	xhr.setRequestHeader('application-id', config.appId);
	xhr.setRequestHeader('secret-key', config.secret);
	xhr.setRequestHeader('application-type', 'REST');
	if (session.get('user-token')) {
		xhr.setRequestHeader('user-token', session.get('user-token'));
	}
});

}
