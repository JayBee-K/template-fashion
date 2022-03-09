let windowWidth = $(window).width();
const handleTouchMove = function (ev) {
	ev.preventDefault();
}

const handlePopupDetailProduct = function () {
	$('#popupDetailProduct').on('hide.bs.modal', function () {
		$(this).addClass('modal-hide');
	}).on('hidden.on.modal', function () {
		$('body').removeClass('modal-overlay-white');
	}).on('show.bs.modal', function () {
		$(this).removeClass('modal-hide');
		$('body').addClass('modal-overlay-white');
	});

	$('.btn-quick_view').click(function (e) {
		const previewThumb = new Swiper('#preview-thumb', {
			spaceBetween: 15,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: "vertical",
		});
		const previewPhoto = new Swiper('#preview-photo', {
			thumbs: {
				swiper: previewThumb,
			},
		});

		$('#popupDetailProduct').modal('show');
	});
}

$(function () {
	handlePopupDetailProduct();

	AOS.init({
		easing: "ease-out-quad",
		once: !0,
		offset: 60,
		disableMutationObserver: !0
	});
});