let windowWidth = $(window).width();
const handleTouchMove = function (ev) {
    ev.preventDefault();
}

$(function () {
    $('#popupDetailProduct').on('hide.bs.modal', function () {
        $(this).addClass('modal-hide');
    }).on('hidden.on.modal', function () {
        $('body').removeClass('modal-overlay-white');
    }).on('show.bs.modal', function () {
        $(this).removeClass('modal-hide');
        $('body').addClass('modal-overlay-white');
    });
    $('.btn-quick_view').click(function (e) {
        $('#popupDetailProduct').modal('show');
    });

    AOS.init({
        easing: "ease-out-quad",
        once: !0,
        offset: 60,
        disableMutationObserver: !0
    });
});