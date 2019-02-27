window.onload=function() {
    const mobile_menu = document.getElementById("mobile_menu");
    document.getElementById("dropbtn").addEventListener('click', function(e) {
      if (mobile_menu.style.display == "block") {
        mobile_menu.style.display = "none";
      } else {
        mobile_menu.style.display = "block";
      }
    });
}