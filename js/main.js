let username = "YourUserNameHere"; //your Jira username
let password = "YourPasswordHere" //your Jira password
let basicAuthPass = btoa(username + ":" + password); //base64 enconding
let jql = "";
let encondedJql = encodeURI(jql);
let url = `/rest/api/latest/search?jql=+${encondedJql}`;

let taskList = document.getElementById("tasklist");
let status = document.getElementById("status");
let requestHeaders = new Headers();
requestHeaders.append("Content-Type", "application/json");
requestHeaders.append("Authorization", `Basic ${basicAuthPass}`);

let initConfig = {
  method: "GET",
  headers: requestHeaders
};

let createIssueCard = (issuetype, key, summary, description, points) => {
  return `
  <li class="task">
    <div class="card_header card_header_${issuetype}">
      <div class="logo"></div>
      <span>${key}</span>
    </div>
    <div class="summary">${summary}</div>
    <div class="description">${description}</div>
    <div class="points">${points}</div>
  </li>`;
}

fetch(url, initConfig)
  .then(response => {
    if (response.status !== 200) {
      status.innerHTML += "Error [" + response.status + "]: " + response.statusText;
    } else {
      response.json().then(data => {
        data.issues.forEach(issue => {
          taskList.innerHTML += createIssueCard(issue.fields.issuetype.name,
            issue.key,
            issue.fields.summary ? issue.fields.summary : "",
            issue.fields.description ? issue.fields.description : "",
            issue.fields.customfield_10004 ? issue.fields.customfield_10004 : "");
        });
      });
    }
  })
  .catch(error => {
    status.innerHTML += "\n" + error;
  });
