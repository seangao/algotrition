window.onload=function() {
    const mobile_menu_button = document.getElementById('dropbtn');
    mobile_menu_button.addEventListener('click', function(e) {
      document.getElementById("mobile_menu").style.display = "block";
    });
}