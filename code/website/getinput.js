 $( document ).ready(function() {
        function getVals(formControl, controlType) {
            switch (controlType) {
                case 'email':
                    // Get the value for email
                    var email = $(formControl).val();
                    break;   

                case 'password':
                    // Get the value for password
                    var password = $(formControl).val();
                    break;   
            }
            $("button").click(function(){
                $.post("10.10.3.232",
                    {
                        email: email,
                        password: password
                    }
                );
            }
        });