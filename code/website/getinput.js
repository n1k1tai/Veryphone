 $( document ).ready(function()
    {
        $('#submit').on('click', function(e)
        {
            var data = {}
            $.post("connexion", { email : $('#email').val(), password : $('#pwd').val() } );
        });
    });