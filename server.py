"""
Local inference server for pipe detection.
Place this file next to best.pt and run:
    pip install fastapi uvicorn ultralytics pillow python-multipart
    python server.py
"""

import base64, io
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from ultralytics.utils.plotting import colors as yolo_colors
from PIL import Image
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("best.pt")


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    img = Image.open(io.BytesIO(await file.read())).convert("RGB")

    results = model(img)[0]
    boxes = results.boxes

    counts: dict[str, int] = {}
    confidences: list[float] = []

    for cls_id, conf in zip(boxes.cls.tolist(), boxes.conf.tolist()):
        name = model.names[int(cls_id)]
        counts[name] = counts.get(name, 0) + 1
        confidences.append(conf)

    total = int(boxes.shape[0])
    avg_conf = round(float(np.mean(confidences)) * 100) if confidences else 0

    # render annotated image
    annotated = Image.fromarray(results.plot(labels=False, conf=False))
    buf = io.BytesIO()
    annotated.save(buf, format="JPEG", quality=90)
    image_b64 = base64.b64encode(buf.getvalue()).decode()

    class_colors = {
        model.names[i]: "#{:02x}{:02x}{:02x}".format(*yolo_colors(i, bgr=False))
        for i in model.names
    }

    return {"total": total, "counts": counts, "confidence": avg_conf, "image_base64": image_b64, "colors": class_colors}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
