async function searchFormHandler(event) {
  event.preventDefault();

  const searchOption = document.querySelector("#search-type").value.trim();

  if (searchOption) {
    if (searchOption === "usersPost") {
      const userName = document.querySelector(".searchUserName").value.trim();
      //const apiURL = `/search/${searchOption}`
      document.location.replace(`/search/${searchOption}/${userName}`);
    } else {
      console.log(searchOption);
      document.location.replace(`/search/${searchOption}`);
    }
  }
}

async function searchOptionHandler(event) {
  event.preventDefault();

  const searchOption = document.querySelector("#search-type").value.trim();
  const additionalEl = document.querySelector(".additional");
  if (searchOption === "usersPost") {
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "searchUserName ml-2");
    input.setAttribute("id", "searchUserName");

    const inputLabel = document.createElement("label");
    inputLabel.textContent = "User Name:";
    inputLabel.setAttribute("for", "searchUserName");
    inputLabel.setAttribute("class", "pl-2 font-bold text-lg");

    additionalEl.append(inputLabel);
    additionalEl.append(input);
  } else {
    additionalEl.textContent = "";
  }
}

document
  .querySelector(".search-form")
  .addEventListener("submit", searchFormHandler);
document
  .querySelector("#search-type")
  .addEventListener("change", searchOptionHandler);
