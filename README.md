# autojira
Jira automatic time manager


Env variables to export:

- JIRA_USER
- JIRA_PASS
- JIRA_URL
- AW_SERVER_URL

Optional
- HOSTNAME (this will got automatic)
- RUN_ID (transition id to start the task)
- STOP_ID (transition id to stop the task)

Run:

Give the first argument a list of taks to watch.

`python main.py 'TES-1, TES-2'`