import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.utils.class_weight import compute_class_weight

# --- PARAMETERS ---
dataset = 'dataset3'
img_size = (512,512)
batch_size = 32
epochs = 20
model_name = 'densenet121_dataset3.keras'

# --- DATA AUGMENTATION ---
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=15,
    zoom_range=0.1,
    horizontal_flip=True,
    shear_range=0.1,
    brightness_range=[0.8, 1.2]
)

train_gen = train_datagen.flow_from_directory(
    directory=dataset,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training',
    shuffle=True
)

val_gen = train_datagen.flow_from_directory(
    directory=dataset,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation',
    shuffle=False
)

# --- CLASS WEIGHTS ---
class_counts = train_gen.classes
class_weights = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(class_counts),
    y=class_counts
)
class_weight_dict = dict(enumerate(class_weights))

# --- MODEL ---
base_model = DenseNet121(include_top=False, weights='imagenet', input_shape=(512, 512, 3))
base_model.trainable = False

inputs = Input(shape=(img_size[0], img_size[1], 3))
x = base_model(inputs, training=False)
x = GlobalAveragePooling2D()(x)
x = Dropout(0.4)(x) 
outputs = Dense(train_gen.num_classes, activation='softmax')(x)

model = Model(inputs, outputs)
model.compile(optimizer=Adam(learning_rate=1e-4),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.summary()

# --- CALLBACK ---
early_stop = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

# --- TRAIN ---
history = model.fit(
    train_gen,
    validation_data=val_gen,
    epochs=epochs,
    class_weight=class_weight_dict,
    callbacks=[early_stop]
)

# --- SAVE MODEL ---
model.save(model_name)
