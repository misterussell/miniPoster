import $ from 'jquery';
import Backbone from 'backbone';

import config from './config';

export default function(session) {

return $(document).ajaxSend((evt, xhr, opts) => {
	xhr.setRequestHeader('application-id', config.appId);
	xhr.setRequestHeader('secret-key', config.secret);
	xhr.setRequestHeader('application-type', 'REST');
	if (session.get('user-token')) {
		xhr.setRequestHeader('user-token', session.get('user-token'));
	}
});

}
