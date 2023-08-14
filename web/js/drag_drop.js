
// https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element
let drag_counter = 0;
handleDragEnter = function (evt) {
    evt.preventDefault();
    let obj = evt.target;
    console.log("Drag over", obj)
    $(".droppable-card").addClass('dragover');
    drag_counter += 1;
}

handleDragLeave = function (evt) {
    evt.preventDefault();
    console.log("Drag end", evt.target)
    drag_counter -= 1;
    if (drag_counter <= 0){
        $(".droppable-card").removeClass('dragover');
    }
}

handleDrop = function (evt) {
    evt.preventDefault();
    $(".droppable-card").removeClass('dragover');
    var files = evt.dataTransfer.files; // FileList object.
    console.debug("Getting location from", files.length, "files");
    get_exif_from_images(files);
}