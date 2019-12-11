

current_section = "home";

// var device = 'ipad';
var device = 'console';

function change_section(section) {

  $("#"+current_section).hide();
  $("#"+section).show();
  $("#"+current_section+"_nav").css("opacity", 0.3);
  $("#"+section+"_nav").css("opacity", 1.0);

  current_section = section;
  //
  // if (section==='gallery') {
  //   $("#gallery_top_nav_bar").show();
  // }


}
