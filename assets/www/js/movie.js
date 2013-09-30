var movieArray = [];
var str = "";
var resultList = [];

$('#page-home')
		.live(
				'pageshow',
				function(event) {

					$("body").delegate(".movieList", "click", function() {

						var movieIndex = "#details" + $(this).attr("movieId");
						console.log(movieIndex);
						$(".trailerclass").html("");
						trailer($(this).attr("movieId"), movieIndex);
					});
					
					$("#recent").click(function(){
						alert("For this app to work, please ensure that an active data connection or Wifi is available.");
					});

					$("#about").click(function(){
						var devStr = "Hello, \n\n This application is developed by: \n ";
						devStr += "- Abhilash Gidla - S.R.K.R Engineering college\n";
						devStr += "- Jyothi Swaroop Meka - S.R.K.R Engineering college \n";
						devStr += "- Kalyan Thirupathi - Freelancer\n";
						devStr += "- Mohan Ponnada - Mentor\n";
						alert(devStr);
					});

					$("#info").click(function(){
						var devStr = "This application is free to download and use, \n\n This application is developed under the CC 3.0 License: \n ";
						devStr += "The application makes use of:\n";
						devStr += "- v3 of api.themoviedb.org \n";
						devStr += "- Free ICON from iconfinder.com \n";
						devStr += "- All copyrights are property of their respective owners. \n";
						alert(devStr);
					});

					

					// $(document).ready(function(){
					$("#intro")
							.click(
									function() {
										var htmlString = "<div id='movieYour'>your movie details will display here</div>";
										$("#movie").html(htmlString);

										$("#enterMovie").val('');
									});

					$("#search").click(function() {
						var text = $("#enterMovie").val();
						if (text == 0) {

							alert("Please enter a movie name");
						} else

						{
							// search();
							searchMovie(text);

						}

					});

					$("#enterMovie").click(function() {
						$("#enterMovie").val('');
					});

				});

function trailer(trailerId, movieIndex) {

	var trailerUrl = "http://api.themoviedb.org/3/movie/" + trailerId
			+ "/trailers?api_key=api_key=YOUR_API_KEY_HERE";
	$
			.ajax({
				url : trailerUrl,
				dataType : "jsonp"
			})
			.done(
					function(result) {
						console.log(result);
						if (result.youtube.length != 0) {
							var trailerVideoURL = result.youtube[0].source;
							var YouTubeVideo = "<div class='trailerclass'>Trailer: <br/><iframe width='250' height='200' src='http://www.youtube.com/embed/"
									+ trailerVideoURL + "'></iframe></div>";
							$(movieIndex).append(YouTubeVideo);
						} else {
							$(movieIndex)
									.append(
											"<div class='trailerclass'>Sorry, no Trailer found..<br/></div>");
						}
						$(movieIndex).show();

					}).fail(function() {
				console.log("Error occured");
				alert("Sorry, unable to find Trailer");
				$("#movie").html("Internal Error occured. Please try again.");

			});
}

function searchMovie(movieName) {

	var str = "";

	$("#movie").html("getting movie  details, please standby...");

	var apiUrl = "http://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY_HERE&query="
			+ movieName;

	console.log(apiUrl);

	$
			.ajax({
				url : apiUrl,
				dataType : "jsonp"
			})
			.done(
					function(result) {

						if (result.results.length > 0) {
							console.log(result);
							var resultList = [];
							var resultList = result.results;

							for ( var j = 0; j < resultList.length; j++) {

								if (resultList[j] !== null) {
									str = str + "<div class='movieList'";
									str = str + "movieId='" + resultList[j].id
											+ "'><div class='titleclass'>"
											+ resultList[j].original_title
											+ "</div>";
									str = str
											+ "<div class='details' id='details"
											+ resultList[j].id + "'>";
									if (resultList[j].poster_path === null) {
										str = str + "Sorry, Poster not found..";
									} else {
										str = str
												+ "<img src='http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185"
												+ resultList[j].poster_path
												+ "'/></div></div>";
									}
								}

								else {
									continue;
								}
							}

						} else {
							str = "Sorry, no movies in our database with that name, please try again..";
						}

						$("#movie").html(str);

					}).fail(function() {
				console.log("Error occured");
				alert("Sorry, unable to reach webService");
				$("#movie").html("Internal Error occured. Please try again.");

			});
}