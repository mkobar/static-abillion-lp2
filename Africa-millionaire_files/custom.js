jQuery(document).ready(function ($) {
  //-----------------------------------------------------------------//

  //Show sub menu on hover
  $(".categories-menu").on("mouseover", function (event) {
    $(".sub-menu").css("display", "none");
    $(".categories-sub-menu").fadeIn("fast").css("display", "flex");
  });
  $(".sub-menu").on("mouseleave", function (event) {
    $(".categories-sub-menu").fadeOut("fast");
  });
  $(".no-sub-menu").on("mouseover", function (event) {
    $(".categories-sub-menu").fadeOut("fast");
  });
  $("#wallpaper_ad, .site-branding").on("mouseover", function (event) {
    $(".categories-sub-menu").fadeOut("fast");
  });
  var searchVisible = 0;
  $(".search-menu").click(function (event) {
    if (searchVisible == 0) {
      searchVisible = 1;
      $(".sub-menu").css("display", "none");
      $(".search-sub-menu").fadeIn("fast").css("display", "flex");
      $(".nav-search-bar").focus();
    } else {
      searchVisible = 0;
      $(".sub-menu").css("display", "none");
    }
  });
  /*
    $('.search-menu').click(function () {
        $('.nav-search-bar').focus();
    });
    */
  //-----------------------//

  //  Article top bar show/hide
  var bar_hidden = 0;
  if ($(".social-section").length) {
    $(window).scroll(function (event) {
      var elemTop = $(".social-section").offset().top;
      var elemBottom = elemTop + $(".social-section").height();
      var elemTopTop = $(".entry-title").offset().top;
      var elemBottomTop = elemTopTop + $(".entry-title").height();
      if (
        elemBottom <= $(window).scrollTop() + $(window).height() &&
        elemTop >= $(window).scrollTop() &&
        bar_hidden == 0
      ) {
        if (
          !(
            elemBottomTop <= $(window).scrollTop() + $(window).height() &&
            elemTopTop >= $(window).scrollTop() &&
            bar_hidden == 1
          )
        ) {
          bar_hidden = 1;
          $(".article-top-bar").stop().animate({ "margin-top": "0px" }, 300);
        }
      }
      if (
        elemBottomTop <= $(window).scrollTop() + $(window).height() &&
        elemTopTop >= $(window).scrollTop() &&
        bar_hidden == 1
      ) {
        bar_hidden = 0;
        $(".article-top-bar").stop().animate({ "margin-top": "-70px" }, 300);
      }
    });
  }
  //-----------------------//

  // Mobile menu
  $(".mobile-menu-button").click(function () {
    $(".mobile-overlay").fadeIn("fast");
    $(".mobile-search-button").animate({ opacity: 0 }, 70);
    $(".mobile-menu").animate({ marginLeft: "0px" }, 250);
    $("body").css({ overflow: "hidden" });

    $(".site-content").css("width", "100%");
    $(".site-content").animate({ marginLeft: "10px" }, 250);
  });
  $(".mobile-overlay").click(function () {
    $(".mobile-overlay").fadeOut("fast");
    $(".mobile-search-button").animate({ opacity: 1 }, "fast");
    $(".mobile-menu").animate({ marginLeft: "-80%" }, 250);
    $("body").css({ overflow: "visible" });

    $(".site-content").animate({ marginLeft: "0px" }, 250, function () {
      $(".site-content").css("width", "auto");
    });
  });

  $(".mobile-expand").click(function () {
    $(this).next().slideToggle();
    $(this).children().toggleClass("rotate-180");
    $(this).children().toggleClass("rotate-0");
  });

  $(".mobile-search-button").click(function () {
    $(".mobile-search-bar").fadeIn();
    $(".mobile-search-bar form input").focus();
  });
  $(".search-bar-close").click(function () {
    $(".mobile-search-bar").fadeOut();
  });

  //-----------------------//

  //Floating newsletter subscription box
  $(".float-newsletter-bar .subscribe-submit").click(function () {
    var date, expires;
    date = new Date();
    date.setTime(date.getTime() + 20 * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
    document.cookie = "newsletter=true" + expires + "; path=/";
    $(".float-newsletter-bar").animate({ bottom: "-100px" }, 500);
    $(".float-newsletter-bar").delay(1100).hide(0);
  });
  if (getCookie("newsletter") == "true") {
    $(".float-newsletter-bar").hide();
  } else {
    $(".float-newsletter-bar").delay(5500).animate({ bottom: "0px" }, 700);

    $(".float-newsletter-bar .close-newsletter").click(function () {
      var date, expires;
      date = new Date();
      date.setTime(date.getTime() + 20 * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
      document.cookie = "newsletter=true" + expires + "; path=/";
      $(".float-newsletter-bar").animate({ bottom: "-100px" }, 500);
      $(".float-newsletter-bar").delay(1100).hide(0);
    });
  }
  //-----------------------//

  //Fixed Mobile Banner - content-single.php

  if (getCookie("newsletter")) {
    $(".fixed-mobile-banner").show();
  }
  //-----------------------//

  //-----------------------//
  //Newsletter subscription
  //-----------------------//
  var captchaWidgetId = null;
  var newsletterData = "";
  // for bootstrapping page level code

  $(".newsletter-subscribe").focus(function () {
    $(this).parent().css("border-color", "#ddd");

    try {
      grecaptcha.reset();
      $("#grecaptcha-container").remove();
      $(".newsletter-response").removeClass("newsletter-response-active");
    } catch (e) {
      null;
    }

    $(this).after('<span id="grecaptcha-container"></span>');
    $(this)
      .siblings(".newsletter-response")
      .addClass("newsletter-response-active");

    captchaWidgetId = grecaptcha.render("grecaptcha-container", {
      sitekey: "6Lfl3ZcUAAAAAM_yMClhjbvqq-fea_E-Ti1OY5Fi", // required
      theme: "light", // optional
      callback: function () {
        $.post(
          directory_uri.stylesheet_directory_uri +
            "/template-parts/newsletter-subscribe-api.php",
          { user: newsletterData },
          function (data, status) {
            if (status == "success") {
              $(".newsletter-response-active")
                .siblings()
                .fadeOut(function () {
                  $(".newsletter-response-active")
                    .text("Thank you for subscribing.")
                    .fadeIn();

                  setTimeout(function () {
                    var date, expires;
                    date = new Date();
                    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
                    expires = "; expires=" + date.toGMTString();
                    document.cookie = "newsletter=true" + expires + "; path=/";
                    $(".float-newsletter-bar").animate(
                      { bottom: "-100px" },
                      500
                    );
                    $(".float-newsletter-bar").delay(1100).hide(0);
                  }, 1100);
                });
            } else {
              $(".newsletter-response-active")
                .siblings()
                .fadeOut(function () {
                  $(".newsletter-response-active")
                    .text("Subscription unsuccessful. Please try again.")
                    .fadeIn();
                });
            }
          }
        );
      }, // optional
      size: "invisible"
    });

    $(this)
      .siblings(".subscribe-class")
      .on("click", function (e) {
        e.preventDefault();

        newsletterData = $(this).siblings(".newsletter-subscribe").val();

        if (newsletterData != "") {
          $(this).parent().css("border-color", "#ddd");
          grecaptcha.execute();
        }
      });
  });
});

//Popup functions for newsletter and sharing buttons
function popup(content) {
  var winTop = screen.height / 2 - 250;
  var winLeft = screen.width / 2 - 250;
  window.open(
    content,
    "_blank",
    "width=500,height=500,top=" + winTop + ",left=" + winLeft
  );
}

function target_popup(form) {
  var winTop = screen.height / 2 - 250;
  var winLeft = screen.width / 2 - 250;
  window.open(
    "",
    "formpopup",
    "width=500,height=500,top=" + winTop + ",left=" + winLeft
  );
  form.target = "formpopup";
}
//-----------------------//

function target_popup(form) {
  var winTop = screen.height / 2 - 250;
  var winLeft = screen.width / 2 - 250;
  window.open(
    "",
    "formpopup",
    "width=500,height=500,top=" + winTop + ",left=" + winLeft
  );
  form.target = "formpopup";
}
//-----------------------//

//Function to get cookie value
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//-----------------------//

//})( jQuery, window, document );

//-----------------------//
