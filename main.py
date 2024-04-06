import src.main
from data.config import LOG_LEVEL

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(src.main.app, host="127.0.0.1", port=8080, log_level=LOG_LEVEL.lower())
