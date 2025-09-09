import base64,io,numpy as np
from PIL import Image
from flask import jsonify
def preprocess_image(image, target_size=(224, 224)):
    image = image.resize(target_size)
    image = np.array(image) / 255.0 
    image = np.expand_dims(image, axis=0)
    return image

def predict_image(img_base64,model):
    if(img_base64.__contains__("data")):
        img_base64=img_base64[img_base64.find(',')+1:img_base64.__len__()]
    try:
        img_bytes = base64.b64decode(img_base64)
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")

        processed_img = preprocess_image(img)
        prediction = model.predict(processed_img)
        
        
        predicted_class = int(np.argmax(prediction[0]))
        confidence = float(np.max(prediction[0]))
        
        className='None'
        match predicted_class:
            case 0:
                className='Anthracnose'
            case 1:
                className='Bacterial Canker'
            case 2:
                className='Cutting Weevil'
            case 3:
                className='Die Back'
            case 4:
                className='Gall Midge'
            case 5:
                className='Healthy'
            case 6:
                className='Powdery Mildew'
            case 7:
                className='Sooty Mould'

        return jsonify({
            "class": predicted_class,
            "confidence": confidence,
            "className": className,
        })
    except Exception as e:
        return jsonify({"error": str(e)})
