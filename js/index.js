/* global bookmarksList, store, api */

'use strict';

$(document).ready(function() {
 
  //load up our good ol event listeners
  bookmarksList.bindEventListeners();
   
 // api.createItem('Google','http://www.google.com','Google is taking over the world. And the Universe! Be very afraid.',5,(newItem) => {
   // api.getItems((items) => {
     // console.log(items);
    //});
 // });
  //upon first load, query the server for bookmark data, then add to the local store bookmark array
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarksList.render();
  });
});
