// require localhost or HTTPS origin for this page
// required for Chrome browser to use getUserMedia()
if (window.location.host !== 'localhost' && window.location.protocol !== 'https:') {
   window.location.href = window.location.href.replace(window.location.protocol, 'https:');
}
