//exif-js to extract the geo-location from the images


function get_exif_from_image(image) {
    EXIF.getData(image, function() {
        console.debug("EXIF", EXIF.pretty(this));
        var lat = EXIF.getTag(this, "GPSLatitude");
        var lon = EXIF.getTag(this, "GPSLongitude");
        var lat_ref = EXIF.getTag(this, "GPSLatitudeRef");
        var lon_ref = EXIF.getTag(this, "GPSLongitudeRef");
        var lat_result = (lat[0] + lat[1]/60 + lat[2]/3600) * (lat_ref == "N" ? 1 : -1);
        var lon_result = (lon[0] + lon[1]/60 + lon[2]/3600) * (lon_ref == "E" ? 1 : -1);
        console.debug("lat", lat_result, "lon", lon_result);
        // $("h1").text("lat: " + lat_result + " lon: " + lon_result);
        $("ul#info").append("<li class=\"list-group-item\">lat: " + lat_result + " lon: " + lon_result + "</li>");
    });
}


function get_exif_from_images(images) {
    for (var i = 0; i < images.length; i++) {
        var image = images[i];
        get_exif_from_image(image);
    }
}


document.getElementById('imageInput').addEventListener('change', function() {
    var files = this.files;
    console.debug("Getting location from", files.length, "files");
    get_exif_from_images(files);
});

