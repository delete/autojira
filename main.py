import sys
from time import sleep

from jira import JIRA
import requests

from task import Task
from configs import USER, PASSWORD, JIRA_URL, AW_SERVER_URL, HOSTNAME


if not USER or not PASSWORD:
	print('You must export JIR_USER and JIRA_PASS')
	sys,exit(1)

AUTH = (USER, PASSWORD)

if len(sys.argv) == 1:
	print('Plesase, give me a TASK\'s list as a param. Like so: python main.py "TES-1;TES-2"')
	sys,exit(1)

keys = sys.argv[1]
TASKS_KEY = keys.split(';') if keys else []

WATCHER_NAME = 'aw-watcher-afk_{}'.format(HOSTNAME)
EVENTS_URL = "{host}/api/0/buckets/{watcher}/events".format(
	host=AW_SERVER_URL,
	watcher=WATCHER_NAME
)

myJira = JIRA(server=JIRA_URL, basic_auth=AUTH)

tasks = []
for t in TASKS_KEY:
	t_obj = myJira.issue(t)
	task = Task(myJira, t_obj)
	tasks.append(task)


# Check loop
while True:
	data = requests.get(EVENTS_URL).json()	
	last_event = data[0]

	is_afk = last_event['data']['status'] == 'afk'
	
	if is_afk:
		for task in tasks:
			task.stop()
		print('AFK MODE ON')
	else:
		for task in tasks:
			task.start()
		print('AFK MODE OFF')
	
	sleep(30)