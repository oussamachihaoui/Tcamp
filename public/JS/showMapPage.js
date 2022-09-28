mapboxgl.accessToken = mapKey
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 10, // starting zoom
projection: 'globe' // display the map as a 3D globe
    });
map.on('style.load', () => {
 map.setFog({}); // Set the default atmosphere style
 });




const marker1 = new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup(
    new mapboxgl.Popup({ offset : 25 })
        .setHTML(
            `<h4>${campground.title}</h4> <p>${campground.location} ,<b>${campground.price}Dt/night</b>`
            )
     )
.addTo(map);
