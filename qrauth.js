jQuery(function($){

    // Copied from: http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
    function qualifyURL(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.href;
    }

    // jQuery nodes
    var $input = $('input[name=qrauth_qrcode]');
    var $form = $input.closest('form');
    var $qrcode = $('<div class="qrauth_qrcode">');

    // regular vars
    var qrcode = $input.attr('value');
    var authUrl = qualifyURL('/qrauth/' + qrcode);
    var waitUrl = qualifyURL('/qrwait/' + qrcode);

    // Setting jQuery data to $qrcode div
    $qrcode.data('qrauth', {qrcode: qrcode, round: 0});

    // Generating qrcode canvas
    $qrcode.appendTo($form).qrcode({
        text: authUrl,
    }).find('canvas:first-child').css({
        width: '100%',
        maxWidth: 200,
    });

    // Starting busy waiting queue
    setTimeout(function cycle() {
        $.getJSON(waitUrl, function(data) {
            if (data) {
                if (data.authenticated) {
                    $form.submit();
                } else if (data.deleted) {
                    // Hide qrcode canvas
                    $qrcode.remove();
                } else {
                    // Restarting queue
                    setTimeout(cycle, 2000);
                    $qrcode.data('qrauth').round++;
                }
            }
        });
    }, 2000);
});