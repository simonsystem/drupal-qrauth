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
    var url = qualifyURL("/qrauth/" + qrcode);

    $("<div>").appendTo($form).qrcode({
        text: url,
    }).find("canvas:first-child").css({
        "width": "100%",
    });

    var action = $form.attr("action");
    var url = qualifyURL(action);

    $form = $form.clone()
    $form.find("input[name=name], input[name=pass]").remove();
    var data = $form.serialize();

    function testForVerification() {
        $.post(action, data, function(){
            setTimeout(testForVerification, 2000);
        });

    }

    setTimeout(testForVerification, 2000);
});