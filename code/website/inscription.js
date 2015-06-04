 $( document ).ready(function()
    {
        $('#send').on('click', function(e)
        {
            e.preventDefault();
            if ( $('#pwd').val() == $('#pwdtest').val() )
            {
                var msg = { email : $('#email').val(), password : $('#pwd').val(), firstName : $('#prenom').val(), lastName : $('#nom').val()  };
                $.ajax({
                    type: 'POST',
                    data: msg,
                    url: '/connexion',
                    dataType: 'JSON'
                    }).success(function(data, textStatus, req ) {
                        if(data.msg==="redirect") window.location = data.location;

                    }).error(function(data, textStatus, req) {
                        if(req=="Unauthorized") 
                        {
                            window.location = "/";
                        } 
                        else if (data.msg==="redirect") window.location = data.responseJSON.location;

            });
            }
            else 
            {

            }
        });
    });