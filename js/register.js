if(localStorage.getItem('user')){
	window.location.href="index.html"
};
$("input").keypress(function(e) {
    if(e.which == 13) {
        register()
    }
});
function register() {
    var usuario = $("input[name=user]").val();
    var genre = $("input[name=genre]").val();
    var email = $("input[name=email]").val();
    var passin = $("input[name=pass]").val();
    var passinc = $("input[name=confpass]").val();
    var birthday = $("input[name=birthday]").val();
    var telf = $("input[name=telf]").val();
    if(passin == passinc){
    $.ajax({
          type: "GET",
          crossDomain: true,
          url: "http://m2s.es/app/api/connect/register.php",
          data: "usuario="+usuario+"&genero="+genre+"&email="+email+"&password="+passin+"&passwordc="+passinc+"&cumple="+birthday+"&telefono="+telf,
          cache:false,
          dataType: 'jsonp',
          beforeSend: function() {
          console.log('Connecting...');
          $('#formsd').css('display','none');
          var sending = '<div id="sending-load"><img src="css/load-login.gif"></div>';
          $('.form').append(sending);
          },
          success: function(result) {
             $('#formsd').css('display','block');
             $('#sending-load').remove();
             if(result.mensaje == 'ok'){
                console.log(result.mensaje);
                var passinput = md5(passin);
	            login(usuario,passinput,'login');
             }else{
	             if(result.mensaje == 'e1'){
		            $.ajax({
                      type: "GET",
                      crossDomain: true,
                      url: "http://m2s.es/app/api/connect/signout.php",
                      cache:false,
                      dataType: 'jsonp',
                      success: function(result) {
                       if(result.mensaje == 'ok'){
	                     window.location.href="register.html"
                       }
                      }
                     })
	             };
	             if(result.mensaje == 'e2'){
	                errormod('The passwords do not match');
	             };
	             if(result.mensaje == 'e3'){
	                errormod('The username has been registered in M2S formerly');
	             };
	             if(result.mensaje == 'e4'){
	                errormod('The email has been registered in M2S formerly');
	             };
	             if(result.mensaje == 'e6'){
	                errormod("Required fields hasn't been introduced");
	             }
             }
          }
    })
    }else{
	    errormod('The passwords do not match');
    }
}