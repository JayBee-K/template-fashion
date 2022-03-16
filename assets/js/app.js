let windowWidth = $(window).width();
const handleTouchMove = function (ev) {
    ev.preventDefault();
}

const handleInitNavigationMobile = function () {
    if (windowWidth < 992) {
        $('#header-navigation').prepend(`<div class="header-navigation_close"><a href="javascript:void(0)" id="close-navigation"><i class="fal fa-times"></i></a></div>`);

        $('#header-navigation > ul > li .header-navigation_sub__list').map(function (index) {
            let htmlSpan = `<span data-toggle="collapse" data-target="#header-navigation_sub__${index}" class="header-navigation_sub__icon"><i class="fal fa-angle-down"></i></span>`;
            $(this).parent().addClass('is-sub');
            $(this).prev().after(htmlSpan);
            $(this).attr({
                "id": "header-navigation_sub__" + index,
                "class": "navigation-sub_inner header-navigation_sub__list collapse list-unstyled mb-0",
                "data-parent": "#header-navigation"
            });
        });

        $('#header-navigation > ul > li .header-navigation_sub__list .sub-item > ul').map(function (index) {
            let htmlSpan = `<span data-action="collapse-child" data-toggle="collapse" data-target="#header-navigation_sub__child___${index}" class="header-navigation_sub__icon__child"><i class="fal fa-angle-down"></i></span>`;
            $(this).prev().after(htmlSpan);
            $(this).attr({
                "id": "header-navigation_sub__child___" + index,
                "class": "collapse list-unstyled mb-0",
            });
        });

        $('.header-navigation_sub__icon').click(function () {
            $('#header-navigation > ul > li .header-navigation_sub__list .sub-item > ul').collapse('hide');
        });
        $('.header-navigation_sub__icon__child').click(function () {
            $('#header-navigation > ul > li .header-navigation_sub__list .sub-item > ul').collapse('hide');
        });

        $('#call-navigation').click(function () {
            $('body').addClass('body-open_navigation');
            document.addEventListener('touchmove', handleTouchMove, {passive: false});
        });

        $('#close-navigation').click(function () {
            $('#float-overlay').trigger('click');
        });
    }
}

// ======================================
// Hover Navigation
// ======================================
const handleIsHoverNavigation = function () {
    if (windowWidth > 991) {
        $('#header-navigation > ul > li').hover(function () {
            $(this).addClass('is-hover');
        }, function () {
            $(this).removeClass('is-hover');
        });
    }
};

// ======================================
// Sticky Header
// ======================================
const handleStickyHeader = function () {
    let body = document.body,
        html = document.documentElement,
        height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    if ($('#sidebar-sticky').length > 0)
        $('#sidebar-sticky').css('top', '5px');

    if ($('#product-preview').length > 0)
        $('#product-preview').css('top', '5px');

    if ($('#cart-sidebar').length > 0)
        $('#cart-sidebar').css('top', '5px');

    if (height > (screen.height + 300)) {
        $(window).scroll(function () {
            let top = $(document).scrollTop();
            let height = $('#header').height();

            if (top > height) {
                $('#header').addClass('header-sticky');
                if ($('#sidebar-sticky').length > 0)
                    $('#sidebar-sticky').css('top', ($('#header').height() + 10) + 'px');

                if ($('#product-preview').length > 0)
                    $('#product-preview').css('top', ($('#header').height() + 10) + 'px');

                if ($('#cart-sidebar').length > 0)
                    $('#cart-sidebar').css('top', ($('#header').height() + 10) + 'px');
            } else {
                $('#header').removeClass('header-sticky');
                if ($('#sidebar-sticky').length > 0)
                    $('#sidebar-sticky').css('top', '5px');

                if ($('#product-preview').length > 0)
                    $('#product-preview').css('top', '5px');

                if ($('#cart-sidebar').length > 0)
                    $('#cart-sidebar').css('top', '5px');
            }
        });
    }
}

// ======================================
// Slide
// ======================================
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

// ======================================
// Float current
// ======================================
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

// ======================================
// Float Location
// ======================================
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

// ======================================
// Cart
// ======================================
const handleTouchMoveCart = function (ev) {
    if (!$(ev.target).closest('.body-open_cart .float-cart').length) {
        ev.preventDefault();
    }
}

const handleFloatCart = function () {
    $('.call-cart').click(function () {
        alert(2);
        $('body').addClass('body-open_cart');
        handleAmountProduct(true);
        handleCloseCart();
        document.addEventListener('touchmove', handleTouchMoveCart, {passive: false});
    });
}

const handleCloseCart = function () {
    $('#close-cart').click(function () {
        $('#float-overlay').trigger('click');
        document.removeEventListener('touchmove', handleTouchMoveCart);
    });
}

