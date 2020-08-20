var stores = [
    {
        name: 'First Store',
        location: {lat: 40.785091, lng: -73.968285},
        hours: '8AM to 10PM'
    },
    {
        name: 'Second Store',
        location: {lat: 12.120000, lng: 76.680000},
        hours: '9AM to 9PM'
    },
    {
        name: 'Third Store',
        location: {lat:24.879999 , lng: 74.629997},
        hours: '9AM to 9PM'
    },
    {
        name: 'Fourth Store',
        location: {lat:16.994444 , lng: 73.300003},
        hours: '9AM to 9PM'
    },
    {
        name: 'Fifth Store',
        location: {lat: 19.155001, lng: 72.849998},
        hours: '9AM to 9PM'
    },
    {
        name: 'Sixth Store',
        location: {lat: 24.794500, lng: 73.055000},
        hours: '9AM to 9PM'
    }
];


function initMap() {
    var getLat;
    var getLng;
    mapCoord = {};
    defaultCoords = {lat: 24.794500, lng: 73.055000};

    var map = new google.maps.Map(document.getElementById('map'), {
        center:  defaultCoords || mapCoord,
        zoom: 14
    });


	function markStore(storeInfo, map){
        console.log() 

		// Create a marker and set its position.
		var marker = new google.maps.Marker({
			map: map,
			position: storeInfo.location,
			title: storeInfo.name
		});

		// show store info when marker is clicked
		marker.addListener('click', function(){
			showStoreInfo(storeInfo);
		});
	}

	// show store info in text box
	function showStoreInfo(storeInfo){
		var info_div = document.getElementById('info_div');
		info_div.innerHTML = 'Store name: '
			+ storeInfo.name
            + '<br>Hours: ' + storeInfo.hours;
        }
        
        
        function showStoreName(store){
            var getListing = '';
            document.querySelector('#search_suggestion').setAttribute('class','active');
            var search_suggestion = document.querySelector('#search_suggestion ul');            
            getListing += `<li>${store.name}</li>`;
            search_suggestion.innerHTML += getListing;       
        }

        document.querySelector('#search_suggestion ul').addEventListener('click',function(e){
            for(getstore of stores){
                if(getstore.name.indexOf(e.target.outerText) > -1){
                    getLat = getstore.location.lat;
                    getLng = getstore.location.lng;
                    mapCoord= {lat: getLat, lng: getLng};
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: mapCoord,
                        zoom: 14
                    });
                    markStore(getstore, map);
                     document.querySelector('#search_suggestion').removeAttribute('class','active');            

                }

             }
        })
        
        

    // stores.forEach(function(store){
	// 	markStore(store);
    // });
    
 

    var getcoords = (targetValue) =>{
        for(store of stores){
            var name = store.name.toLowerCase();
            if (name.indexOf(targetValue) > -1) {
                getLat = store.location.lat;
                getLng = store.location.lng;
                mapCoord= {lat: getLat, lng: getLng};
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: mapCoord,
                    zoom: 14
                });
                showStoreName(store);
                markStore(store, map);
            } 
        }
    }

    const debounce = (func, delay) => {
        let timer;
        return function(...args) {
            if(timer){
                clearTimeout(timer);
            }
            
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
      };
    
            
            
    var search = document.getElementById('search');
    search.addEventListener('keyup', debounce(e=>{
        var search_suggestion = document.querySelector('#search_suggestion ul');
            search_suggestion.innerHTML = '';
        getcoords(e.target.value);
        
    },1500))



   




}

