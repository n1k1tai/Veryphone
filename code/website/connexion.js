 $( document ).ready(function()
    {
        $('#submit').on('click', function(e)
        {
            var data = {}
            var email = $('email').val();
            function validateEmail(email) {
			    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			    return re.test(email);
			}
			// if (validateEmail(email)) {
            $.post("connexion", { email : $('#email').val(), password : $('#pwd').val() } );
            // } 
            // else {
            // 	$.post("connexion", { email : "Email invalide", password : "" } );
            // }
        });
    });