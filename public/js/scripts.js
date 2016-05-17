$(function () {
    //Post CVomment
    $('#post-comment').hide();
    $('#btn-comment').on('click', function (event) {

        event.preventDefault();
        $('#post-comment').toggle();

    });
    // Buttton Like
    $('#btn-like').on('click', function (event) {

        event.preventDefault();
        var imgid = $(this).data('id');
        $.post('/images/' + imgid + '/like').done(function (data) {
            $('.likes-count').text(data.likes);

        });
    });
    //Button Delete
    $('#btn-delete').on('click', function (event) {
        event.preventDefault();
        var $this = $(this);

        var remove = confirm('Are you sure you want to remove the image?');

        if (remove) {
            var imgId = $(this).data('id');
            $.ajax({
                url: '/images/' + imgId,
                type: 'DELETE'
            }).done(function (result) {
                if (result) {
                    $this.removeClass('btn-danger').addClass('btn-success');
                    $this.find('i').removeClass('fa-times').addClass('fa-check');
                    $this.append('<span> Image Deleted! </span>');
                }
            });

        }


    });

});