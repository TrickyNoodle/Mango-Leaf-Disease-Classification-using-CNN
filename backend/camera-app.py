import cv2
import numpy as np
from ultralytics import YOLO
import tensorflow as tf

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


def process_frame(img):
    try:
        results = leaf_checker(img)

        boxes = results[0].boxes

        if boxes is None or len(boxes) == 0:
            cv2.putText(img, "No Leaf Detected", (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            return img

        coords = boxes.xyxy.cpu().numpy()

        for box in coords:
            x1, y1, x2, y2 = map(int, box)

            crop = img[y1:y2, x1:x2]

            if crop.size == 0:
                continue

            input_tensor = preprocess_crop(crop)
            pred = cnn_model.predict(input_tensor, verbose=0)

            label = class_names[np.argmax(pred)]
            confidence = float(np.max(pred))

            # Draw bounding box
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # Put label
            cv2.putText(
                img,
                f"{label} {confidence:.2f}",
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 255, 0),
                2
            )

        return img

    except Exception as e:
        cv2.putText(img, f"Error: {str(e)}", (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
        return img


def camera_app():
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Cannot access camera")
        return

    print("Press 'q' to quit")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to read frame")
            break

        output_frame = process_frame(frame)

        cv2.imshow("Leaf Disease Detection", output_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    camera_app()