# simple-jira-issue-printer

I've written a little application that allows to print jira issues in a more customized style a depending on the type of the issue (Story, Bug, Task).

It is free for personal and professional purpose.


### Installation

Since Jira Cloud API does not allow CORS requests you need to create a reverse proxy using nginx.


Change `cards_printer.conf` with path for the application and your jira domain:

```bash
server {
  server_name cards_print;
  listen 8888;
  root /path/to/simple-jira-issue-printer/repo;

  location /rest {
    proxy_pass https://youjiraclouddomain.atlassian.com/rest;
    }
}

```

Add the above to your nginx configuration and you should be good to go.

Follow the this steps:

```bash
git clone https://github.com/tfmf/simple-jira-issue-printer.git
```

In the main.js replace the username and password with your Jira credentials:

```javascript
let username = "YourUserNameHere";
let password = "YourPasswordHere"
```

Change the JQL to whatever you want, e.g.:

```javascript
let jql = "staus=Done"
```
(if you leave it blank the request will get all the issues)


The css is pretty explanatory, feel free to change it as you like.

You may have to change the story points custom field since they can differ from one jira instance to another, mine is 10004:

```javascript
issue.fields.customfield_10004 ? issue.fields.customfield_10004 : ""
```

(`cog -> issues -> custom fields -> Story Points -> cog -> edit` and look to the url, you should see something like: `https://yourdomain.atlassian.net/secure/admin/EditCustomField!default.jspa?id=10004` use that id)
