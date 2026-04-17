import os

os.environ['TF_ENABLE_ONEDNN_OPTS']=str(0)

from scripts.python.predict_image_from_base64 import predict_image
from flask import Flask, request, jsonify
from PIL import Image
import tensorflow as tf
from flask_cors import CORS,cross_origin
from scripts.python.predict_yolo import alt_predict

app = Flask(__name__)

CORS(app,send_wildcard=True)

model = tf.keras.models.load_model("models/densenet169/densenet169_dataset1.keras")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    img_base64 = data.get("image")
    prediction=predict_image(img_base64,model)
    return prediction

@app.route("/",methods=['GET'])
def server_status():
    return jsonify({'Status':'Up & Running'}),200

@app.route("/alt-predict",methods=["POST"])
def yolo_predict():
    data=request.get_json()
    img_base64=data.get("image")
    if(img_base64.__contains__("data")):
        img_base64=img_base64[img_base64.find(',')+1:img_base64.__len__()]
    prediction=alt_predict(img_base64)
    return prediction

if __name__ == '__main__':
    app.run(host='0.0.0.0')