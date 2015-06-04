$(document).ready(function(){
    var element_code = $('.code_enter');
    var element_attempt = $('.attempt >span');
    var element_answer = $('.answer >span')
    $('.numeric').click(function(){
        var numeric = $(this).text();
        if(element_code.text().length > 4)
        {
            return false;
        }
        else if(element_code.text().length < 4)
        {
            element_code.append(numeric);
        }

    });

    $('#send').click(function(){
        if(element_code.text().length == 4)
        {
            var type =0;
            $.ajax({
                type: "POST",
                url: "/compare",
                dataType :"json",
                data: {user_code: element_code.text()},
                success: function (response) {
                    element_code.text('');
                    element_attempt.text(response.att);
                    if(response.res =='++++')
                    {
                        type=1;
                        element_answer.addClass('color_green').text('You win!!!');
                        $('.numeric').click(false);
                        $('#hint').click(false);
                        end_game(type);
                    }
                    else if(response.res =='Game over')
                    {
                        type=2;
                        element_answer.addClass('color_red').text(response.res);
                        end_game(type);
                    }
                    else
                    {
                        element_answer.removeClass('color_red');
                        element_answer.text(response.res);
                    }

                }
            });
        }
    });

    $('#del').click(function(){
        element_code.text('');
    });
    $('#hint').click(function(){
        $.ajax({
            type: "POST",
            url: "/hint",
            success: function (response) {
                element_code.text('');
                element_answer.addClass('color_red').text(response);
            }
        });
    });

});

function end_game(type)
{
    if(type ==2){
        $('#myModalLabel').text('Game Over');
    }
    $('#myModal').off('click.confirm').modal({backdrop: 'static', keyboard: false})
        .one('click.confirm', '.new_game, .end_game', function (e) {
            e.preventDefault();
            var element = $(this);
            if(element.hasClass('new_game'))
            {
                location.reload();
            }
            else if(element.hasClass('end_game'))
            {
                $('body').empty().append('<h1>Thanks for playing !</h1>');
                $('#myModal').modal('hide');
            }
        });
}
