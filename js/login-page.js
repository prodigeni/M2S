if(localStorage.getItem('user')){
	window.location.href="index.html"
};
function logininputs() {
	var userinput = document.getElementsByName('user')[0].value;
	var passinput = document.getElementsByName('pass')[0].value;
	var passinput = md5(passinput);
	login(userinput,passinput,'login');
}