window.onload=function() {
    const window_width = document.documentElement.clientWidth;
    const window_height = document.documentElement.clientHeight;
    const image = document.getElementById("header_logo");
    console.log(window_width);
    if (window_width < 479) {
        image.src = "http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_mobile.png"
    } else if (window_width < 767) {
        image.src = "http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_mid.png"
    } else {
        image.src = "http://rocomenty.com/wp-content/uploads/2019/02/algo_logo_large.png"
    }
}