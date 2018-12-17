<?php require("../../../../header.php"); ?>

<style>
	.item{
		order: 1;
		flex-grow:1;
		height:200px;
	}
	.item2{
		order:1;
		flex-grow:2;
	}
	.results-holder{
		display:flex;
		display:column;
		flex-wrap:wrap;
	}
	.results{
		order:1;
		height:200px;
		width:100%;
	 	display:flex;
		flex-direction:row;
		flex-wrap:wrap;
		justify-content: flex-center;
		align-items: center;
		align-content:stretch;
	}

	.chart tr {
		padding: 8px;
	}

	.graph table {
		border: none;
	}	

	.summary td, th {
		border: 1px solid;
    	text-align: left;
    	padding: 1px;
	}

	.graph td, th {
    	border: none;
    	text-align: left;
    	padding: 4px;
	}

	.chart rect {
		fill: steelblue;
	}
	.chart text {
		fill: black;
		font: 10px sans-serif;
		text-anchor: end;
	}

	.tab table {
		border: none;
	}

</style>

<h2>Work Queue Status</h2>

<!--<meta http-equiv="refresh" content="60; URL=http://ccl.cse.nd.edu/software/workqueue/status">-->
<script src="https://lorenzoongithub.github.io/completely/complete.ly.1.0.1.min.js"></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="dimple.v2.3.0.js"></script>
<script type="text/javascript" src="viz.js"></script>

<div id="catalog" style="display: none;">
<?php
	$json = "";
	if($_GET["search"]) {
		$file = $_GET["search"] . ".json";
		$json = file_get_contents($file);
		echo htmlspecialchars("[\n");
		echo htmlspecialchars($json);
		echo htmlspecialchars("{\"type\": \"end\"}\n]");
	}
	else {
		$files = glob($dir . "*.json");
		$i = 0;
		$j = sizeof($files);
		if($j > 5) { $j = 5; }
		echo htmlspecialchars("[\n");
		while($i < $j) {
			$file = $files[$i];
			$json = file_get_contents($file);
			echo htmlspecialchars($json);
			$i++;
		}
		echo htmlspecialchars("{\"type\": \"end\"}\n]");
	}
?>

<form id="search_form" action="index.php">
<input id="search_term" type="text" name="search"></input>
<input type="submit" action="Submit"></input>
</form>
</div>

<div id="userlist" style="display: none;">
<?php
	$json = file_get_contents("userlist.dat");
	echo htmlspecialchars($json);
?>
</div>
<div id="flag" style="display: none;">
<?php
	if($_GET["search"]) {
		echo htmlspecialchars("1");
	}
	else {
		echo htmlspecialchars("0");
	}
?>
</div>

<h4>Search:</h4>
Search box autocompletes with tab.
<div>
Press enter to complete your search.
<div id="search_box" width="256" style="border: solid; border-width: thin; width: 256px;">
</div>
<button type="button" onclick="search_button()">Search</button>
</div>

<div id="graph_container">
<table id="graph_container_table">
</table>
</div>
<script type="text/javascript">
json_print();
</script>

<?php require("../../../footer.php"); ?>

<!-- vim: set noexpandtab tabstop=4: ->
