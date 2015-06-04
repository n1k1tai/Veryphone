 $( document ).ready(function()
    {
        $('#submit').on('click', function(e)
        {
            var message = { email : $('#email').val(), password : $('#pwd').val() };

            $.ajax({
                type: 'POST',
                data: Msg,
                url: '/connexion',
                dataType: 'JSON'
                }).success(function(data, textStatus, req ) {
                    if(data.msg==="redirect") window.location = data.location;

                }).error(function(data, textStatus, req) {
                    if(req=="Unauthorized") 
                    {
                        window.location = "/connexion";
                    } 
            //...
            });
        });
    });

