﻿function qisset() {
  var field = "q";
  var url = window.location.href;
  if (url.indexOf("?" + field + "=") != -1) return true;
  else if (url.indexOf("&" + field + "=") != -1) return true;
  return false;
}

if (qisset()) {
  addclassupsearch("s129", "upsearch");
  document.body.classList.add("body_bck");
  document.getElementById("meeting").classList.add("hidden");

  var qs = new URLSearchParams(window.location.search);
  var textsearch = qs.get("q");

  search();
  getRandom();
  document.getElementById("search").value = textsearch;

} else {
  var serverurl;
  if (window.location.hostname === "localhost") {
    serverurl = "https://api.peviitor.ro";
  } else {
    serverurl = "https://api.peviitor.ro";
  }

  total(serverurl + "/v3/search/?q=*%3A*&rows=0");
  getRandom();
}

function addclassupsearch(id, classs) {
  document.getElementById(id).classList.add(classs);
}

function total(xurl) {
  fetch(xurl)
    .then(function (response) {
      response.text().then(function (text) {
        var ser_message = JSON.parse(text);
        var total = ser_message.response.numFound;
        if (total === 0) {
          rezno = "Nu avem nici o oportunitate momentan";
        } else {
          rezno = "Avem " + total + " oportunități";
        }
        document.getElementById("resultsno").innerHTML = rezno;
      });
    })
    .catch((err) => console.log(err));
}

function showcities() {
  var yurl =
    "https://peviitor.ro/search/?facet.field=city&facet=on&q=*%3A*&rows=0";
  var list_of_cities = [];
  var i = 1;
  var k = 0;

  var html_text = "<label> Oras: </label>";
  html_text += "<select id='city'>";

  fetch(yurl)
    .then(function (response) {
      response.text().then(function (text) {
        var ser_message = JSON.parse(text);
        var cities = ser_message.facet_counts.facet_fields.city;

        //	   if (  total === 0 ) {rezno = "Nu avem nici o oportunitate pe moment";} else {  rezno = "Avem "+ total + " oportunități"; }
        //		document.getElementById("resultsno").innerHTML = rezno ;

        while (++i < cities.length) {
          if (i % 2 === 0) {
            list_of_cities[k] = cities[i];
            html_text +=
              "<option value='" +
              list_of_cities[k] +
              "'>" +
              list_of_cities[k] +
              "</option>";

            k++;
          }
        }

        html_text += "</select>";
        document.getElementById("cities").innerHTML = html_text;
      });
    })
    .catch((err) => console.log(err));
}

function page(number) {
  var urltext = window.location.href;
  var url = new URL(urltext);
  url.searchParams.set("start", (number - 1) * 10 ) ;
  document.getElementById("page_" + number).href = url.href;
}

function current_page() {
  var qs = new URLSearchParams(window.location.search);
  var current = qs.get("start")/10+1;
  document.getElementById("page_" + current ).setAttribute("class", "highlighted");
}

function showPages(max) {
  var qs = new URLSearchParams(window.location.search);
  var start = qs.get("start");
  var pagemax;
  start = Math.round(start / 10) + 1; 
  if (start == 1) {
    start = 2;
  }
  pagemax = start + 2;
  if (pagemax > max) {
    pagemax = max + 1;
  }
  var xpages = "";
  for (i = start - 1; i < pagemax; i++) {
    xpages += "<span ><a href='' id='page_" + i + "'>[ " + i + " ]</a></span>";
  }
  if (start < max-1)  {
    xpages += "<span>...</span>" + "<span ><a href='' id='page_" + max + "'>[ " + max + " ]</a></span>";
    
    
  }
  document.getElementById("pages").innerHTML = xpages;

  for (i = start - 1; i < pagemax; i++) {
    page(i);
  }

  // in main you have number of pages in the global variable pages
  // the function page is adding the HREF for the a markup for each page with id page_{id}
  // to add the HREF for the last page we call the function page with parameter pages
    page(pages);
  
    current_page()
}





