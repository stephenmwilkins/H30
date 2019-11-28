function timeline_begin() {
    for (i = 0; i<600; i++) {
      t = i*10;
      document.getElementById("timeline_frame").innerHTML += '<div class="mline" style="top:'+t+'px">';
    }
    for (i = 0; i<50; i++) {
      t = i*120;
      ty = t - 15;
      year = 1975 + i;
      document.getElementById("timeline_frame").innerHTML += '<div class="yline" style="top:'+t+'px">';
      document.getElementById("timeline_frame").innerHTML += '<div class="year_label" style="top:'+ty+'px">'+year+'<div>';
    }

  }

  function timeline_loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        timeline_xmlDoc = this.responseXML;
        timeline_add_milestones();
        timeline_show_milestone(1); 
      }
    };
    xmlhttp.open("GET", "xml/milestones.xml", true);
    xmlhttp.send();
  }

  function timeline_add_milestones() {

    x = timeline_xmlDoc.getElementsByTagName("ddate");

    for (i = 0; i< x.length; i++) {
      date = x[i].childNodes[0].nodeValue;
      t = (date-1975)*120;
      document.getElementById("timeline_frame").innerHTML += '<div class="milestone" style="top:'+t+'px">';
      ty = (date-1975)*120 - 25;
      title = timeline_xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue;
      document.getElementById("timeline_frame").innerHTML += '<div class="milestone_label" style="top:'+ty+'px"><a onclick="timeline_show_milestone('+i+')">'+title+'</a><div>';
    }

  }


  function timeline_show_milestone(i) {
    $('#date').text(timeline_xmlDoc.getElementsByTagName('date')[i].childNodes[0].nodeValue);
    $('#title').text(timeline_xmlDoc.getElementsByTagName('title')[i].childNodes[0].nodeValue);
    description = timeline_xmlDoc.getElementsByTagName('description')[i].childNodes[0].nodeValue;
    description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
    $('#description').html(description);
    $('#milestone_image').attr('src', 'imgs/timeline/'+timeline_xmlDoc.getElementsByTagName('image')[i].childNodes[0].nodeValue);
  }
