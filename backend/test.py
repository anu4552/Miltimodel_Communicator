import tensorflow as tf
import numpy as np
import cv2
import os

# Load model
model = tf.keras.models.load_model("sign_word_model.h5")

# Map indices to class names
data_dir = "ASL_dataset"
class_names = sorted(os.listdir(data_dir))
print("Classes:", class_names)

# Path to test image
test_img_path = "ASL_dataset/GOOD MORNIMG!/GOOD MORNIMG!_9.jpg"  # change path to any sample image

# Preprocess image
img = cv2.imread(test_img_path)
img = cv2.resize(img, (224, 224))
img = img / 255.0
img = np.expand_dims(img, axis=0)

# Predict
pred = model.predict(img)
predicted_class = class_names[np.argmax(pred)]
confidence = np.max(pred)

print(f"✅ Predicted: {predicted_class} ({confidence*100:.2f}% confidence)")
