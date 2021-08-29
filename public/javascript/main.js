async function searchFormHandler(event) {
    event.preventDefault();
  
    const searchOption = document.querySelector('#search-type').value.trim();
   
  
    if (searchOption) {
      const response = await fetch(`/search/${searchOption}`);
  
      if (response.ok) {
        //document.location.replace('/search-results');
      } else {
        alert(response.statusText);
      }
    }
  }

document.querySelector('.search-form').addEventListener('submit', searchFormHandler);