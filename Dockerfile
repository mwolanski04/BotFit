FROM python:3.11

RUN apt-get update && apt-get install -y curl gnupg2 apt-transport-https

RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft.gpg

RUN echo "deb [arch=arm64 signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/debian/12/prod bookworm main" > /etc/apt/sources.list.d/mssql-release.list

RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql18 unixodbc-dev

RUN pip install flask flask-cors pyodbc bcrypt

WORKDIR /app
COPY src/ .

CMD ["python", "DataBase.py"]