import os

IMAGE_NAME = os.environ.get('IMAGE_NAME', 'apiserver')

CONTAINER_CONFIG = {
    'stdin_open': False,
    'blkio_weight': 100,
    'cpu_period': 500000,
    'cpu_quota': 100000,
    'cpu_shares': 2,
    'mem_limit': '100m',
    'working_dir': '/app',
    'network_disabled': True,
    'auto_remove': False,
    'detach': True,
    'tty': False,
    'cap_drop': ['ALL'],
    'pids_limit': 10,
}
