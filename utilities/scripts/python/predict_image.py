import cv2
import numpy as np
from tensorflow.keras.models import load_model
import sys

def predict_image(image_path,img_size,model):
    img=cv2.imread(image_path)
    img=cv2.resize(img,img_size)
    img=img.astype('float32')/255.0
    img=np.expand_dims(img,axis=0)
    prediction=model.predict(img)
    class_index=np.argmax(prediction)
    match class_index:
        case 0:
            return 'Anthracnose'
        case 1:
            return 'Bacterial Canker'
        case 2:
            return 'Cutting Weevil'
        case 3:
            return 'Die Back'
        case 4:
            return 'Gall Midge'
        case 5:
            return 'Healthy'
        case 6:
            return 'Powdery Mildew'
        case 7:
            return 'Sooty Mould'

if __name__ == '__main__':
    if len(sys.argv)>1:
        print(predict_image(sys.argv[1]),sys.argv[2],sys.argv[3])
    else:
        model=load_model(input('Path to The Model: '))
        img_size=eval(input('Image Size: '))
        while True:
            image_path=input("Simply paste the image's path here: ")
            if image_path.startswith("'") and image_path.endswith("'"):
                image_path=image_path[1:-1]
            print(predict_image(image_path,img_size,model))