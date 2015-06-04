 $( document ).ready(function()
    {
        $('#signout').on('click', function(e)
        {
        	e.preventDefault();
            var message = { signout : true };

            $.ajax({
                type: 'POST',
                data: message,
                url: '/',
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
        });
    });