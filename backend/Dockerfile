# FROM python:3.13-slim-bookworm

# # Install pip requirements
# COPY ./requirements.txt /tmp/

# RUN apt clean && apt update && apt install -y git && apt install -y gcc
# RUN python -m pip install -r /tmp/requirements.txt

# RUN pip install pipenv && cd /tmp && pipenv lock && pipenv install --system

# WORKDIR /app

# # Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
# RUN useradd -d /home/appuser -m -k /etc/skel appuser
# RUN chown -R appuser /code
# USER appuser

# # COPY ./app /code/app

# EXPOSE 8000

# # During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# CMD ["uvicorn", "api.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]


FROM python:3.13-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN mkdir -p /app/files && chown -R 1000:1000 /app/files
COPY . .
EXPOSE 8000
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]