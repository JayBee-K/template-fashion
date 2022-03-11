let windowWidth = $(window).width();
const handleTouchMove = function (ev) {
    ev.preventDefault();
}

const handleIsHoverNavigation = function () {
    $('#header-navigation > li').hover(function () {
        $(this).addClass('is-hover');
    }, function () {
        $(this).removeClass('is-hover');
    });
};

const slideHeader = function () {
    new Swiper('#header-slide', {
        loop: true,
    });
}

const slideBanner = function () {
    new Swiper('#banner-slide', {
        loop: true,
    });
}


const handleFloatCurrency = function () {
    $('.float-currency_current').click(function () {
        if ($(this).parent().hasClass('show')) {
            $(this).parent().removeClass('show');
        } else {
            $(this).parent().addClass('show');
        }
    });

    $('.float-currency_list > a').click(function () {
        $('.float-currency_list > a').removeClass('active');
        $(this).addClass('active');
        $('.float-currency_current > span').html($(this).html());
        $('.float-currency_current').trigger('click');
    });

    $(document).mouseup(function (e) {
        let elm = $('.float-currency.show');
        elm.is(e.target) || 0 !== elm.has(e.target).length || (
            elm.removeClass('show')
        )
    });
}

const handleFloatLocation = function () {
    $('.float-location_list > .float-location_list__inner > a').click(function () {
        if ($(this).hasClass('active')) {
            return false;
        } else {
            let image = $(this).attr('data-image'),
                name = $(this).attr('data-name'),
                html = `<img src="${image}">${name}`;

            $('.float-location_list > .float-location_list__inner > a').removeClass('active');
            $(this).addClass('active');
            $('.float-location_current > span').html(html);
            $('#collapse-location').collapse('hide');
        }
    });

    $(document).mouseup(function (e) {
        let elm = $('#collapse-location.show');
        elm.is(e.target) || 0 !== elm.has(e.target).length || (
            elm.collapse('hide')
        )
    });
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
        });


        const previewPhoto = new Swiper('#preview-photo', {
            thumbs: {
                swiper: previewThumb,
            },
        });

        $('#popupDetailProduct').modal('show');
        handlePopupDetailAmountProduct();
        handleZoomImageProduct($('#popupDetailProduct [data-fancybox]'), previewPhoto, previewThumb);
        handleChooseColorProduct(previewPhoto, previewThumb);
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

    elm.fancybox({
        loop: false,
        keyboard: false,
        toolbar: false,
        infobar: false,
        touch: false,
        arrows: false,
        wheel: false,
        clickContent: false, backFocus: false,
        afterLoad: function (instance, current) {
            i++;
            if (i == 1) {
                $('.fancybox-container').find('.fancybox-inner').append(wrapButton);
            }
        },
        beforeShow: function (instance, current) {
            handleMoveSlide(previewPhoto, previewThumb, $(`[data-fancybox='popupDetailGallery'][href='${current.src}']`).attr('data-index'));
        },
    });
}

const handleMoveSlide = function (previewPhoto, previewThumb, index) {
    previewPhoto.slideTo(index - 1);
    previewThumb.slideTo(index - 1);
    let indexItemThumb = index - 1;
    let heightItemThumb = $(previewThumb.slides[indexItemThumb]).height() + 11;
    previewThumb.translateTo(indexItemThumb * -heightItemThumb, 150, false, false);
}

const handleChooseColorProduct = function (previewPhoto, previewThumb) {
    $('input[name="choose-color"]').change(function () {
        let image = $(this).attr('data-image');
        let color = $(this).attr('data-color');
        $('#color-text').html(color);
        $(previewPhoto.slides).map(function () {
            if ($(this).find('.preview-photo_item > a').attr('href') == image) {
                handleMoveSlide(previewPhoto, previewThumb, $(this).find('.preview-photo_item > a').attr('data-index'));
            }
        });
    });
}

/*
End Popup Detail
 */

$(function () {
    handleIsHoverNavigation();
    slideHeader();
    slideBanner();
    handlePopupDetailProduct();
    handleFloatCurrency();
    handleFloatLocation();
    AOS.init({
        easing: "ease-out-quad",
        once: !0,
        offset: 60,
        disableMutationObserver: !0
    });
});