
handleDragOver = function(evt) {
  evt.preventDefault();
  const droppableCard = document.querySelector('.droppable-card');
  droppableCard.classList.add('dragover');
}

handleDrop = function(evt) {
  evt.preventDefault();
  const droppableCard = document.querySelector('.droppable-card');
  droppableCard.classList.remove('dragover');

    var files = evt.dataTransfer.files; // FileList object.
    console.debug("Getting location from", files.length, "files");
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.debug("Getting location from", file.name);
        get_exif_from_image(file);

    }
}