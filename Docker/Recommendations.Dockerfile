FROM python:3.10-slim

ENV PYTHONPATH = /

WORKDIR /xplored

COPY ./.env .

WORKDIR /xplored/microservices/recommendations

COPY microservices/recommendations .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 3007

CMD ["python", "recommendationApp.py"]