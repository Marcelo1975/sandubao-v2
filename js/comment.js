$('#comments').on('submit', function(event) {
    event.preventDefault();
 
    var formData = new FormData(this);
 
    $.ajax({
      type: "POST",
      url: "./comment.php",
      data: formData,
      processData:false,
      contentType:false,
      cache:false,
      success: function(data) {
         console.log(data);
            // Success comment
            $('#success_1').html("<div class='alert alert-success'>");
            /*$('#success_1 > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");*/
                
            $('#success_1 > .alert-success')
                .append("<strong>Sua opinião foi enviada com sucesso. </strong>");
            $('#success_1 > .alert-success')
                .append('</div>');

            //clear all fields
            $('#comments').trigger("reset");

            setTimeout(function(){
                window.location.href = window.location.href;
            }, 3000);
        },
        error: function() {
            // Fail comment
            $('#success_1').html("<div class='alert alert-danger'>");
            $('#success_1 > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#success_1 > .alert-danger').append("<strong>Sorry " + comment + ", Opss! ouve algum erro, tente novamente mais tarde.");
            $('#success_1 > .alert-danger').append('</div>');
            //clear all fields
            $('#comments').trigger("reset");
        },
    });
 });
