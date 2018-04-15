import os

class Task:
	RUN_ID = os.environ.get('RUN_ID', '41')
	STOP_ID = os.environ.get('STOP_ID', '61')
	
	def __init__(self, jira, task):
		self.jira = jira
		self.task = task


	def start(self):
		print('Starting: {}'.format(self.task.key))
		self.jira.transition_issue(
			issue=self.task,
			transition=Task.RUN_ID,
			comment='Issue executando automaticamente pelo ActiveWatch.'
		)

	def stop(self):
		print('Stoping: {}'.format(self.task.key))
		self.jira.transition_issue(
			issue=self.task,
			transition=Task.STOP_ID,
			comment='Issue paralisada automaticamente pelo ActiveWatch.'
		)