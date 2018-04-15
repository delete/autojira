import socket
import os

USER = os.environ.get('JIRA_USER', '')
PASSWORD = os.environ.get('JIRA_PASS', '')
JIRA_URL = os.environ.get('JIRA_URL', 'http://localhost:8080')
AW_SERVER_URL = os.environ.get('AW_SERVER_URL', 'http://localhost:5666')
HOSTNAME = os.environ.get('HOSTNAME', socket.gethostname())