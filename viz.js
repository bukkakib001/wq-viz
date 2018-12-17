var master_search;
var master_json = [];

function val_check(val) {
	if(val <= 1 && val > 0) {
		return {v:val + 0.5, f:val.toString()};
	}
	else {
		return val;
	}
}

function add_commas(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function in_array(v, a) {
  return a.indexOf(v) > -1;
}

function is_int(n) {
	return (n % 1) === 0;
}

function troubleshoot_master(index) {

	index = parseInt(index);
	var json = master_json[index];
	var text = "";
	var running, capacity, complete, busy, ready, data;
    var waiting = val_check(json.tasks_waiting);
	if(json.tasks_running) { running = val_check(json.tasks_running); }
    else { running = val_check(json.total_worker_slots); }
    if(json.capacity_weighted) { capacity = val_check(json.capacity_weighted); }
    else { capacity = val_check(json.capacity); }
    if(json.tasks_done) { complete = val_check(json.tasks_done); }
    else { complete = val_check(json.tasks_complete); }
    if(json.workers_busy) { busy = val_check(json.workers_busy); }
    else if(json.workers_inuse) { busy = val_check(json.workers_inuse); }
    else { busy = val_check(json.workers_full); }
    if(json.workers_idle) { ready = val_check(json.workers_idle); }
    else { ready = val_check(json.workers_ready); }

	console.log(running);
	console.log(capacity);
	console.log(busy);
	console.log(ready);

	//Too few workers
	if(!busy && !ready) {
		text = text.concat("There are no workers available. Please start more workers.\n");
	}
	//Too many workers
	if(running < (busy + ready)) {
		text = text.concat("The number of currently running tasks is less than the total number of workers. You may want to have fewer workers.\n");
	}
	//Exceeding capacity
	if(running > capacity) {
		text = text.concat("There are too many tasks running. A more optimal number of tasks to run would be ").concat(capacity).concat(" \n");
	}
	//Below capacity
	if(running < (0.75 * capacity)) {
		text = text.concat("The application can handle more concurrency. Add more workers to run about ").concat(capacity).concat(" tasks concurrently.\n");
	}

	if(text == "") { text = "No common performance problems found."; }
	alert(text);

	return 0;
}

function deprecated_value_check(json) {
	var running, capacity, complete, busy, ready;

	if(json.tasks_running) { running = val_check(json.tasks_running); }
	else { running = val_check(json.total_worker_slots); }
	if(json.capacity_weighted) { capacity = val_check(json.capacity_weighted); }
	else if(json.capacity_cores) { capacity = val_check(json.capacity_cores); }
	else { capacity = val_check(json.capacity); }
	if(json.tasks_done) { complete = val_check(json.tasks_done); }
	else { complete = val_check(json.tasks_complete); }
	if(json.workers_busy) {	busy = val_check(json.workers_busy); }
	else { busy = val_check(json.workers_full); }
	if(json.workers_idle) {	ready = val_check(json.workers_idle); }
	else { ready = val_check(json.workers_ready); }

	return [running, capacity, complete, busy, ready];
}

function attribute_translate(attr) {
	var translated;
	switch(attr) {
		case "bytes_received":
			translated = "Bytes Received";
			break;
		case "bytes_sent":
			translated = "Bytes Sent";
			break;
		case "capacity_cores":
			translated = "Capacity Cores";
			break;
		case "capacity_disk":
			translated = "Capacity Disk";
			break;
		case "capacity_instantaneous":
			translated = "Capacity Instantaneous";
			break;
		case "capacity_memory":
			translated = "Capacity Memory";
			break;
		case "capacity_tasks":
			translated = "Capacity Tasks";
			break;
		case "capacity_weighted":
			translated = "Capacity Weighted";
			break;
		case "cores_inuse":
			translated = "Cores in Use";
			break;
		case "cores_largest":
			translated = "Cores Largest";
			break;
		case "cores_smallest":
			translated = "Cores Smallest";
			break;
		case "cores_total":
			translated = "Cores Total";
			break;
		case "disk_inuse":
			translated = "Disk in Use (MB)";
			break;
		case "disk_largest":
			translated = "Disk Largest";
			break;
		case "disk_smallest":
			translated = "Disk Smallest";
			break;
		case "disk_total":
			translated = "Disk Total";
			break;
		case "gpus_inuse":
			translated = "GPUs in Use";
			break;
		case "gpus_largest":
			translated = "GPUs Largest";
			break;
		case "gpus_smallest":
			translated = "GPUs Smallest";
			break;
		case "gpus_total":
			translated = "GPUs Total";
			break;
		case "memory_inuse":
			translated = "Memory in Use (MB)";
			break;
		case "memory_largest":
			translated = "Memory Largest";
			break;
		case "memory_smallest":
			translated = "Memory Smallest";
			break;
		case "memory_total":
			translated = "Memory Total";
			break;
		case "tasks_cancelled":
			translated = "Tasks Cancelled";
			break;
		case "tasks_complete":
			translated = "Tasks Complete";
			break;
		case "tasks_dispatched":
			translated = "Tasks Dispatched";
			break;
		case "tasks_done":
			translated = "Tasks Done";
			break;
		case "tasks_exhausted_attempts":
			translated = "Tasks Exhausted";
			break;
		case "tasks_failed":
			translated = "Tasks Failed";
			break;
		case "tasks_left":
			translated = "Tasks Left";
			break;
		case "tasks_on_workers":
			translated = "Tasks on Workers";
			break;
		case "tasks_running":
			translated = "Tasks Running";
			break;
		case "tasks_submitted":
			translated = "Tasks Submitted";
			break;
		case "tasks_total_cores":
			translated = "Tasks Total Cores";
			break;
		case "tasks_total_disk":
			translated = "Tasks Total Disk";
			break;
		case "tasks_total_memory":
			translated = "Tasks Total Memory";
			break;
		case "tasks_waiting":
			translated = "Tasks Waiting";
			break;
		case "tasks_with_results":
			translated = "Tasks with Results";
			break;
		case "time_application":
			translated = "Time Application";
			break;
		case "time_internal":
			translated = "Time Internal";
			break;
		case "time_polling":
			translated = "Time Polling";
			break;
		case "time_receive":
			translated = "Time Receive";
			break;
		case "time_receive_good":
			translated = "Time Receive Good";
			break;
		case "time_send":
			translated = "Time Send";
			break;
		case "time_send_good":
			translated = "Time Send Good";
			break;
		case "time_status_msgs":
			translated = "Time Statuses";
			break;
		case "time_workers_execute":
			translated = "Time Workers Execute";
			break;
		case "time_workers_execute_exhaustion":
			translated = "Time Workers Execute Exhausted";
			break;
		case "time_workers_execute_good":
			translated = "Time Workers Execute Good";
			break;
		case "workers":
			translated = "Workers";
			break;
		case "workers_able":
			translated = "Workers Ready";
			break;
		case "workers_busy":
			translated = "Workers Busy";
			break;
		case "workers_connected":
			translated = "Workers Connected";
			break;
		case "workers_fast_aborted":
			translated = "Workers Fast Aborted";
			break;
		case "workers_idle":
			translated = "Workers Idle";
			break;
		case "workers_idled_out":
			translated = "Workers Idled Out";
			break;
		case "workers_init":
			translated = "Workers Initializing";
			break;
		case "workers_inuse":
			translated = "Workers in Use";
			break;
		case "workers_joined":
			translated = "Workers Joined";
			break;
		case "workers_largest":
			translated = "Workers Largest";
			break;
		case "workers_lost":
			translated = "Workers Lost";
			break;
		case "workers_released":
			translated = "Workers Released";
			break;
		case "workers_removed":
			translated = "Workers Removed";
			break;
		case "workers_smallest":
			translated = "Workers Smallest";
			break;
		case "workers_total":
			translated = "Workers Total";
			break;
		default:
			translated = "Unrecognized Attribute";
			break;
	}
	return translated;
}

function search_button() {
	var search = master_search;
	var reset = document.getElementById("graph_container_table");
	while(reset.firstChild){
		reset.removeChild(reset.firstChild);
	}
	var text = search.input.value;
	var search_term = document.getElementById("search_term");
	if(text.localeCompare("*All Projects*") == 0) {
		search_term.value = "";
		document.getElementById("search_form").submit();
	}
	else {
		search_term.value = text;
		document.getElementById("search_form").submit();
	}
	return;
}

function add_attribute(search, json, column, attrs, limit) {
	var innertab = document.getElementById(column.id.concat("_innertab"));
	var text = search.input.value;
	if(attrs.includes(text)) {
		attrs.splice(attrs.indexOf(text), 1);
	}
	else if(attrs.length == limit) {
		alert("Maximum number of attributes added to graph. Please remove some and try again.");
		return 1;
	}
	else {
		attrs.push(text);
	}
	document.getElementById(column.id).removeChild(innertab);
	search.setText('');
	return attrs;
}

function create_data_array(json, attrs) {
	var flag = 0;
	var max = 0;
	var len = json.length;
	var data = [];
	var options = [];
	var forbidden = ["port", "lastheardfrom", "starttime", "priority", "time_when_started"];

	if(len == 1) {
		flag = 1;
	}

	for(var i = 1; i < len; i++) {
		var running, capacity, complete, busy, ready;
		var waiting = val_check(json[i].tasks_waiting);

		[running, capacity, complete, busy, ready] = deprecated_value_check(json[i]);

		if(prev_time = 0) { prev_time = json[i].lastheardfrom; }
		var time = json[i].lastheardfrom - prev_time;
		for(var attr in json[i]) {
			var tattr = attribute_translate(attr);
			if(attrs.includes(tattr)) {
				if(tattr == "Disk in Use (MB)" || tattr == "Memory in Use (MB)") {
					json[i][attr] = json[i][attr] / 1000;
				}
				data.push({"Value": json[i][attr], "Time": time, "Action": tattr, "Step": i});
			}
			if(!options.includes(tattr) && is_int(json[i][attr]) && !forbidden.includes(attr)) {

				if(json[i][attr] > max) { 
					max = json[i][attr];

				}
				options.push(tattr);
			}
		}
		prev_time = json[i].lastheardfrom;
	}
	return [max, data, options]
}

function create_canvas(graph_type, column) {
	var innertab = document.createElement("table");
	innertab.className = "tab";
	innertab.id = column.id.concat("_innertab");
	column.appendChild(innertab);
	var innertr1 = document.createElement("tr");
	var innertr2 = document.createElement("tr");
	var innertr3 = document.createElement("tr");
	innertr1.id = innertab.id.concat("_tr1");
	innertr2.id = innertab.id.concat("_tr2");
	innertr3.id = innertab.id.concat("_tr3");
	innertab.appendChild(innertr1);
	innertab.appendChild(innertr2);
	innertab.appendChild(innertr3);
	var innertooltip = document.createElement("td");
	innertooltip.className = "tooltip";
	innertooltip.id = innertr1.id.concat("_tooltip");
	innertooltip.style.color = "#FFFFFF";
	innertooltip.style.border = "1px solid";
	innertooltip.innerHTML = "blank";
	innertr1.appendChild(innertooltip);
	var innergraph = document.createElement("td");
	innergraph.className = "graph";
	innergraph.id = innertr2.id.concat("_tasks");
	innertr2.appendChild(innergraph);
	var innerdiv = document.createElement("div");
	innerdiv.id = innertr3.id.concat("_div");
	var innerbutton = document.createElement("input");
	innerbutton.id = innerdiv.id.concat("_button");
	innerbutton.type = "button";
	innerbutton.value = "Add Attribute";
	var innerp = document.createElement("p");
	innerp.id = innerdiv.id.concat("_p");
	innerp.style = "width: 300px; text-align: center;";
	innerp.innerHTML = "Add attributes to ".concat(graph_type).concat(":");
	var innersearch = document.createElement("td");
	innersearch.className = "search";
	innersearch.id = innertr3.id.concat("_search");
	innersearch.style = "border: solid; border-width: thin; width: 300px; text-align: center;"; 
	innertr3.appendChild(innerdiv);
	innerdiv.appendChild(innerp);
	innerdiv.appendChild(innersearch);
	innerdiv.appendChild(innerbutton);
	return innertab;
}

function on_mouse_hover(innertab, series, chart) {
	//Find innertooltip by childNodes index (a static location)
	var innertooltip = innertab.childNodes[0].childNodes[0];
	series.addEventHandler("mouseover", function (e) {
		var key = e.seriesValue[0];
		var val = e.selectedShape._groups[0][0].__data__.yValue;
		if(!(is_int(val))) {
			val = val.toFixed(2);
		}
		val = add_commas(val);
		var tooltip = key.toString().concat(": ", val);
		innertooltip.style.color = "#000000";
		innertooltip.innerHTML = tooltip;
		return;
	});
	series.addEventHandler("mouseout", function (e) {
		innertooltip.style.color = "#FFFFFF";
		innertooltip.innerHTML = "blank";
		return;
	});
}

function draw_table(json, row, index) {
	var i = 0;
	var r;
	var rows = ["Name:", "Project:", "Owner:", "Version:"];
	var data = [json.name, json.project, json.owner, json.version];
	for(var j = 0; j < data.length; j++) {
		if(data[j].length > 25) {
			data[j] = data[j].substring(0,21).concat("...");
		}
	}

	//Create table
	var td = document.createElement("td");
	td.className = "summary";
	var table = document.createElement("table");
	table.id = row.id.concat("_table");
	table.className = "summary";
	td.appendChild(table);
	row.appendChild(td);
	for(i = 0; rows[i]; i++) {
		r = document.createElement("tr");
		r.className = "summary";
		var c1 = document.createElement("td");
		var c2 = document.createElement("td");
		c1.innerHTML = rows[i];
		c1.className = "summary";
		c2.innerHTML = data[i];
		c2.className = "summary";
		r.appendChild(c1);
		r.appendChild(c2);
		table.appendChild(r);
	}
	
	//Create link to catalog server
	r = document.createElement("tr");
	var link = "http://catalog.cse.nd.edu:9097/detail/".concat(json.address).concat(':').concat(json.port).concat(":").concat(json.name);
	r.innerHTML = "<a href=\"".concat(link).concat("\">More Details</a>");
	table.appendChild(r);
	r = document.createElement("tr");
	var opt = JSON.stringify(json);
	r.innerHTML = "<button type=\"button\" onclick=\"troubleshoot_master(\'".concat(index).concat("\')\">Performance Tips</button>");
	table.appendChild(r);
	return 0;
}

function draw_histogram(json, column, attrs, preset) {
	var prev_time = 0;
	var max_attr = 13;

	if(preset == 1 && attrs.length == 0) {
		attrs.push("Time Application");
		attrs.push("Time Internal");
		attrs.push("Time Polling");
		attrs.push("Time Receive");
		attrs.push("Time Send");
		attrs.push("Time Statuses");
	}
	else if(preset == 2 && attrs.length == 0) {
		attrs.push("Tasks Complete");
		attrs.push("Tasks Running");
		attrs.push("Tasks Submitted");
		attrs.push("Capacity Weighted");
	}

	[max, data, options] = create_data_array(json, attrs);
	var innertab = create_canvas("histogram", column);

	//Find searchbox by childNodes index (a static location)
	var search = completely(document.getElementById(innertab.childNodes[2].childNodes[0].childNodes[1].id));
	//Find search button by childNodes index (a static location)
	innertab.childNodes[2].childNodes[0].childNodes[2].onclick = function () {
		attrs = add_attribute(search, json, column, attrs, max_attr);
		draw_histogram(json, column, attrs);
	}
	search.options = options.sort();
	search.setText(options[0]);
	search.onEnter = function() {
		attrs = add_attribute(search, json, column, attrs, max_attr);
		draw_histogram(json, column, attrs, preset);
	};

	//Create and populate SVG
	//Find svg container by childNodes index (a static location)
	var svg = dimple.newSvg("#".concat(innertab.childNodes[1].childNodes[0].id), 480, 250);
	var chart = new dimple.chart(svg, data);
	chart.setBounds(40, 20, 250, 200);
	var x = chart.addCategoryAxis("x", "Step");
	var y = chart.addMeasureAxis("y", "Value");
	var ymax = max.toString().length;
	y.overrideMin = 0;
	y.title = "";
	x.title = "";
	x.fontSize = "0px";
	var series = chart.addSeries("Action", dimple.plot.bar);
	on_mouse_hover(innertab, series, chart);
	chart.addLegend(460, 5, 50, 175);
	chart.draw();
	return 0;
}

function draw_bullet(svg, x, y, height, width, attr, max, data) {
	var bullet_data = [
 		{
 			"Metric":attr,
 			"Value":0,
 			"Low Value":0,
 			"High Value":max
 		}
 	];
 	var bullet = new dimple.chart(svg, bullet_data);
 	bullet.setBounds(x, y, height, width);
 	var bullet_x = bullet.addMeasureAxis("x", "Value");
 	var bullet_y = bullet.addCategoryAxis("y", attr);
 	var lo = bullet.addMeasureAxis(x, "Low Value");
 	var hi = bullet.addMeasureAxis(x, "High Value");
 	bullet.draw();
	//m.stacked = false;
	bullet_x.floatingBarWidth = 2;

 }

function draw_line(json, column, attrs) {
	var prev_time = 0;
	var max_attr = 5;

	if(attrs.length == 0) {	
		attrs.push("Cores in Use");
		attrs.push("Disk in Use (MB)");
		attrs.push("Memory in Use (MB)");
	}
	[max, data, options] = create_data_array(json, attrs);
	var innertab = create_canvas("area plot", column);

	//Find searchbox by childNodes index (a static location)
	var search = completely(document.getElementById(innertab.childNodes[2].childNodes[0].childNodes[1].id));
	//Find search button by childNodes index (a static location)
	innertab.childNodes[2].childNodes[0].childNodes[2].onclick = function () { 
		attrs = add_attribute(search, json, column, attrs, max_attr);
		draw_line(json, column, attrs);
	}
	search.options = options.sort();
	search.setText(options[0]);
	search.onEnter = function() {
		attrs = add_attribute(search, json, column, attrs, max_attr);
		draw_line(json, column, attrs);
	};

	/*
	var svg = dimple.newSvg("#".concat(innertab.childNodes[1].childNodes[0].id), 480, 250);
	for (var i = 0; i < attrs.length; i++) {
		draw_bullet(svg, 40, 20 + i*50 ,250, 25, attrs[i], max, data);
	}
	return 0;
	*/
	
	//Find svg container by childNodes index (a static location)
	var svg = dimple.newSvg("#".concat(innertab.childNodes[1].childNodes[0].id), 480, 250);
	var chart = new dimple.chart(svg, data);
	chart.setBounds(40, 20, 250, 200);
	//chart.addColorAxis("Value", ["green", "yellow", "red"]);
	var x = chart.addCategoryAxis("x", "Step");
	var y = chart.addMeasureAxis("y", "Value");
	var ymax = max.toString().length;
	y.overrideMin = 0;
	y.title = "";
	x.title = "";
	x.fontSize = "0px";
	var series_back = chart.addSeries("Action", dimple.plot.line);
	series_back.lineWeight = 2;
	series_back.lineMarkers = true;
	var series = chart.addSeries("Action", dimple.plot.bubble);
	series.lineWeight = 1;
	on_mouse_hover(innertab, series, chart);
	chart.addLegend(460, 5, 50, 175);
	chart.draw();
	return 0;
}

function draw(user, json, index) {
	var container = document.getElementById("graph_container_table");
	for(var i = 0; i < json.length; i++) {
		var row = document.createElement("tr");
		row.id = json[i][0].owner.concat("_row_").concat(i);
		row.className = "chart";
		container.appendChild(row);

		//Draw info table and viz for each entry
		var index = json[i].length - 1;
		draw_table(json[i][index], row, i);
		var td1 = document.createElement("td");
		td1.className = "graph";
		td1.id = row.id.concat("_1_histogram");
		row.appendChild(td1);
		var td2 = document.createElement("td");
		td2.className = "graph";
		td2.id = row.id.concat("_2_histogram");
		row.appendChild(td2);
		var td3 = document.createElement("td");
		td3.className = "graph";
		td3.id = row.id.concat("_3_area");
		row.appendChild(td3);
		draw_histogram(json[i], td1, [], 1);
		draw_histogram(json[i], td2, [], 2);
		draw_line(json[i], td3, []);
	}

	return 0;
}

function json_print() {
	var d1 = new Date();
	var s1 = d1.getTime();

	var project;
	var raw_json = document.getElementById("catalog").textContent;
	if(raw_json) {
		var json = JSON.parse(raw_json);
		var new_json = [ ];
		var i = 0;
		var curr = json[i];
		var owner = curr.owner;
		project = curr.project;
		var masters = 0;
		while(curr) {
			if(curr.type == "wq_master") {
				if(masters == 0) {
					new_json[masters] = [];
					new_json[masters].push(curr);
					masters++;
				}
				else {
					var flag = 0;
					for(var e in new_json) {
						if(curr.starttime == new_json[e][0].starttime && curr.name == new_json[e][0].name && curr.port == new_json[e][0].port) {
							new_json[e].push(curr);
							flag = 1;
							master_json.push(curr);
							break;
						}
					}
					if(flag == 0) {
						new_json[masters] = [];
						new_json[masters].push(curr);
						masters++;
					}
				}
			}
			i++;
			curr = json[i];
		}
		json = new_json;
		draw(owner, json);
	}

	i = 0;
	var users = [];
	var userlist = document.getElementById("userlist").textContent;
	var user_json = JSON.parse(userlist);
	var user = user_json[i];
	while(user) {
		users.push(user.name);
		i++;
		user = user_json[i];
	}
	users.push("*All Projects*");

	var search = completely(document.getElementById("search_box"));
	master_search = search;
	search.options = users.sort();
	var flag = document.getElementById("flag");
	flag = Number(flag.innerHTML);
	if(project && flag) { search.setText(project); }
	else { search.setText("*All Projects*"); }
	search.onEnter = function() {
			var reset = document.getElementById("graph_container_table");
			while(reset.firstChild){
    			reset.removeChild(reset.firstChild);
			}
			var text = search.input.value;
			var search_term = document.getElementById("search_term");
			if(text.localeCompare("*All Projects*") == 0) {
				search_term.value = "";
				document.getElementById("search_form").submit();
			}
			else {
				search_term.value = text;
				document.getElementById("search_form").submit();
			}
	};

	var d2 = new Date();
	var s2 = d2.getTime();
	var elapsed_time = s2 - s1;
	console.log("Elapsed Render Time: ".concat(elapsed_time.toString()));

	return 0;
}

/* vim: set noexpandtab shiftwidth=4 tabstop=4: autoindent */
