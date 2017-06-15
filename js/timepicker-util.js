$(function() {
    $.each($('.cdatepicker_range'), function() {
        var input_id = this.id;

        $("<div class='cpickermodalcss' id='cpickermodal_" + this.id + "' style='display: none; '><span class='col-lg-6 mmm'><div id='cdatepicker_" + this.id + "1' ></div></span><span class='col-lg-6 mmm'><div id='cdatepicker_" + this.id + "2' ></div></span></div>").insertAfter($(this));

        $("#cdatepicker_" + this.id + "1").datetimepicker({
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm',
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText, inst) {
                var date = $(this).timepicker();
                var existing_range = $("#" + input_id).val();
                if (isValidRangeDate(existing_range) || existing_range == "") {
                    var new_range = date.val() + " - " + existing_range.substr(existing_range.indexOf(" - ") + 3);
                    $("#" + input_id).val(new_range);
                } else if (isValidRangeEnd(existing_range)) {
                    var new_range = date.val() + " - " + $.trim(existing_range.substr(existing_range.indexOf(" - ") + 3));
                    $("#" + input_id).val(new_range);
                } else {

                    var new_range = date.val() + " - ";
                    $("#" + input_id).val(new_range);
                }
            }
        });
        $("#cdatepicker_" + this.id + "2").datetimepicker({
            dateFormat: 'yy-mm-dd',
            timeFormat: 'HH:mm',
            changeMonth: true,
            changeYear: true,
            onSelect: function(dateText, inst) {
                var date = $(this).timepicker();
                var existing_range = $("#" + input_id).val();

                if (isValidRangeDate(existing_range) || existing_range == "") {
                    var new_range = existing_range.substr(0, existing_range.indexOf(" - ")) + " - " + date.val();
                    $("#" + input_id).val(new_range);
                } else if (isValidRangeBegin(existing_range)) {
                    var new_range = $.trim(existing_range.substr(0, existing_range.indexOf(" - "))) + " - " + date.val();
                    $("#" + input_id).val(new_range);
                } else {
                    var new_range = " - " + date.val();
                    $("#" + input_id).val(new_range);
                }
            }
        });


        $(this).on("click", function() {
            var begin_height = $(this).outerHeight();
            $("#cpickermodal_" + this.id).css({
                top: begin_height + "px"
            });
            $("#cpickermodal_" + this.id).css("display", "block");
        });

        $('#cdatepicker_' + this.id + '1, #cdatepicker_' + this.id + '2').click(function(event) {
            event.stopPropagation();
        });
    });

    $(window).click(function() {
        $(".cpickermodalcss").each(function() {
            if ($(this).css("display") == 'block') {
                $(this).css("display", "none");
            }
        });

    });

    $(".cdatepicker_range").each(function() {
        $(this).on("click", function(event) {
            event.stopPropagation();
        });
    });


    $(".uidatepicker").datetimepicker({
        changeMonth: true,
        changeYear: true
    });
});


function isValidRangeDate(date) {
    var re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9] - [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
    return re.test(date);
}

function isValidRangeBegin(date) {
    var re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9] -/;
    return re.test(date);
}

function isValidRangeEnd(date) {
    var re = /- [0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
    return re.test(date);
}