'use strict';

// eslint-disable-next-line no-unused-vars
const api = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/donny';

  const getBookmarks = function (callback){
    $.getJSON(`${BASE_URL}/bookmarks`,callback);
  };

  //updates bookmark 
  const updateBookmark = function (id,updateData,callback,error) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
      error:error
    });
  };

  //creates bookmark
  const createBookmark = function (newBookmarkData,callback,error){
   // console.log(newBookmarkData);
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: newBookmarkData,
      success: callback,
      error:error
    });
  };
  
  //delet 
  const deleteBookmark = function (id,callback,error){
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      success: callback,
      error:error
    });

  };

  return{
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };
}());