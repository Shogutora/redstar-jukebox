import './playlistitem.html'

Template.playlistitem.events({
    'click .cd-timeline-thumbnail'(event) {
        event.preventDefault();
        $(".horizontal-align").addClass("translateRight");
    }
});