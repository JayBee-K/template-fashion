let windowWidth = $(window).width();
const handleTouchMove = function (ev) {
	ev.preventDefault();
}
/*
 Popup Detail
 */
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
			loopAdditionalSlides: 0,
			spaceBetween: 15,
			slidesPerView: 4.5,
			freeMode: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			slideToClickedSlide: true,
			direction: "vertical",
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
		const previewPhoto = new Swiper('#preview-photo', {
			thumbs: {
				swiper: previewThumb,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});

		$('#popupDetailProduct').modal('show');
		handlePopupDetailAmountProduct();
		handleZoomImageProduct($('#popupDetailProduct [data-fancybox]'), previewPhoto, previewThumb);
	});
}

const handlePopupDetailAmountProduct = function () {
	$('.amount-button').click(function (e) {
		let type = parseInt($(this).attr('data-type')),
			inputAmount = $(this).parent().find('.amount-input'),
			value = parseInt(inputAmount.val());
		if (type == 1) {
			value += 1;
			inputAmount.val(value);
		} else if (type == 0) {
			if (value > 1) {
				value -= 1;
				inputAmount.val(value);
			}
		}
	});

	$('.amount-input').keyup(function () {
		if (isNaN($(this).val()) || $(this).val() < 1) {
			$(this).val(1);
		}
	});
};

const handleZoomImageProduct = function (elm, previewPhoto, previewThumb) {
	let wrapButton = `<div class="custom-button_wrapper">
							<a data-fancybox-prev class="custom-arrow_fancybox button-prev" href="javascript:;"><i class="fal fa-angle-left"></i></a>
                            <a data-fancybox-close class="custom-close_fancybox button-close" href="javascript:;"><i class="fal fa-times"></i></a>
                            <a data-fancybox-next class="custom-arrow_fancybox button-next" href="javascript:;"><i class="fal fa-angle-right"></i></a>
                        </div>`;

	let i = 0;
	$('[data-fancybox=popupDetailGallery]').click(function () {
		i = 0;
	});

	$(document).on('click', '[data-fancybox-prev]', function (e) {
		alert(1);
	});

	elm.fancybox({
		loop: false,
		keyboard: false,
		toolbar: false,
		infobar: false,
		touch: false,
		arrows: false,
		wheel: false,
		clickContent: false, backFocus: false,
		afterLoad: function () {
			i++;
			if (i == 1) {
				$('.fancybox-container').find('.fancybox-inner').append(wrapButton);
			}
			$('[data-fancybox-prev]').click(function () {
				$('#preview-photo .swiper-button-prev, #preview-thumb .swiper-button-prev').trigger('click');
			});
			$('[data-fancybox-next]').click(function () {
				$('#preview-photo .swiper-button-next, #preview-thumb .swiper-button-next').trigger('click');
			});
		},
		beforeShow: function (instance, current) {
			previewPhoto.slideTo($(`[data-fancybox='popupDetailGallery'][href='${current.src}']`).attr('data-index') - 1);
			previewThumb.slideTo($(`[data-fancybox='popupDetailGallery'][href='${current.src}']`).attr('data-index') - 1);
		}
	});
}

const handleActiveThumb = function (previewThumb, indexSlide, callback) {
	$(previewThumb.wrapperEl).find('.swiper-slide').removeClass('swiper-slide-thumb-active');
	$(previewThumb.slides[indexSlide]).addClass('swiper-slide-thumb-active');

	if (typeof callback === 'function') {
		callback(true);
	}
}

/*
End Popup Detail
 */

$(function () {
	handlePopupDetailProduct();
	AOS.init({
		easing: "ease-out-quad",
		once: !0,
		offset: 60,
		disableMutationObserver: !0
	});
});