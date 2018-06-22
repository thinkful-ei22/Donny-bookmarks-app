/* global store, api, cuid */
// eslint-disable-next-line no-unused-vars
'use strict';

const bookmarksList = (function(){


  //Array of messages that displays in header logo section
  const funMessages=['Have you added Google.com? :)','What are your favorite sites?','By Normies, for Normies.','Goatse is dead. Long live Goatse.','Add more bookmarks. Now!'];
  
  //Add messages. Currently Unused but perhaps a later implementation will allow users to submit Fun Messages.
  function addFunMessage(yourMessage){
    funMessages.push(yourMessage);
  }

  //Ask a random question, Get a random answer
  function getRandomMessage(){
    return funMessages[Math.floor(Math.random() * (funMessages.length))];
  }

  //Method for message display in DOM - display random messages unless passed string
  function displayMessage(optionalMessage){
    if(optionalMessage){
      return optionalMessage;
    }else{
      return getRandomMessage();
    }
  }


  //HTML template for logo header section
  const logoHeader =`<img class="logo" src="assets/logo.png"/><h1> Bookmark</h1> <h4 id="getStarted">${displayMessage()} </h4>` ;

  //HTML template for add form section
  const addingFormElement= function(){   
    let buttonOptions='';
    if(store.bookmarks.length > 0){
      buttonOptions = `<div class="submitInfo"><button type="submit" class="addBookmark"><button type="submit" class="cancelAddBookmark">
      </button></div>`;
    } else {
      buttonOptions = `
      <div class="submitInfo"><button type="submit" class="addBookmark">
      </button></div>`;
    }

    return `
    <form id="js-bookmarks-list-form" class="js-bookmarks-list-form ">
    <label for="bookmarks-list-entry">Title</label>
    <input type="text" name="title" class="js-bookmarks-list-entry" placeholder="Enter a Title" autocomplete="off">
    <label for="bookmarks-url-entry">URL</label>
    <input type="url" name="url" class="js-bookmarks-url-entry" placeholder="Enter URL" autocomplete="off">
    <label for="bookmark-description-entry">Description</label>
    <textarea id="bookmarks-description-entry" name="desc" class="js-bookmarks-description-entry" placeholder="Enter a short description" maxlength="200"></textarea>
   
    <div class="star-rating">
        <label for="rating-input-1">Rating</label>
        <span class="rating floatRight">
            <input type="radio" class="rating-input"
                   id="rating-input-1-5" name="rating" value="5">
            <label for="rating-input-1-5" class="rating-star" ></label>
            <input type="radio" class="rating-input"
                   id="rating-input-1-4" name="rating" value="4">
            <label for="rating-input-1-4" class="rating-star"></label>
            <input type="radio" class="rating-input"
                   id="rating-input-1-3" name="rating" value="3" checked>
            <label for="rating-input-1-3" class="rating-star"></label>
            <input type="radio" class="rating-input"
                   id="rating-input-1-2" name="rating" value="2">
            <label for="rating-input-1-2" class="rating-star"></label>
            <input type="radio" class="rating-input"
                   id="rating-input-1-1" name="rating" value="1">
            <label for="rating-input-1-1" class="rating-star"></label>
        </span>
     </div>
   
    ${buttonOptions}


  </form>`;
  };

  //HTML template string for when form is hidden - just shows a single button instead ( ; _ ;)
  const hiddenFormElement=  '<div class="submitInfo"><button class="addBookmark" id="addMode"></i></button></div> </form>';



  

  function generateBookmarkElement(bookmark) {
    let bookmarkTitle = `<span class="bookmarks-bookmark bookmarks-bookmark__checked">${bookmark.name}</span>`;
   
   
    // if (!bookmark.checked) {
    //   bookmarkTitle = `
    //     <form class="js-edit-bookmark">
    //       <input class="bookmarks-bookmark type="text" value="${bookmark.name}" />
    //     </form>
    //   `;
    // }
  
    return `
    <li class="js-bookmark-index-element" data-bookmark-id="${bookmark.id}">
   
  
      <div class="star-rating">
       
      <span class="rating">
          <input type="radio" class="rating-input disable"
                 class="rating-input-${bookmark.id}-5 disable" name="rating${bookmark.id}" value="5"  ${ parseInt(bookmark.rating) === 5 ? 'checked' : ''} disabled>
          <label for="rating-input-${bookmark.id}-5" class="rating-star" ></label>
          <input type="radio" class="rating-input disable"
                 class="rating-input-${bookmark.id}-4 disable" name="rating${bookmark.id}" value="4"  ${parseInt(bookmark.rating) === 4 ? 'checked' : ''} disabled>
          <label for="rating-input-${bookmark.id}-4" class="rating-star"></label>
          <input type="radio" class="rating-input disable"
                 class="rating-input-${bookmark.id}-3 disable" name="rating${bookmark.id}" value="3"  ${parseInt(bookmark.rating) === 3 ? 'checked' : ''} disabled>
          <label for="rating-input-${bookmark.id}-3" class="rating-star"></label>
          <input type="radio" class="rating-input disable"
                 class="rating-input-${bookmark.id}-2" name="rating${bookmark.id}" value="2"  ${parseInt(bookmark.rating) === 2 ? 'checked' : ''} disabled>
          <label for="rating-input-${bookmark.id}-2" class="rating-star"></label>
          <input type="radio" class="rating-input disable"
                 class="rating-input-${bookmark.id}-1 disable" name="rating${bookmark.id}" value="1"  ${parseInt(bookmark.rating) === 1 ? 'checked' : ''} disabled>
          <label for="rating-input-${bookmark.id}-1" class="rating-star"></label>
      </span>
   </div>
    
       <div class="wrap-collabsible">
       <span><h3 class="bookmark-title"><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></h3> 
       <a href="${bookmark.url}" target="_blank"><button class="bookmarks-bookmark-link js-bookmark-link"></button></a></span>
       
       


          <input id="collapsible${bookmark.id}" class="toggle" type="checkbox" ${bookmark.checked ? 'checked' : ''} >
          <label for="collapsible${bookmark.id}" class="lbl-toggle">View More Info</label>
          <div class="collapsible-content">
            <div class="content-inner">
            <span class="bookmarks-bookmark js-bookmarks-expanded">${bookmark.desc} 
            <p class="tinyURL">${bookmark.url} </p>
            </span>
            <div class="bookmarks-bookmark-controls">
      
      
            <button class="bookmarks-bookmark-delete js-bookmark-delete trashcan increaseOpacity">
            <span class="button-label">
            </span>
            </button>

      
           
            </div>
          </div>
        </div>
     
       
      </div>
    </li>`;
  }
  

  const starRatingElement = function(){
    var newRating=store.ratingFilter;
    console.log('STAR RATING ELEMENT');
    console.log(newRating);
    return `   
   <div class="star-rating3">
  <label for="rating-input-3">Minimum Rating</label>
<span class="rating">
<input type="radio" class="rating-input"
 id="rating-input-3-5" name="rating-input-3" value="5"  ${  newRating === '5' ? 'checked': ''}>
<label for="rating-input-3-5" class="rating-star"  ></label>
<input type="radio" class="rating-input"
 id="rating-input-3-4" name="rating-input-3" value="4" ${ newRating === '4' ? 'checked' : '' }>
<label for="rating-input-3-4" class="rating-star"></label>
<input type="radio" class="rating-input"
 id="rating-input-3-3" name="rating-input-3" value="3"  ${ newRating === '3' ? 'checked' : '' }>
<label for="rating-input-3-3" class="rating-star"></label>
<input type="radio" class="rating-input"
 id="rating-input-3-2" name="rating-input-3" value="2"  ${ newRating === '2' ? 'checked' : '' }>
<label for="rating-input-3-2" class="rating-star"></label>
<input type="radio" class="rating-input"
 id="rating-input-3-1" name="rating-input-3" value="1" ${ newRating === '1' ? 'checked' : '' } >
<label for="rating-input-3-1" class="rating-star"></label>
</span>
</div>`;
  };
  
  function generateBookmarksBookmarkString(bookmarksList) {
    const rating = store.getRatingFilter();
    console.log(`The rating is ${rating}`);
    let filterList = filterBookmarksArrayByRating(bookmarksList,rating);
    const bookmarks = filterList.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }
  
  //filters array given argument, returns filtered array or if no filter argument, returns array
  function filterBookmarksArrayByRating(bookmarks, rating){
    if(rating > 0){
      return bookmarks.filter(bookmark => bookmark.rating >= rating);
    }else{
      return bookmarks;
    }
  }

  
  function render() {
    // Filter bookmark list if store prop is true by bookmark.checked === false
    let bookmarks = store.bookmarks;
   

    // console.log(bookmarks);
    // if (store.hideCheckedBookmark) {
    //bookmarks = store.bookmarks.filter(bookmark => !bookmark.checked);
    // }
  
    // Filter bookmark list if store prop `searchTerm` is not empty
    //if (store.searchTerm) {
    // bookmarks = store.bookmarks.filter(bookmark => bookmark.name.includes(store.searchTerm));
    // }
    
    
    $('.logo-area').html(logoHeader);

    // render the bookmarks list in the DOM
   

    if(bookmarks.length < 1 || store.adding===true){
      $('.js-bookmarks-list-options').html(addingFormElement);
      $('.filterRatingContainer').html('');
      $('.js-bookmarks-list').html('');
  
    } else {
      $('.js-bookmarks-list-options').html(hiddenFormElement);
     
    $('.filterRatingContainer').html(starRatingElement);
    console.log('`render` ran');
    const bookmarksListBookmarkString =  generateBookmarksBookmarkString(bookmarks);
  
    // insert that HTML into the DOM
    $('.js-bookmarks-list').html(bookmarksListBookmarkString);
    }

    

     




    // insert error HTML if error message exists
    if(store.errorMsg){
      $('.error-box').html(`Database failure: ${store.errorMsg}`);
    }
    
  }
  


  //getters and setters

  function setBookmarkMode(boolean){
    store.adding = boolean;
    console.log(store.adding);

  }


  function getBookmarkMode(){
    return store.adding;
  }

  function setFunMessage(yourMessage){
    this.funMessage = yourMessage;
    
  }

  function getFunMessage(yourMessage){
    return this.funMessage;
  }


  function handleAddModeButtonClick(){
    $('.js-bookmarks-list-options').on('click', '#addMode',event => {
    
      console.log('working! click');
      bookmarksList.setBookmarkMode(true);
      render();
  
    });

  }

  function cancelAddModeButtonClick(){
    $('.js-bookmarks-list-options').on('click', '.cancelAddBookmark',event => {
    
      console.log('working! click');
      bookmarksList.setBookmarkMode(false);
      render();
  
    });
  }
  
  function handleNewBookmarkSubmit() {
    $('.js-bookmarks-list-options').submit(function (event) {
      event.preventDefault();
      let newBookmarkData = $(event.target).serializeJson();  
      let convertedObject = JSON.parse(newBookmarkData);
      $('.js-bookmarks-list-entry').val('');
      $('.js-bookmarks-url-entry').val('');
      $('.js-bookmarks-description-entry').val('');
      convertedObject.checked=false;
   
      
      // console.log(convertedObject.checked);
      
      api.createBookmark(newBookmarkData,function(response){
      //  console.log(convertedObject);
        convertedObject.id= response.id;
        console.log(response.id);
        store.addBookmark(convertedObject);
        store.adding=false;
        displayMessage('Thank you for adding a bookmark!');
        //console.log(store.bookmarks);
        render();
      });     
    });
  }
  
  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-index-element')
      .data('bookmark-id');
  }
  
  function handleBookmarkCheckClicked() {
    $('.js-bookmarks-list').on('click', '.js-bookmark-toggle', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      //const bookmark = store.findById(id);
      store.toggleCheckForBookmark(id);
      console.log('checked');
     
      	//var pixels = $('a').position();
      //Scroll(700);

      //api.updateBookmark(id, newData, function(response){
      //  store.findAndUpdate(id, newData);
      //  render();
      // }, function(response){
      //  console.log('Update Check Status failed: ', response.responseJSON.message);
      // });
      
    });
  }


  function Scroll(pixels) {
    if( pixels > 0){
      window.scrollBy(0,1);
      var scrollTimeout = setTimeout(function(){
        Scroll(pixels-1); 
      },1);
    }
    else {
      clearTimeout(scrollTimeout);
      return;
    }
  }
  


  //HANDLE WITH CARE


  //Delete bookmark with this method
  function handleDeleteBookmarkClicked() {
    // like in `handleBookmarkCheckClicked`, we use event delegation
    $('.js-bookmarks-list').on('click', '.js-bookmark-delete', event => {
      // get the index of the bookmark in store.bookmarks
      const id = getBookmarkIdFromElement(event.currentTarget);
      console.log('deletehandlerworking!');
      console.log(id);
      // delete the bookmark
      api.deleteBookmark(id, function(response){
        store.findAndDelete(id);
        render();
      }, function(response){
        store.setErrorMsg(response.responseJSON.message);
        render();
      });
    });
  }
  
  //Edit bookmark into
  function handleEditBookmarksBookmarkSubmit() {
    $('.js-bookmarks-list').on('submit', '.js-edit-bookmark', event => {
      event.preventDefault();
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmarkName = $(event.currentTarget).find('.bookmarks-bookmark').val();
      api.updateBookmark(id, {name: bookmarkName}, function(response){
        store.findAndUpdate(id, {name:bookmarkName});
        render();
      }, function(response){
        console.log('Update Name failed: ', response.responseJSON.message);
      });
    });
  }
  
  const handleRatingFilterClick = function(){
    $('.filterRatingContainer').on('click','.rating-input',event => {

      const inputValue = event.currentTarget.value;
      console.log(inputValue);

      store.setRatingFilter(inputValue);
      render();

    }); 

  };



  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }
  
  function handleBookmarksListSearch() {
    $('.js-bookmarks-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
      render();
    });
  }

  //form handling
  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });
  

  //helper function
  function getNameFromString(nameAndID,nameId){
    let nameOnly = nameAndID.replace(nameId,'');
    return nameOnly;
  }




  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleBookmarkCheckClicked();
    handleDeleteBookmarkClicked();
    handleEditBookmarksBookmarkSubmit();
    handleToggleFilterClick();
    handleBookmarksListSearch();
    handleRatingFilterClick();
    handleAddModeButtonClick();
    cancelAddModeButtonClick()
    
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    getRandomMessage,
    setBookmarkMode,
    getBookmarkMode,
    bindEventListeners: bindEventListeners,
    
  };
}());