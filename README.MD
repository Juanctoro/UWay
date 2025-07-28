# UWay

Este repositorio contiene la aplicación **UWay**, compuesta por un backend en Django y un frontend en React.

## Requisitos previos

* Python 3.x
* Node.js y npm

---

## Backend

1. Navega a la carpeta `backend/`:

   ```bash
   cd backend/
   ```
2. Crea un entorno virtual:

   ```bash
   python3 -m venv env
   ```
3. Activa el entorno virtual:

   * **Linux/macOS**:

     ```bash
     source env/bin/activate
     ```
   * **Windows (PowerShell)**:

     ```powershell
     .\env\Scripts\Activate.ps1
     ```
   * **Windows (CMD)**:

     ```cmd
     .\env\Scripts\activate.bat
     ```
4. Instala las dependencias:

   ```bash
   pip install -r requirements.txt
   ```
5. Ejecuta el servidor de desarrollo de Django:

   ```bash
   python manage.py runserver
   ```
6. Para crar una app como por ejempĺo los usuarios
   ```bash
   python manage.py startapp users
   ```
> El backend se ejecutará localmente hasta que integremos el despliegue con Docker.

---

## Frontend

1. Navega a la carpeta `frontend/`:

   ```bash
   cd frontend/
   ```
2. Instala las dependencias con npm:

   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

> Al igual que el backend, el frontend se ejecuta localmente hasta configurar Docker para el despliegue.

## frontend-mobile

1. Usar la rama vn

2. Navegar a frontend-mobile

3. Instalar los requisitos: 

 ```
   npm install
   npm install expo
   ```
4. Ejecutar:
 ```
  npx expo start
   ```

