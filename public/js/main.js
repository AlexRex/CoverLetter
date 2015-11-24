	
  	//var thisUrl = 'https://protected-crag-6460.herokuapp.com/';
  	var thisUrl = "http://192.168.1.145:2000/";
    //var thisUrl = "http://172.16.80.185:2000/";


	var socket = io.connect(thisUrl);
  	
  	var thisId = ( Math.random() * 100 ) | 0;
  	socket.on('connect', function(){
      document.getElementById('alert-top').style.transform = "translateY(0px)";

  		//console.log(thisId);
  		socket.emit('sendId', thisId);
  		document.getElementById('qrCode').src = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl='+thisUrl+'controller?id='+thisId;
  		document.getElementById('linkCode').innerHTML += 'Or go to the controller page with your mobile <strong style="font-size:22px;">'+thisUrl+'controller</strong> and use this id: <strong style="font-size:22px;">'+thisId+'</strong>';

  	});
  	
	  socket.on('getAccel', function (data) {
  	  //console.log(data);
  	  if($('#qrModal').hasClass('in')){
  			$('#qrModal').modal('hide');
  	  }

      //console.log(data);
	  	var info = {
	  		x: Math.round(data.alpha),
	  		y: Math.round(data.beta),
	  		z: Math.round(data.gamma)
	  	};
	  	//console.log(info);

	  	window.scrollBy(0,info.y/5);
	  });


    var introColors = ['#2980b9', '#e67e22'];
    var aboutColors = ['#34495e', '#c0392b'];
    var lastProjectsColors = ['#8e44ad', '#16a085'];
    var todayColors = ['#27ae60', '#f1c40f'];
    var tomorrowColors = ['#D81B1C', '#2980b9'];

    var actualColor = 0;
    socket.on('shaked', function(){
      console.log(introColors[actualColor]);
      document.getElementById('introduction').style.background = introColors[actualColor];
      document.getElementById('about-me').style.background = aboutColors[actualColor];
      document.getElementById('last-projects').style.background = lastProjectsColors[actualColor];
      document.getElementById('today').style.background = todayColors[actualColor];
      document.getElementById('tomorrow').style.background = tomorrowColors[actualColor];
      actualColor++;

      if(actualColor==introColors.length)
        actualColor=0;
    });




//https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=http://192.168.1.145:2000?id=

/* *************************************
 *            Bootstrap Style          *
 * *********************************** */

 //$('#qrModal').modal('show');



 /* *************************************
  *                Maps                 *
  * *********************************** */



function initMap() {
	var styles = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
	var mapUA;
	var myLatlngUA = new google.maps.LatLng(38.382565, -0.513981);
  var myLatlngCenter = new google.maps.LatLng(48.2782761, 3.4638107);

	mapUA = new google.maps.Map(document.getElementById('UAMap'), {
		center: myLatlngCenter,
		zoom: 4
  	});

	mapUA.setOptions({styles: styles});

  

  var mapSligo;
  var myLatlngSligo = new google.maps.LatLng(54.2782761, -8.4638107);

  mapSligo = new google.maps.Map(document.getElementById('SligoMap'), {
    center: myLatlngCenter,
    zoom: 4
    });

  mapSligo.setOptions({styles: styles});


	var markerUA = new google.maps.Marker({
	  position: myLatlngUA,
	  title:"University of Alicante, Spain."
	});

	// To add the marker to the map, call setMap();
	markerUA.setMap(mapUA);

  var markerSligo = new google.maps.Marker({
    position: myLatlngSligo,
    title:"Institute of Technology, Sligo."
  });

  // To add the marker to the map, call setMap();
  markerSligo.setMap(mapSligo);

}

$('#UAMapWrapper, #SligoMapWrapper').click(function () {
    $('#UAMap, #SligoMap').css("pointer-events", "auto");
});

$( "#UAMapWrapper, #SligoMapWrapper" ).mouseleave(function() {
  $('#UAMap, #SligoMap').css("pointer-events", "none"); 
});
     

/* *************************************
 *               Github                *
 * *********************************** */


jQuery.githubUser = function(username, callback) {
   jQuery.getJSON('https://api.github.com/users/'+username+'/repos?sort=updated&callback=?',callback);
};
 
jQuery.fn.loadRepositories = function(username) {
    this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");
     
    var target = this;
    $.githubUser(username, function(data) {
        var repos = data.data; // JSON Parsing
        //sortByNumberOfWatchers(repos);    
     	
       	var repoLang, repoName, repoDesc, color, card;

       	//console.log(repos);

          target.empty();
       	$(repos.slice(0,8)).each(function(){
       		if (this.name != (username.toLowerCase()+'.github.com')) {
       		    switch(this.language){
       		    	case 'C#': color='#2c3e50';
  	    					break;
  	    			case 'JavaScript': color='#27ae60';
  	    					break;
  					case 'HTML': color='#f39c12';
  							break;
  					case 'C++': color='#c0392b';
  							break;
  					case 'Java': color='#1abc9c';
  							break;
            case 'CSS': color='#563B7E';
                break;
  					default: color='white';
  							break;
       		    }	
          		repoLang = this.language;
          		repoName = this.name;
          		repoDesc = this.description;
          		card = '<div class="col-md-3 col-centered">'+
  				    		'<div class="githubCard" >'+
  					    		'<h4 style="background:'+color+';">'+repoLang+'</h4>'+
  					    		'<h3>'+repoName+'</h3>'+
  					    		'<hr>'+
  					    		'<p>'+repoDesc+'</p>'+
  					    		'<a href="'+this.html_url+'">See it in Github</a>'+
  				    		'</div>'+
          				'</div>';

          		target.append(card);
       		}
       	});
     
      });
      
    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }

    function sortByNumberOfWatchers(repos) {
        repos.sort(function(a,b) {
          return b.watchers - a.watchers;
        });
      }
};

$(function() {
        $("#githubRepos").loadRepositories("AlexRex");
});