// ======================================
// Click Overlay
// ======================================
const handleTriggerOverlay = function () {
    $('#float-overlay').click(function () {
        $('body').removeClass('body-open_cart body-open_search body-open_category body-open_navigation');
        document.removeEventListener('touchmove', handleTouchMove);
    });
}

// ======================================
// Search
// ======================================
const handleSearch = function () {
    $('.call-search').click(function () {
        $('body').addClass('body-open_search');
        if (windowWidth > 991) {
            $('.float-search .search-form .search-inner').css('height', $('.header-top').height() + $('.header-navigation').height());
        } else {
            $('.float-search .search-form .search-inner').css('height', $('.header-top').height());
            $('.float-search .search-form .search-inner > input, .float-search .search-form .search-inner .btn-close, .float-search .search-form .search-inner .btn-search').css('height', $('.header-top').height());
        }
    });

    $('#search-input').keyup(function () {
        if ($(this).val() !== '') {
            setTimeout(function () {
                $('#search-result').fadeIn();
            }, 500);
        }
    });

    handleCloseSearch();
}
const handleCloseSearch = function () {
    $('#close-search').click(function () {
        $('#float-overlay').trigger('click');
    });
}

// ======================================
// Fixed Category
// ======================================
const handleCategoryFloatMobile = function () {
    $('.call-filter').click(function () {
        $('body').addClass('body-open_category');
    });

    handleCloseCategoryFloatMobile();
}
const handleCloseCategoryFloatMobile = function () {
    $('#close-category').click(function () {
        $('#float-overlay').trigger('click');
    });
}
// ======================================
// Detail Product
// ======================================
const handleDetailProduct = function () {
    if ($('#product-detail').length > 0) {
        const previewThumb = new Swiper('#detail-preview_thumb', {
            loopAdditionalSlides: 0,
            spaceBetween: 15,
            slidesPerView: 4.5,
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            direction: "vertical",
        });

        const previewPhoto = new Swiper('#detail-preview_photo', {
            thumbs: {
                swiper: previewThumb,
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    loop: true,
                    slidesPerView: 1.5,
                    centeredSlides: true,
                    spaceBetween: 5,
                },
                767: {
                    slidesPerView: 1,
                }
            }
        });

        handleAmountProduct(false);
        handleZoomImageProduct($('#product-detail [data-fancybox]'), previewPhoto, previewThumb, true);
        handleChooseColorProduct($('input[name="detail-choose_color"]'), $('#detail-color_text'), previewPhoto, previewThumb);
        handleRateStar();

        $('.call-modal_review').click(function () {
            let index = $(this).attr('data-index'),
                elmWrapper = $('#popupReview'),
                elmSlide = '#popupReview .review-slide',
                nextSlide = '#popupReview .button-next',
                prevSlide = '#popupReview .button-prev';

            const reviewSlide = new Swiper(elmSlide, {
                allowTouchMove: false,
                effect: 'fade',
                navigation: {
                    nextEl: nextSlide,
                    prevEl: prevSlide,
                }
            });
            reviewSlide.slideTo(index - 1);
            elmWrapper.modal('show');
        });

        $('#create-review').click(function () {
            $(this).hide();
            $('#review-form').fadeIn();
        });
        $('#close-review').click(function () {
            $('#review-form').hide();
            $('#create-review').fadeIn();
        });
    }
}

const handleRateStar = function () {
    $('.rate-before  svg').click(function () {
        let index = $(this).attr('data-index');
        $('.rate-after').css('width', (index * 20) + '%');
    });
    $('.rate-after svg').click(function () {
        let index = $(this).attr('data-index');
        $('.rate-after').css('width', ((index - 1) * 20) + '%');
    });
}

// ======================================
// Page Cart
// ======================================
const handlePageCart = function () {
    if ($('#page-cart').length > 0) {
        handleAmountProduct();

        $('.cart-remove').click(function () {
            let elmWrapper = $(this).closest('.cart-list_item');
            elmWrapper.fadeIn(function () {
                elmWrapper.remove();
            })
        });
    }
}


// ======================================
// Popup Product
// ======================================
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
        handleAmountProduct(false);
        handleZoomImageProduct($('#popupDetailProduct [data-fancybox]'), previewPhoto, previewThumb, false);
        handleChooseColorProduct($('input[name="choose-color"]'), $('#color-text'), previewPhoto, previewThumb);
    });
}

// ======================================
// Amount Product
// ======================================

