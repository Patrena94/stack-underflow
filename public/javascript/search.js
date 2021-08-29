async function searchFormHandler(event) {
    event.preventDefault();
   
     const searchOption = document.querySelector('#search-type').value.trim();
    
   
     if (searchOption) {
       console.log(searchOption)
       document.location.replace(`/search/${searchOption}`);
   
       
     }
   }
 
 document.querySelector('.search-form').addEventListener('submit', searchFormHandler);