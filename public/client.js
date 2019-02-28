window.onload=function() {
    const window_width = document.documentElement.clientWidth;
    const window_height = document.documentElement.clientHeight;
    const mobile_menu = document.getElementById("mobile_menu");
    const image = document.getElementById("header_logo");
    console.log(window_width);
    if (window_width < 479) {
        image.src = "http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_mobile.png"
    } else if (window_width < 767) {
        image.src = "http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_mid.png"
    } else {
        image.src = "http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_large.png"
    }
    document.getElementById("dropbtn").addEventListener('click', function(e) {
      if (mobile_menu.style.display == "block") {
        mobile_menu.style.display = "none";
      } else {
        mobile_menu.style.display = "block";
      }
    });
}