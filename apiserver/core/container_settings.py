import os
import docker

IMAGE_NAME = os.environ.get('IMAGE_NAME', 'apiserver')

CONTAINER_CONFIG = {
    'stdin_open': False,
    'blkio_weight': 100,
    'cpu_period': 500000,
    'cpu_quota': 100000,
    'cpu_rt_period': 1000000*10,
    'cpu_shares': 2,
    'mem_limit': '200m',
    'working_dir': '/app',
    'network_disabled': True,
    'auto_remove': False,
    'detach': True,
    'tty': False,
    'cap_drop': ['ALL'],
    'pids_limit': 20,
    'security_opt': ['no-new-privileges'],
    'log_config': {
        'type': 'json-file',
        'config': {
            'max-size': '10m',
            'max-file': '3'
        }
    },
    'restart_policy': {
        'Name': 'no',
        'MaximumRetryCount': 0
    },
    'ulimits': [
        docker.types.Ulimit(name='cpu', soft=2, hard=2),
        docker.types.Ulimit(
            name='fsize', soft=1024 * 1024*10, hard=1024*1024*10
        ),
        docker.types.Ulimit(name='memlock', soft=1024, hard=2048),
        docker.types.Ulimit(name='nofile', soft=1024, hard=2048),
        docker.types.Ulimit(name='nproc', soft=2, hard=2),
    ],
}
