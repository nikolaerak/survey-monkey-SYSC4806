
$(document).ready(() => {


    // remove the next button, automatically go to next on submit
    const nextQuestionLink = $(`#nextBtnLink`).attr(`href`);
    $(`#nextBtn`).remove();

    getQuestion(parseInt($('#surveyQuestionValue')[0].value.split('question/')[1])).then(function(result){
        loadAnsweringDiv(result);
    })

    $("#submitBtn").click(function(event) {
        event.preventDefault();
        const form = $('#answerSurveyForm');
        const jsonData = {};
        $.each($(form).serializeArray(), function() {
            jsonData[this.name] = this.value;
        });
        const data = JSON.stringify(jsonData);
        console.log(data);
        $.ajax({
            url: `/api/response`,
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: data,
            success: function (data) {
                // load next question
                window.location.href = nextQuestionLink;
            },
            error: function (error) {
                console.log(error)
                //reject(error)
            },
        })
    });
});

function loadAnsweringDiv(question) {

    var questionHTML = '<div class="input-group-prepend">\n' +
        '           <span class="input-group-text">' + question.prompt + '</span>\n' +
        '           </div>\n';

    switch ($('#surveyTypeValue')[0].value) {
        case "TEXT" :
            questionHTML+='<textarea class="form-control" id="surveyTextArea" rows="3" name="answer"></textarea>';
            break;
        case "MC" :
            var choices = question.choices;
            questionHTML+='<div class="form-control">';
            for(var i = 0; i < choices.length; i++) {
                questionHTML+='<input class="ml-4" type=\"radio\" id=\"'+choices[i]+'\" name=\"answer\" value=\"'+choices[i]+'\">';
                questionHTML+='<label for="'+choices[i]+'">'+choices[i]+'</label>';
            }
            questionHTML+='<div>';
            break;
        case "NUMBER" :
            questionHTML+='<div class="form-control">';
            questionHTML+='<label for="answer">Choose a number:</label>';
            questionHTML+='<input type="number" id="answer" name="answer" min="'+question.min+'" max="'+question.max+'">';
            questionHTML+='<div>';
            break;
    }

    $('#questionContent').append(questionHTML);
}

function getQuestion(id) {
    return new Promise((resolve, reject) => {
        apiUrl = window.location.origin + '/api/question/' + id
        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function(data) {
                resolve(data)
            },
            error: function(error) {
                reject(error)
            },
        })
    })
}
