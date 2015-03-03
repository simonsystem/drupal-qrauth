jQuery(function($){
    // Copied from: http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
    function qualifyURL(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.href;
    }

    var $input = $("input[name=qrauth_qrcode]");
    var $form = $input.closest("form");

    var qrcode = $input.attr("value");
    var authUrl = qualifyURL("/qrauth/" + qrcode);
    var waitUrl = qualifyURL("/qrwait/" + qrcode);

    $("<div>").appendTo($form).qrcode({
        text: authUrl,
    }).find("canvas:first-child").css({
        width: "100%",
        maxWidth: 200,

    });

    setTimeout(function cycle() {
        $.getJSON(waitUrl, function(data) {
            if (data && data.authenticated) {
                console.log("qr-authenticated by uid "+ data.uid);
                $form.submit();
            } else {
                setTimeout(cycle, 2000);
            }
        });
    }, 2000);
});