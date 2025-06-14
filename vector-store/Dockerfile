FROM python:3.12.2

WORKDIR /app

COPY requirements.txt ./

RUN pip install torch==2.3.1+cpu  -f https://download.pytorch.org/whl/torch_stable.html

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app"]
