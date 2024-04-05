# -*- coding: utf-8 -*-
import secrets
import subprocess
from dotenv import load_dotenv
import os

from environs import Env

# Загрузка переменных окружения из файла .env
env = Env()
env.read_env()

# Получение текущей версии из системы контроля версий Git
VERSION = subprocess.check_output(["git", "describe", "--always"]).strip().decode()

# Получение значения переменной окружения
ALCHEMY_DATABASE_URL = env.str("ALCHEMY_DATABASE_URL", None)

SECRET_KEY = env.str("SECRET_KEY", secrets.token_urlsafe(32))
ALGORITHM = "HS256"
LOG_DIR = env.str("LOG_DIR", "logs")
LOG_LEVEL = env.str("LOG_LEVEL", "INFO")
