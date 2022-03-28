FROM python:3.10-slim

ENV PYTHONPATH = /

WORKDIR /xplored

COPY ./.env .

WORKDIR /xplored/microservices/accommodations

COPY microservices/accommodations .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3003

CMD ["python", "accommApp.py"]