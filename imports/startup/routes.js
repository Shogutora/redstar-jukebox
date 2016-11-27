import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import "../ui/body.html";
import "../ui/body.js";
import "../ui/setplaylist.html";
import "../ui/setplaylist.js";

FlowRouter.route('/list/:playlist', {
    name: 'App.home',
    action() {
        console.log(FlowRouter.getParam("playlist"));
        Session.set("playListName",FlowRouter.getParam("playlist"));
        BlazeLayout.render('mainLayout');
    },
});

FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('setPlaylist');
    },
});