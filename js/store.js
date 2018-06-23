/* global store, api, cuid,bookmarksList */
'use strict';
// eslint-disable-next-line no-unused-vars

//our global store object which contains our data
const store =(function(){
  
  //our main data object which stores our bookmark data
  const bookmarks = [];
  //value for rating filter
  let ratingFilter = 1;
  const error=null;
  const errorMsg='';
  const adding = false;

  //data and method for loading in some dummy data for testing purposes, it's alot faster than typing it all in....
  const dummyDataJSON = [
    '{"title":"There is a time and place for Anime...","url":"http://kissanime.ru","desc":"The time is now. The place is here.-me","rating":"4"}',
    '{"title":"Google Me Chuck","url":"http://google.com","desc":"Google ruined the internet. Facebook too. And Amazon.","rating":"1"}',
    '{"title":"Mister Pants","url":"http://misterpants.com","desc":"Mister pants feels good all over.","rating":"5"}',
    '{"title":"Github ","url":"http://github.com","desc":"Simply put, github is where all the gits go to meet up and hang out. Also, R.I.P. (Microsoft)","rating":"4"}',
    '{"title":"Thinkful","url":"http://thinkful.com","desc":"Thinking about them thots.","rating":"4"}'
  ];

  const addDummyData= function(){
    let bookmarksProcessed = 0;
    dummyDataJSON.forEach((bookmark, index, array) => {
      api.createBookmark(bookmark, () => {
        bookmarksProcessed++;
        if(bookmarksProcessed === array.length) {
          refreshPage();
        }
      });
    });
  };

  function refreshPage() { location.reload(); }

  //Delet that 
  const deleteEverything = function(){
    bookmarks.forEach(bookmark => api.deleteBookmark(bookmark.id));
    store.bookmarks = [];
    bookmarksList.render();
  };

  //How Many?
  const getBookmarksNumber = function(){
    console.log('fetching your number of bookmarks');
    return this.bookmarks.length;
  };

  //local push 
  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
  };

  //local find  
  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };
  //local delete 
  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };
  //local update
  const findAndUpdate = function(id, newData){
    const bookmark = this.bookmarks.find(function(bookmark){
      return bookmark.id === id;
    });

    Object.assign(bookmark, newData);

  };

  //set global rating filter
  const setRatingFilter= function(value){

    this.ratingFilter=value;
    //console.log(value);
    //console.log(this.ratingFilter);

  };
  
  //get global rating filter value
  const getRatingFilter=function(){
  //  console.log(`This is the get rating ${this.ratingFilter}`);
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

  //local set error message
  const setErrorMsg = function(msg){
    this.errorMsg = msg;
    console.log(this.errorMsg);
  };

  return {
    bookmarks,
    adding,
    addBookmark,
    findById,
    findAndDelete,
    findAndUpdate,
    toggleCheckForBookmark,
    setErrorMsg,
    ratingFilter,
    setRatingFilter,
    getRatingFilter,
    getBookmarksNumber,
    deleteEverything,
    addDummyData,
    error,
    errorMsg
  };
  
}());