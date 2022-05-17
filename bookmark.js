//var bmjson = null;
//const product = urlParams.get('product');

//var getJSON = function(url, callback) {
//    var xhr = new XMLHttpRequest();
//    xhr.open('GET', url, true);
//    xhr.responseType = 'json';
//    xhr.onload = function() {
//      var status = xhr.status;
//      if (status === 200) {
  //      callback(null, xhr.response);
  //    } else {
    //    callback(status, xhr.response);
  //    }
//    };
//    xhr.send();
//};

var getbm = function(){
  $.getJSON("/link.json", function(data) {
//  function(err, data) {
    if (err !== null) {
      console.error(err);
    } else {
      return JSON.parse(data);
      console.log(data);
    }
  }).fail(function(jqxhr){
      alert(jqxhr.responseText);
    })
};




var sortbm = function(data,method){
  if (method==0){
    data.sort(function (a, b) {
      return a.title - b.title;
    });
  }else if(method==1){
    data.sort(function (a, b) {
      return b.title - a.title;
    });
  };
};

var showbm = function(data){
    var bm_html=""

    for (let i = 0; i < data.length; i++) {
      bm_html += `<a href="${data[i].url}"><div class="col"><div class="card p-3 mb-2"><div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                  <div class="icon"><img src="${data[i].favico}" style="max-width: 30px">
              </div><div class="ms-2 c-details"><h3 class="mb-0">${data[i].title}</h3>
              </div></div></div><div class="mt-2"><p>${data[i].desc}</p>
              <div class="tag">`
      for (let j = 0; j < data[i].tags.length; j++) {
        bm_html += `<a href="${data[i].url}"><span class="badge bg-secondary">${data[i].tags[j]}</span></a>`
      }
      bm_html += `</div></div></div></div></a>`
    }
    document.getElementById("bm_area").innerHTML += bm_html
  };

var init_site = function(){

};
var bm = getbm()
sbm = sortbm(bm,0)
showbm(bm)
