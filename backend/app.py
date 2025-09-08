from scripts.python.predict_image_from_base64 import predict_image
from flask import Flask, request, jsonify
from PIL import Image
import tensorflow as tf
from flask_cors import CORS,cross_origin

app = Flask(__name__)

CORS(app,send_wildcard=True)

model = tf.keras.models.load_model("models/densenet121/densenet121_dataset1-5.keras")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    img_base64 = data.get("image")
    prediction=predict_image(img_base64,model)
    return prediction

@app.route("/",methods=['GET'])
def server_status():
    return jsonify({'Status':'200 OK'}),200
