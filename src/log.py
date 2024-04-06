from loguru import logger
import logging


class InterceptHandler(logging.Handler):
    def emit(self, record):
        # Получаем уровень логирования, эквивалентный для loguru
        level = logger.level(record.levelname).name

        # Перенаправляем сообщение в loguru
        logger.log(level, record.getMessage())


logger.add(
    "src.log",
    rotation="10 MB",
    compression="zip",
    retention="10 days",
    format="{time:YYYY-MM-DD at HH:mm:ss} | {level} | {message}",
    level="DEBUG",
)

# решение всех проблем
# https://habr.com/ru/articles/575454/
