// image_window = window.open("", "image_window", "width=200, height=100");

var previ = 0;
var current_category = '';

function gallery_loadXMLDoc() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      xmlDoc = this.responseXML;
      gallery_make_nav_bar();
      // gallery_refresh(0);
    }
  };
  xmlhttp.open("GET", "xml/gallery.xml", true);
  xmlhttp.send();
}

function gallery_make_nav_bar() {

  x = xmlDoc.getElementsByTagName("filename");

  var categories = ['galaxies','nebulae', 'stars'];
  var category;

  id_dict = {};

  for (category of categories) {
    txt = "";

    id_dict[category] = 'false';

    for (i = 0; i< x.length; i++) {
      c = xmlDoc.getElementsByTagName('image')[i].getAttribute('category');
      if (c==category) {
        img = x[i].childNodes[0].nodeValue;
        txt += '<img id = "'+i+'" class="thumb" src="imgs/gallery/thumbg/'+img+'" onclick="gallery_refresh('+ i + ')">';

        if (id_dict[category]=='false') {
          id_dict[category] = i;
          console.log(category, i)
        }
      }
    }
    document.getElementById(category+"_nav").innerHTML = txt;

  }

  // image_window = window.open('', 'test', 'height=1000,width=1000');

  // gallery_change_nav('stars');


}


function gallery_refresh(i) {



  $('#'+previ).attr('src', 'imgs/gallery/thumbg/'+xmlDoc.getElementsByTagName('filename')[previ].childNodes[0].nodeValue);

  filename = xmlDoc.getElementsByTagName('filename')[i].childNodes[0].nodeValue
  $('#main_image').attr('src', 'imgs/gallery/preview/'+filename);
  $('#'+i).attr('src', 'imgs/gallery/thumb/'+filename);

  $('#gallery_title').text(xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue);

  $('#gallery_short_description').html(xmlDoc.getElementsByTagName('short')[i].childNodes[0].nodeValue);

  description = xmlDoc.getElementsByTagName('description')[i].childNodes[0].nodeValue;
  description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');

  $('#gallery_description').html(description);

  $("#gallery_description").hide();
  $("#visible").hide();
  $("#hidden").show();

  // image_window.document.open()
  // image_window.document.write('<img src="imgs/full/'+filename+'" width=100%>');
  // image_window.document.close()

  previ = i;

}

function gallery_change_nav(category) {

  // $("#"+current_category+"_nav").hide();
  $("#"+current_category+"_nav").fadeOut(1000);
  $("#"+current_category+"_topnav").css("opacity", 0.3);

  // $("#"+category+"_nav").show("slide", { direction: "left" }, 1000);
  $("#"+category+"_nav").fadeIn(1000);

  // $("#"+id+"_nav").show();
  $("#"+category+"_topnav").css("opacity", 1.0);
  gallery_refresh(id_dict[category]);

  current_category = category;

}


function toggle_long_description() {

  $("#gallery_description").toggle();
  $("#visible").toggle();
  $("#hidden").toggle();

  // var x = document.getElementById("show_hide");
  //
  // if (x.innerHTML === "show") {
  //       x.innerHTML = "hide";
  //   } else {
  //       x.innerHTML = "show";
  //   };

  // $('img','#test').toggle();

}
