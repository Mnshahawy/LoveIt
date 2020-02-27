jQuery(function ($) {
    'use strict';
    $(document).ready(function () {
        var $form = $("#contactForm");
        if ($form) {
            $form.submit((e) => {
                e.preventDefault();
                let name = $("#name").val();
                let email = $("#email").val();
                let sub = $("#subject").val();
                let msg = $("#message").val();
                let url = $form.attr('action');
                /* TODO: Add more input validation */
                let isDark = window.localStorage.getItem('theme') === 'dark';
                var loading = "<img id='#spinner' src='/images/loading";
                loading +=  isDark ? "-dark" : "";
                loading += ".svg' alt='loading' style='margin-top:10px;' height='38' width='38'/>"
                $("#submit").replaceWith(loading);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                let sp = $("img");
                xhr.setRequestHeader('Content-Type','application/json');
                xhr.send(JSON.stringify({ name: name, reply_to: email, subject: sub, message: msg }));
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {       
                        if (xhr.status === 200) {
                            sp.replaceWith(generateAlert(true,"Your message was sent successfully. Thank you for contacting me."));
                        } else {
                            sp.replaceWith(generateAlert(false,"Some error occurred with status: " + xhr.status + ". Please, try again later or email me directly."))
                        }
                    }
                };

            })
        }
    });
    function generateAlert(isSuccess, Message){
        var alert = "<div style='margin-top:10px;' class='alert alert-dismissible alert-";
        alert += isSuccess?'success':'danger';
        alert += "' role='alert'>"
        alert += Message;
        alert += "<button type='button' class='close' onclick=\"" + "this.parentElement.style.display='none';" +"\" aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>";
        return alert;
    }
});