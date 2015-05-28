 $( document ).ready(function()
    {
        $('#submit').on('click', function(e)
        {
            if ( $('#pwd').val() == $('#pwdtest').val() )
            {
                $.post("inscription", { email : $('#email').val(), password : $('#pwd').val(), firstName : $('#prenom').val(), lastName : $('#nom').val()  } );
            }
            else 
            {
                
            }
        });
    });