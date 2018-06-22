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
  const logoHeader = function(){
    
    return `<img class="logo" src="assets/logo.png" alt="Bookmark Logo" title="Bookmark Logo"><h1> Bookmark</h1> <h4 id="getStarted">${displayMessage()} </h4>` ;
    
  };

  //HTML template for add form section
  const addingFormElement= function(){   
    let buttonOptions='';
    if(store.bookmarks.length > 0){
      buttonOptions = `<div class="submitInfo"><button type="submit" class="addBookmark" title="Add Bookmark"><button type="submit" class="cancelAddBookmark" title="Cancel Adding Bookmark">
      </button></div>`;
    } else {
      buttonOptions = `
      <div class="submitInfo"><button type="submit" class="addBookmark" title="Add Bookmark">
      </button></div>`;
    }

    return `
  
    <form id="js-bookmarks-list-form" class="js-bookmarks-list-form fadein ">
    <label for="bookmarks-list-entry">Title</label>
    <input type="text" name="title" class="js-bookmarks-list-entry" placeholder="Enter a Title" autocomplete="off">
    <label for="bookmarks-url-entry">URL</label>
    <input type="url" name="url" class="js-bookmarks-url-entry" placeholder="Enter URL" autocomplete="off">
    <label for="bookmark-description-entry">Description</label>
    <textarea id="bookmarks-description-entry" name="desc" class="js-bookmarks-description-entry" placeholder="Enter a short description" maxlength="200"></textarea>
   

    <div class="star-rating" title="Add a Rating">
        <label for="rating-input-1">Rating</label>
        <span class="rating floatRight">
       
       
            <input type="radio" class="rating-input"
                   id="rating-input-1-5" name="rating" value="5" title="5 stars">
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

  //the html code for each individual bookmark
  function generateBookmarkElement(bookmark) {
    //let bookmarkTitle = `<span class="bookmarks-bookmark bookmarks-bookmark__checked">${bookmark.name}</span>`;

    return `
    <li class="js-bookmark-index-element fadein" data-bookmark-id="${bookmark.id}">
   
  
      <div class="star-rating">
       
      <span class="rating">
      <fieldset name="bookmark-star-rating">
          <legend>Bookmark Star Rating</legend>
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
          </fieldset>
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
            <p class="tinyURL"><a href="${bookmark.url}" target="_blank">${bookmark.url}</a> </p>
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
  
  //Filter element HTML template
  const starRatingElement = function(){
    var newRating=store.ratingFilter;
    // console.log('STAR RATING ELEMENT');
    // console.log(newRating);
    return `   
   <div class="star-rating3">
  <label for="rating-input-3">Minimum Rating</label>
  <span id="dataMessages">  You have a total of  ${store.bookmarks.length}  ${store.bookmarks.length !== 1 ? 'bookmarks' : 'bookmark'}</span>
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
  
  //generate bookmarks list
  function generateBookmarksBookmarkString(bookmarksList) {
    const rating = store.getRatingFilter();
    //console.log(`The rating is ${rating}`);
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
    // Outputs to DOM
    let bookmarks = store.bookmarks;    
    $('.logo-area').html(logoHeader);
    if(bookmarks.length < 1 || store.adding===true){
      $('.js-bookmarks-list-options').html(addingFormElement);
      $('.filterRatingContainer').html('');
      $('.js-bookmarks-list').html('');
  
    } else {
      $('.js-bookmarks-list-options').html(hiddenFormElement);
      $('.filterRatingContainer').html(starRatingElement);
      console.log('`render` ran');
      const bookmarksListBookmarkString =  generateBookmarksBookmarkString(bookmarks);
      $('.js-bookmarks-list').html(bookmarksListBookmarkString);
    }
    // insert error message into DOM
    if(store.errorMsg !== '' ){
      $('.error-box').html(`Failure: ${store.errorMsg}`);
    } else{
      $('.error-box').html('');
    }
  }
  


  //getters and setters

  function setBookmarkMode(boolean){
    store.adding = boolean;
    //console.log(store.adding);
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-index-element')
      .data('bookmark-id');
  }
  
  function getBookmarkMode(){
    return store.adding;
  }


  //Handlers
  //sets global filter for star rating
  const handleRatingFilterClick = function(){
    $('.filterRatingContainer').on('click','.rating-input',event => {
      const inputValue = event.currentTarget.value;
      //console.log(inputValue);
      store.setRatingFilter(inputValue);
      render();
    }); 
  };
  
  function handleAddModeButtonClick(){
    $('.js-bookmarks-list-options').on('click', '#addMode',event => {
      //console.log('working! click');
      bookmarksList.setBookmarkMode(true);
      render();
    });
  }

  function cancelAddModeButtonClick(){
    $('.js-bookmarks-list-options').on('click', '.cancelAddBookmark',event => {
      //console.log('working! click');
      bookmarksList.setBookmarkMode(false);
      store.setErrorMsg('');
      render();
    });
  }
  

  //handler for New Bookmark user submission
  function handleNewBookmarkSubmit() {
    $('.js-bookmarks-list-options').submit(function (event) {
      event.preventDefault();
      let newBookmarkData = $(event.target).serializeJson();  
      let convertedObject = JSON.parse(newBookmarkData);
      $('.js-bookmarks-list-entry').val('');
      $('.js-bookmarks-url-entry').val('');
      $('.js-bookmarks-description-entry').val('');
      convertedObject.checked=false;
      // console.log(convertedObject.checked)
      api.createBookmark(newBookmarkData,function(response){
        //  console.log(convertedObject);
        convertedObject.id= response.id;
        //console.log(response.id);
        store.addBookmark(convertedObject);
        store.adding=false;
        //displayMessage('Thank you for adding a bookmark!');
        store.setErrorMsg('');
        //console.log(store.bookmarks);
        render();
       
      }, response =>{ //error callback
        console.log('FORM INPUT ERROR');
        console.log(response.responseJSON.message);
        store.setErrorMsg(response.responseJSON.message);
        render();
    
      });     
    });
  }

  //handler for to show expanded bookmarm form (not used currently, using a css solution instead but was using this early on)
  function handleBookmarkCheckClicked() {
    $('.js-bookmarks-list').on('click', '.js-bookmark-toggle', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      //const bookmark = store.findById(id);
      store.toggleCheckForBookmark(id);
      console.log('checked');
     
    });
  }

  //Delete bookmark with this method
  function handleDeleteBookmarkClicked() {
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
  
  //Edit bookmark into - not implemented currently but will be added in future
  function handleEditBookmarksBookmarkSubmit() {
    $('.js-bookmarks-list').on('submit', '.js-edit-bookmark', event => {
      event.preventDefault();
      const id = getBookmarkIdFromElement(event.currentTarget);
      const bookmarkName = $(event.currentTarget).find('.bookmarks-bookmark').val();
      api.updateBookmark(id, {name: bookmarkName}, function(response){
        store.findAndUpdate(id, {name:bookmarkName});
        render();
      }, function(response){
        store.setErrorMsg('Failure ', response.responseJSON.message);
      });
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }

  //demo data handler
  function handleLoadDemoData(){
    $('#loadDemo').click(() => {
      store.addDummyData();
    });
  }

  function handleDeleteEverything(){
    $('#deleteDemo').click(() => {
      store.deleteEverything();
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
  
  
  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleBookmarkCheckClicked();
    handleDeleteBookmarkClicked();
    handleEditBookmarksBookmarkSubmit();
    handleToggleFilterClick();
    handleRatingFilterClick();
    handleAddModeButtonClick();
    cancelAddModeButtonClick();
    handleLoadDemoData();
    handleDeleteEverything();
    
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