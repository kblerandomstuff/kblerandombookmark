function srt_asc_wp(prop) {
		return function(a, b) {
				if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
						return 1;
				} else if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
						return -1;
				}
				return 0;
		}
}

function srt_dec_wp(prop) {
		return function(a, b) {
				if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
						return 1;
				} else if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
						return -1;
				}
				return 0;
		}
}

function srt_asc() {
		return function(a, b) {
				if (a.toLowerCase() > b.toLowerCase()) {
						return 1;
				} else if (a.toLowerCase() < b.toLowerCase()) {
						return -1;
				}
				return 0;
		}
}

function srt_dec() {
		return function(a, b) {
				if (a.toLowerCase() < b.toLowerCase()) {
						return 1;
				} else if (a.toLowerCase() > b.toLowerCase()) {
						return -1;
				}
				return 0;
		}
}

function show_container(head,body){
	$('#contentarea').empty().append(body);

}

function sortbm(data, method) {
	if (method == "asc") {
		data.sort(srt_asc_wp("title"))
	} else if (method == "dec") {
		data.sort(srt_dec_wp("title"))
	};
	return data;
};

function srt_wm(data, method) {
	if (method == "asc") {
		data.sort(srt_asc("title"))
	} else if (method == "dec") {
		data.sort(srt_dec("title"))
	};
	return data;
};


function build_bm_area(datafp) {
	data = sortbm(datafp, "dec");
	var htmlparse = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">'
	for (let i = 0; i < Object.keys(data).length; i++) {
		htmlparse = htmlparse +
			`<div  class="col" ><div class="card p-3 mb-2  link_card" onclick="location.href='` +
			data[i].url +
			`'"><div class="d-flex justify-content-between"><div class="d-flex flex-row align-items-center"><div class="icon"><img src="` +
			data[i].favico +
			'"style="max-width: 30px"></div><div class="ms-2 c-details"><h3 class="mb-0">' +
			data[i].title +
			'</h3></div></div></div><div class="mt-2"><p>' +
			data[i].desc +
			'</p></div><div class="tag">';
		for (let j = 0; j < Object.keys(data[i]).length; j++) {
			htmlparse = htmlparse +
				'<a ><span class="badge bg-secondary" onclick="filter_by_tag($(this).text());event.stopPropagation();">' +data[i].tags[j] +
				'</span></a>';
		};
		htmlparse = htmlparse +
			'</div></div></div>';
	};
	htmlparse = htmlparse+
	show_container("",htmlparse);
};



function get_json() {
	$.ajax({
		url: 'link.json',
		async: false,
		dataType: 'json',
		success: function(json) {
			bm=json
		}
	});
};

function init_site() {
	get_json();
	$.when(get_json()).done(function() {
		pbm = JSON.parse(JSON.stringify(bm));
	});
};

function filter_by_tag(tag){
	fills=[]
	$.each(pbm,function( key, value ) {
    if (value["tags"].includes(tag)){
      fills.push(value)
    }
	})
	build_bm_area(fills);
};

function get_tags(){
	var tagls=[]
	$.each(pbm,function( key, value ) {
		$.each(value["tags"],function( key, value ) {
	    if (tagls.includes(value)){
	    } else {
				tagls.push(value)
			}
		})
	})
	tagls=srt_wm(tagls,"asc")
	console.log(tagls)
	return tagls
}

function build_tag_page(){
	var data=get_tags()
	var htmlparse = ""
	htmlparse=htmlparse+"<h2>All tags</h2><hr>"
	for (let i = 0; i < Object.keys(data).length; i++) {
		htmlparse=htmlparse+'<button type="button" class="btn btn-primary" onclick="filter_by_tag($(this).text());">'+data[i]+'</button>';
	}
	show_container("",htmlparse);
}

var sba = "http://localhost:1313";
var bm,pbm;

$(document).ready(function() {
	init_site();
	if (window.location.search==null){
		build_bm_area(pbm);
	}else{
		build_bm_area(pbm);
	}
});
