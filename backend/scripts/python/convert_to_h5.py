import tensorflow as tf

# Load your DenseNet model from .keras format
original_model = tf.keras.models.load_model("/home/sagar/Desktop/Mango-Leaf-Disease-Classification-using-CNN/models/densenet121/densenet121_dataset1-5.keras")

# Rebuild with explicit Input shape
inputs = tf.keras.Input(shape=(224, 224, 3))
x = original_model(inputs)   # forward pass through your model
model = tf.keras.Model(inputs, x)

# Save as HDF5 (.h5) for TensorFlow.js converter
model.save("densenet121_dataset1-5.h5", save_format="h5")

print("✅ Model rebuilt with explicit input shape and saved as HDF5.")
