from ultralytics import YOLO
import tensorflow as tf
import cv2
import numpy as np
import base64

leaf_checker = YOLO('models/yolo/yolo11x_leaf.pt')
cnn_model = tf.keras.models.load_model("models/densenet169/densenet169_dataset1.keras")

class_names = [
    'Anthracnose',
    'Bacterial Canker',
    'Cutting Weevil',
    'Die Back',
    'Gall Midge',
    'Healthy',
    'Powdery Mildew',
    'Sooty Mould'
]


def preprocess_crop(img):
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img


def base64_to_image(base64_string):
    img_data = base64.b64decode(base64_string)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)


def image_to_base64(img):
    _, buffer = cv2.imencode('.jpg', img)
    return base64.b64encode(buffer).decode('utf-8')


def alt_predict(base64_img):
    try:
        img = base64_to_image(base64_img)

        results = leaf_checker(img)

        boxes = results[0].boxes

        if boxes is None or len(boxes) == 0:
            return {"error": "No Leaf Detected"}

        coords = boxes.xyxy.cpu().numpy()

        predictions = []

        for box in coords:
            x1, y1, x2, y2 = map(int, box)

            crop = img[y1:y2, x1:x2]

            if crop.size == 0:
                continue

            input_tensor = preprocess_crop(crop)
            pred = cnn_model.predict(input_tensor, verbose=0)

            label = class_names[np.argmax(pred)]
            confidence = float(np.max(pred))

            predictions.append({
                "label": label,
                "confidence": confidence
            })

            # draw box
            cv2.rectangle(img,(x1,y1),(x2,y2),(0, 255, 0) if label == "Healthy" else (0, 0, 255),8)

            cv2.putText(
            img,
            f"{len(predictions)}",
            (x1, y1 + 150),
            cv2.FONT_HERSHEY_SIMPLEX,
            6,
            (255, 0,0),
            12
            )
        result_image = image_to_base64(img)
        if(len(predictions)!=0):
            return {
                "predictions": predictions,
                "image": result_image
            }
        else:
            return {
                "error":"No Leaf Detected"
            }
    except Exception as e:
        print(e)
        return {"error":"An Unexpected Error Occured"}