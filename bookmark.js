//var bmjson = null;
//const product = urlParams.get('product');

var assignVarBM = function(data) {
	bm = data;
}

var sortbm = function(data, method) {
	if (method == "asc") {
		console.log("0");
		Object.keys(data).sort(function(a, b) {
			return a.title -
				b.title;
		});
	} else if (method == "dec") {
		console.log("1");
		Object.keys(data).sort(function(a, b) {
			return b.title -
				a.title;

		});
	};
	console.log(data);
	return data;
};

function show_bm_area(data) {
	$('#bmarea').append(data);
};

function build_bm_area() {
	data = sortbm(bm, "dec");
	var htmlparse = ""
	for (let i = 0; i < Object.keys(
			data).length; i++) {
		htmlparse = htmlparse +
			`<div onclick="location.href='` +
			data[i].url +
			`'" class="col"><div class="card p-3 mb-2"><div class="d-flex justify-content-between"><div class="d-flex flex-row align-items-center"><div class="icon"><img src="` +
			data[i].favico +
			' style="max-width: 30px"></div><div class="ms-2 c-details"><h3 class="mb-0">' +
			data[i].title +
			'</h3></div></div></div><div class="mt-2"><p>' +
			data[i].desc +
			'</p><div class="tag">';
		for (let j = 0; j < Object.keys(
				data[i]).length; j++) {
			htmlparse = htmlparse +
				'<a href="' + data[i]
				.url +
				'"><span class="badge bg-secondary">' +
				data[i].tags[j] +
				'</span></a>';
		};
		htmlparse = htmlparse +
			'</div></div></div></div></a>';
	};
	show_bm_area(htmlparse);
};

function build_bm_area() {
	data = sortbm(bm, "dec");
	var htmlparse = ""
	for (let i = 0; i < Object.keys(
			data).length; i++) {
		htmlparse = htmlparse +
			`<div onclick="location.href='` +
			data[i].url +
			`'" class="col"><div class="card p-3 mb-2"><div class="d-flex justify-content-between"><div class="d-flex flex-row align-items-center"><div class="icon"><img src="` +
			data[i].favico +
			' style="max-width: 30px"></div><div class="ms-2 c-details"><h3 class="mb-0">' +
			data[i].title +
			'</h3></div></div></div><div class="mt-2"><p>' +
			data[i].desc +
			'</p><div class="tag">';
		for (let j = 0; j < Object.keys(
				data[i]).length; j++) {
			htmlparse = htmlparse +
				'<a href="' + data[i]
				.url +
				'"><span class="badge bg-secondary">' +
				data[i].tags[j] +
				'</span></a>';
		};
		htmlparse = htmlparse +
			'</div></div></div></div></a>';
	};
	show_bm_area(htmlparse);
};

function get_json() {
	$.ajax({
		url: '/link.json',
		async: false,
		dataType: 'json',
		success: function(
			json) {
			assignVarBM(
				json);
		}
	});
};

function init_site() {
	get_json();
	$.when(get_json()).done(function() {
		pbm = JSON.parse(JSON
			.stringify(bm));
		build_bm_area(pbm);
	});
};

function filter_by_tag(){

};


var sba = "http://localhost:1313";
var bm;
$(document).ready(function() {
	init_site();
});
