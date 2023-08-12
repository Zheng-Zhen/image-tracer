//exif-js to extract the geo-location from the images
document.getElementById('fileInput').addEventListener('change', function() {
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.onload = function(e) {
            EXIF.getData(e.target, function() {
                var lat = EXIF.getTag(this, 'GPSLatitude');
                var lon = EXIF.getTag(this, 'GPSLongitude');
                // Convert coordinates if needed and add to map
            });
        };
        reader.readAsDataURL(files[i]);
    }
});
