import os
from tensorflow.keras.models import load_model
from predict_image import predict_image

datasetpath='./datasets/dataset2'
modelpath='./models/densenet121_dataset1-5.keras'
img_size=(224,224)

classes=os.listdir(datasetpath)
model=load_model(modelpath)

correct=0
incorrect=0

correct_clases={}
for c in classes:
    correct_clases[c]=0

def print_correct():
    for c in classes:
        print(c+" : "+str(correct_clases.get(c)))

if __name__=='__main__':
    for c in classes:
        images=os.listdir(datasetpath+'/'+c)
        for image in images:
            response=class_index=predict_image(datasetpath+'/'+c+'/'+image,img_size,model)
            if response == c:
                correct+=1
                correct_clases[c]=correct_clases.get(c)+1
            else:
                incorrect+=1
            print("Incorrect: "+str(incorrect)+" | Correct: "+str(correct)+" | Response: "+response+" | Current Class: "+c)
            print_correct()
    print("\n \n==========================================") 
    print("Incorrect: "+str(incorrect))
    print("Correct: "+str(correct))
    print_correct()
    print("==========================================") 
