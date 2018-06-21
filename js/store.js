'use strict';
// eslint-disable-next-line no-unused-vars
//our global store object which contains our data
const store =(function(){
  const bookmarks = [];
  const checkBox= false;
  let ratingFilter = 1;
  const error=null;


  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const findAndUpdate = function(id, newData){
    const bookmark = this.bookmarks.find(function(bookmark){
      return bookmark.id === id;
    });

    Object.assign(bookmark, newData);

  };

  const setRatingFilter= function(value){

    store.ratingFilter=value;
    console.log(value);
    console.log(store.ratingFilter);

  };

  const getRatingFilter=function(){
    console.log(`This is the get rating ${this.ratingFilter}`)
    return this.ratingFilter;
  };




  //method that sets checked property of item 
  function toggleCheckForBookmark (itemId) {
    const item = this.findById(itemId);
    console.log(item);
    //if(item.checked === null)
    item.checked = !item.checked;
    bookmarksList.render();
  }

  const toggleCheckedFilter = function() {
    this.hideCheckedBookmarks = !this.hideCheckedBookmarks;
  };

  const setSearchTerm = function(term) {
    this.searchTerm = term;
  };

  const setErrorMsg = function(msg){
    this.errorMsg = msg;
  };

  return {
    bookmarks,
    addBookmark,
    findById,
    findAndDelete,
    findAndUpdate,
    toggleCheckedFilter,
    toggleCheckForBookmark,
    setSearchTerm,
    setErrorMsg,
    setRatingFilter,
    getRatingFilter
  };
  
}());