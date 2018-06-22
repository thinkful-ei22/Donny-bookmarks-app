/* global bookmarksList, store, api */

'use strict';

$(document).ready(function() {
  //load up our good ol event listeners
  bookmarksList.bindEventListeners();
  //upon first load, query the server for bookmark data, then add to the local store bookmark array
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarksList.render();
  });
});
