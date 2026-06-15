from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import numpy as np
import cv2
import io
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("best.pt")

class_colors = {
    "circular pipe"    : (0, 0, 255),
    "rectangular pipe" : (0, 165, 255),
    "c"                : (255, 0, 255),
    "no hole pipe"     : (255, 0, 0)
}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    pil_img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

    results = model.predict(source=img, conf=0.25)
    r = results[0]

    class_counts = {}
    for cls in r.boxes.cls:
        name = model.names[int(cls)]
        class_counts[name] = class_counts.get(name, 0) + 1

    total = len(r.boxes)

    confs = r.boxes.conf.tolist()
    avg_confidence = round(sum(confs) / len(confs) * 100) if confs else 0

    for box, cls in zip(r.boxes.xyxy, r.boxes.cls):
        x1, y1, x2, y2 = map(int, box)
        class_name = model.names[int(cls)]
        color = class_colors.get(class_name, (255, 255, 255))
        cv2.rectangle(img, (x1, y1), (x2, y2), color=color, thickness=2)

    _, buffer = cv2.imencode(".jpg", img)
    img_b64 = base64.b64encode(buffer).decode("utf-8")

    return {
        "total": total,
        "counts": class_counts,
        "confidence": avg_confidence,
        "image_base64": img_b64
    }