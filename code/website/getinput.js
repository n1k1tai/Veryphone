 $( document ).ready(function()
    {
        $('#submit').on('click', function(e)
        {
            var data = {}
            $.post("connexion.html", { email : $('#email').val(), password : $('#password').val() } );
        });
    });