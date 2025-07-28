FROM python:3.12-slim

# Evita archivos .pyc y asegura salida sin buffering
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instala solo el binario de GDAL en tiempo de ejecución (ligero)
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gdal-bin \
    && rm -rf /var/lib/apt/lists/*

# Establece la ruta de la librería GDAL si fuese necesario
ENV GDAL_LIBRARY_PATH=/usr/lib/libgdal.so

WORKDIR /app

# Copia e instala las dependencias Python
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo el código de la aplicación
COPY . .

# Expone el puerto de Django
EXPOSE 8000

# Comando por defecto para migrar y levantar el servidor
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
