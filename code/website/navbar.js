 $( document ).ready(function()
    {
        $('#signout').on('click', function(e)
        {
            $.post("/", { signout : true});
        });
    });