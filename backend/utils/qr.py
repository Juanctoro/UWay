import qrcode
import uuid
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

def generate_qr_url(trip_id: int) -> str:
    # Generar Token de verificación
    token = str(uuid.uuid4())
    qr_data = {
        "trip_id": trip_id,
        "token": token
    }

    # Opcion para sincronizar con el frontend:
    # url = f"{settings.FRONTEND_URL}/trip/validate/{trip_id}?token={token}"
    url = f"/trip/validate/{trip_id}?token={token}"

    # Generar QR como imagen
    img = qrcode.make(url)
    path = f"Uway/files/qr_codes/trip_{trip_id}.png"
    buffer = ContentFile(b"")
    img.save(buffer)
    buffer.seek(0)
    default_storage.save(path, buffer)

    return default_storage.url(path)