const handleAmountProduct = function (cart = false) {
    $('.amount-button').click(function (e) {
        let type = parseInt($(this).attr('data-type')),
            inputAmount = $(this).parent().find('.amount-input'),
            value = parseInt(inputAmount.val());
        if (type == 1) {
            value += 1;
            inputAmount.val(value);
        } else if (type == 0) {
            if (!cart) {
                if (value > 1) {
                    value -= 1;
                    inputAmount.val(value);
                }
            } else {
                let elm = $(this),
                    elmItem = elm.closest('.cart-body_list__item'),
                    elmWrapItem = elmItem.closest('.float-cart_body');
                elmItem.fadeOut(function () {
                    $.when(elmItem.remove()).then(function () {
                        if (elmWrapItem.find('.cart-body_list__item').length == 0) {
                            elmWrapItem.hide();
                            elmWrapItem.closest('.float-cart').find('.float-cart_empty').show();
                        }
                    });
                });
            }
        }
    });

    $('.amount-input').keyup(function () {
        if (isNaN($(this).val()) || $(this).val() < 1) {
            $(this).val(1);
        }
    });
};

// ======================================
// Zoom Fancy Product
// ======================================
const handleZoomImageProduct = function (elm, previewPhoto, previewThumb, type = true) {
    let wrapButton = `<div class="custom-button_wrapper">
							<a data-fancybox-prev class="custom-arrow_fancybox button-prev" href="javascript:;"><i class="fal fa-angle-left"></i></a>
                            <a data-fancybox-close class="custom-close_fancybox button-close" href="javascript:;"><i class="fal fa-times"></i></a>
                            <a data-fancybox-next class="custom-arrow_fancybox button-next" href="javascript:;"><i class="fal fa-angle-right"></i></a>
                        </div>`;

    let i = 0;
    if (type) {
        $('[data-fancybox=detailGallery]').click(function () {
            i = 0;
        });
    } else {
        $('[data-fancybox=popupDetailGallery]').click(function () {
            i = 0;
        });
    }

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
            if (type) {
                handleMoveSlide(previewPhoto, previewThumb, $(`[data-fancybox='detailGallery'][href='${current.src}']`).attr('data-index'));
            } else {
                handleMoveSlide(previewPhoto, previewThumb, $(`[data-fancybox='popupDetailGallery'][href='${current.src}']`).attr('data-index'));
            }
        },
    });
}

// ======================================
// Move Slide Product
// ======================================
const handleMoveSlide = function (previewPhoto, previewThumb, index) {
    if (windowWidth > 767) {
        previewPhoto.slideTo(index - 1);
        previewThumb.slideTo(index - 1);
        let indexItemThumb = index - 1;
        let heightItemThumb = $(previewThumb.slides[indexItemThumb]).height() + 11;
        previewThumb.translateTo(indexItemThumb * -heightItemThumb, 150, false, false);
    } else {
        previewPhoto.slideToLoop(index - 1);
    }
}

// ======================================
// Choose color Product
// ======================================
const handleChooseColorProduct = function (input, elm, previewPhoto, previewThumb) {
    input.change(function () {
        let image = $(this).attr('data-image');
        let color = $(this).attr('data-color');
        elm.html(color);
        $(previewPhoto.slides).map(function () {
            if ($(this).find('.preview-photo_item > a').attr('href') == image) {
                handleMoveSlide(previewPhoto, previewThumb, $(this).find('.preview-photo_item > a').attr('data-index'));
            }
        });
    });
}

// ======================================
// Input Floating
// ======================================
const handleFloatInput = function () {
    $('.float-input .float-input_item').blur(function () {
        if ($(this).val() != "") {
            $(this).closest('.float-input').addClass("valid");
        } else {
            $(this).closest('.float-input').removeClass("valid");
        }
    });
}


// ======================================
// Collapse No Hide
// ======================================
const handleCollapseNoHide = function () {
    $('.theme-collapse_nohide').click(function (e) {
        if ($(this).attr('aria-expanded') == 'true') {
            return false;
        }
    });
}

// ======================================
// Collapse Checkout
// ======================================
const handleCheckOutCollapse = function () {
    $('#checkout-collapse').on('show.bs.collapse', function () {
        $('#checkout-collapse_button .checkout-button_grid__title').html('Ẩn tổng quan đơn hàng <i class="fas fa-angle-up"></i>');
    }).on('hide.bs.collapse', function () {
        $('#checkout-collapse_button .checkout-button_grid__title').html('Hiển thị tổng quan đơn hàng <i class="fas fa-angle-down"></i>');
    });
}

$(function () {
    handleInitNavigationMobile();
    handleIsHoverNavigation();
    handleStickyHeader();
    handleDetailProduct();
    handlePopupDetailProduct();
    handleFloatCurrency();
    handleFloatLocation();
    handleFloatCart();
    handleFloatInput();
    handleTriggerOverlay();
    handleSearch();
    handleCategoryFloatMobile();
    handlePageCart();
    handleCollapseNoHide();
    handleCheckOutCollapse();

    slideHeader();
    slideBanner();
    AOS.init({
        easing: "ease-out-quad",
        once: !0,
        offset: 60,
        disableMutationObserver: !0
    });

    $('[data-toggle="tooltip"]').tooltip()
});