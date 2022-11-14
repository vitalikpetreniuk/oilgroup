import $ from 'jquery';

window.jQuery = $;
window.$ = $;

import "readmore-js";

document.addEventListener('DOMContentLoaded', function () {
    var prevScrollpos = window.pageYOffset;

    /* Get the header element and it's position */
    var headerDiv = document.querySelector("header.header");
    var headerBottom = headerDiv.offsetTop + headerDiv.offsetHeight;

    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;

        /* if we're scrolling up, or we haven't passed the header,
           show the header at the top */
        if (prevScrollpos > currentScrollPos || currentScrollPos < headerBottom) {
            headerDiv.style.top = "0";
        } else {
            /* otherwise we're scrolling down & have passed the header so hide it */
            headerDiv.style.top = "-192px";
        }

        prevScrollpos = currentScrollPos;
    }

    $('.modal-open').on('click', function (e) {
        e.preventDefault();
        $('.modal').addClass('open');
        $('body').addClass('fixed');
    });
    $('.modal .bg').on('click', function () {
        $('.modal').removeClass('open');
        $('body').removeClass('fixed');
    });
    $('.modal .close').on('click', function () {
        $('.modal').removeClass('open');
        $('body').removeClass('fixed');
    });
    $('.tabs > ul').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs').find('.tab').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('.clicker').on('click', function () {
        $(this).addClass('active');
        $(this).parent().siblings().find('.clicker').removeClass('active');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
    });
    $('#listings').on('click', '.item:not(.active)', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.container').find('.toblock').removeClass('active').eq($(this).index()).addClass('active');
    });
    lightbox.option({
        'resizeDuration': 200,
        'disableScrolling': true,
        'fitImagesInViewport': true
    })


    $('.mega-sub-menu .back').on('click', function (e) {
        e.stopPropagation();
        $(this).parent('.mega-sub-menu').removeClass('active');
    })
    $(".menu-btn").on("click", function () {
        $('body').toggleClass('fixed')
        $('nav.menu').toggleClass('active');
    })

    window.matchMedia('(min-width: 992px)').addEventListener('change', windowSize)

    function windowSize(ma) {
        if ((ma && ma.matches) || $(window).width() < 992) {
            $('.collapse').readmore({
                speed: 75,
                moreLink: '<a href="#">See More</a>',
                collapsedHeight: 89
            });
            $('body').on('click', '.filt-btn', function () {
                $('.filter').toggleClass('active');
            });
            $("#mega-menu-primary>.mega-menu-item-has-children>a, .oilgroup-mega-wrap>ul>.mega-menu-item-has-children>a").on('click', function (e) {
                e.stopPropagation()
                e.preventDefault();
                console.log('1')
                $(this).parent().children(".mega-sub-menu").toggleClass('active');
            });

            $(".header.header nav.menu ul#mega-menu-primary>li>.mega-sub-menu").prepend('<div class="back"><span>Назад</span></div>');
            $('header.header nav.menu ul#mega-menu-primary>li>.mega-sub-menu .mega-menu-row .bruise>ul>li>a').on("click", function () {
                $(this).toggleClass("active")
                $(this).parent().siblings().removeClass("active");
            })
            $('.back').on('click', function () {
                $(this).parent().removeClass('active')
            })
            $('.tabs').addClass('swiper');
            $('.tab-inn').addClass('swiper-wrapper')
            $('.tab').addClass('swiper-slide')
            $('.lang-mob li.wpml-ls-current-language a').on("click", function (e) {
                e.stopPropagation()
                e.preventDefault();
                $('.lang-mob li:not(.wpml-ls-current-language)').show();
                $('*:not(.lang-mob li a)').on("click", function () {
                    $('.lang-mob li:not(.wpml-ls-current-language)').hide();
                })
            })
            const swiper = new Swiper('.swiper', {
                // Default parameters
                slidesPerView: 1,
                spaceBetween: 10,
                // Responsive breakpoints
                allowTouchMove: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
            $('.toblock').removeClass('active')
        } else {
            $(".header.header nav.menu ul#mega-menu-primary>li>.mega-sub-menu").find('.back').remove();
            $('.collapse').readmore('destroy');
            $('.tabs').removeClass('swiper');
            $('.tab-inn').removeClass('swiper-wrapper');
            $('.tab').removeClass('swiper-slide');
            $(".mega-sub-menu").mouseleave(function (e) {
                // e.stopPropagation(e);
                $(this).removeClass('active');
                $('body').removeClass('fixed')
            });
            $(".mega-sub-menu").mouseover(function (e) {
                // e.stopPropagation(e);
                $(this).addClass('active');
                $('body').addClass('fixed')
            });
            $("#mega-menu-primary > .mega-menu-item-has-children > a").mouseover(function (e) {
                e.stopPropagation();
                $(this).siblings(".mega-sub-menu").addClass('active');
            });
            $('#mega-menu-primary > .mega-menu-item-has-children > a').mouseleave(function (e) {
                e.stopPropagation();
                $(this).siblings('.mega-sub-menu').removeClass('active');
            });
            $('.tabs .tab:nth-of-type(1)').addClass('active');
        }
    }

    windowSize();
});
