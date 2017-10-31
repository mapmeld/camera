// require localhost or HTTPS origin for this page
// respect heroku.com -> herokuapp.com redirect
// required for Chrome browser to use getUserMedia()
if (window.location.host.split(':')[0] !== 'localhost' && window.location.protocol !== 'https:') {
   window.location.href = window.location.href
     .replace(window.location.protocol, 'https:')
     .replace('heroku.com', 'herokuapp.com');
}
