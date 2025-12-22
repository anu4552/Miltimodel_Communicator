import cv2
import mediapipe as mp
import numpy as np
import tensorflow as tf
import os
from collections import deque

# ---------------------- Settings ---------------------- #
MODEL_PATH = "sign_word_model.h5"
DATASET_DIR = "ASL_dataset"   # same folder used during training
IMG_SIZE = (224, 224)
ROI = (100, 100, 400, 400)    # region where hand should appear
SMOOTH_LEN = 8

# ---------------------- Load Model ---------------------- #
model = tf.keras.models.load_model(MODEL_PATH)
class_names = sorted(os.listdir(DATASET_DIR))
print("✅ Classes:", class_names)

# ---------------------- MediaPipe Setup ---------------------- #
mp_hands = mp.solutions.hands
mp_draw = mp.solutions.drawing_utils
mp_style = mp.solutions.drawing_styles

hands = mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=0.7,
    min_tracking_confidence=0.5
)

# ---------------------- Helper Functions ---------------------- #
def get_skeleton_image(frame):
    """Extracts hand skeleton on white background using Mediapipe."""
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb)
    white_bg = np.ones_like(frame) * 255  # white background

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(
                white_bg,
                hand_landmarks,
                mp_hands.HAND_CONNECTIONS,
                mp_style.get_default_hand_landmarks_style(),
                mp_style.get_default_hand_connections_style()
            )
    return white_bg

# ---------------------- Prediction Smoothing ---------------------- #
pred_history = deque(maxlen=SMOOTH_LEN)
current_letter = ""
word = ""
sentence = ""

# ---------------------- Webcam ---------------------- #
cap = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_SIMPLEX

print("🎥 Press 'SPACE' to add current letter to sentence")
print("🎥 Press 'C' to clear sentence, 'Q' to quit")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    x1, y1, x2, y2 = ROI
    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 255, 255), 2)

    roi = frame[y1:y2, x1:x2]
    skeleton = get_skeleton_image(roi)

    # Prepare skeleton for model
    processed = cv2.resize(skeleton, IMG_SIZE)
    processed = processed / 255.0
    processed = np.expand_dims(processed, axis=0)

    # Prediction
    preds = model.predict(processed, verbose=0)
    pred_class = class_names[np.argmax(preds)]
    confidence = np.max(preds)

    pred_history.append(pred_class)
    if len(pred_history) == SMOOTH_LEN:
        current_letter = max(set(pred_history), key=pred_history.count)

    # Combine webcam + skeleton for visualization
    skeleton_disp = cv2.resize(skeleton, (300, 300))
    frame[10:310, frame.shape[1]-310:frame.shape[1]-10] = skeleton_disp

    # GUI Text
    cv2.putText(frame, "Sign Language to Text Converter", (20, 50), font, 1, (255, 255, 255), 2)
    cv2.putText(frame, f"Character : {current_letter}", (30, 420), font, 1, (0, 255, 0), 2)
    cv2.putText(frame, f"Word : {current_letter}", (30, 460), font, 1, (0, 255, 255), 2)
    cv2.putText(frame, f"Sentence : {sentence}", (30, 500), font, 1, (255, 255, 0), 2)

    cv2.imshow("Sign Language to Text Converter", frame)

    # Keyboard controls
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    elif key == ord(' '):   # Add letter to sentence
        sentence += current_letter + " "
    elif key == ord('c'):   # Clear sentence
        sentence = ""

cap.release()
hands.close()
cv2.destroyAllWindows()



# import cv2
# import mediapipe as mp
# import numpy as np
# import tensorflow as tf
# import os
# from collections import deque

# # Load trained model
# model = tf.keras.models.load_model("sign_word_model.h5")
# class_names = sorted(os.listdir("ASL_dataset"))

# # Mediapipe setup
# mp_hands = mp.solutions.hands
# mp_drawing = mp.solutions.drawing_utils

# # For sentence construction
# pred_history = deque(maxlen=10)
# current_word = ""
# sentence = ""

# # Initialize webcam
# cap = cv2.VideoCapture(0)

# # Define capture region (ROI)
# x1, y1, x2, y2 = 100, 100, 324, 324  # adjustable region
# font = cv2.FONT_HERSHEY_SIMPLEX

# with mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7) as hands:
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         frame = cv2.flip(frame, 1)
#         h, w, _ = frame.shape

#         # Draw rectangle (ROI)
#         cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 255, 255), 2)
#         roi = frame[y1:y2, x1:x2]
#         roi_rgb = cv2.cvtColor(roi, cv2.COLOR_BGR2RGB)

#         results = hands.process(roi_rgb)
        
#         if results.multi_hand_landmarks:
#             for hand_landmarks in results.multi_hand_landmarks:
#                 mp_drawing.draw_landmarks(
#                     roi, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            
#             # Preprocess ROI for model prediction
#             img = cv2.resize(roi, (224, 224))
#             img = img / 255.0
#             img = np.expand_dims(img, axis=0)
#             preds = model.predict(img)
#             pred_class = class_names[np.argmax(preds)]
#             confidence = np.max(preds)

#             pred_history.append(pred_class)

#             # Smooth prediction (majority voting)
#             if len(pred_history) == pred_history.maxlen:
#                 most_common = max(set(pred_history), key=pred_history.count)
#                 current_word = most_common

#         # Display text
#         cv2.putText(frame, "Sign Language to Text Converter", (50, 40),
#                     font, 1, (255, 255, 255), 2)

#         cv2.putText(frame, f"Character : {current_word}", (30, 420),
#                     font, 1, (0, 255, 0), 2)

#         cv2.putText(frame, f"Word : {current_word}", (30, 460),
#                     font, 1, (0, 255, 255), 2)

#         cv2.putText(frame, f"Sentence : {sentence}", (30, 500),
#                     font, 1, (255, 255, 0), 2)

#         cv2.imshow("Sign Language to Text Converter", frame)

#         key = cv2.waitKey(1) & 0xFF
#         if key == ord('q'):
#             break
#         elif key == ord(' '):  # Space → add to sentence
#             sentence += current_word + " "
#         elif key == ord('c'):  # Clear
#             sentence = ""

# cap.release()
# cv2.destroyAllWindows()



# import cv2
# import numpy as np
# import tensorflow as tf
# import os

# model = tf.keras.models.load_model("sign_word_model.h5")
# class_names = sorted(os.listdir("ASL_dataset"))

# cap = cv2.VideoCapture(0)
# print("🎥 Press 'q' to quit")

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break

#     img = cv2.resize(frame, (224, 224))
#     img = img / 255.0
#     img = np.expand_dims(img, axis=0)

#     preds = model.predict(img)
#     pred_class = class_names[np.argmax(preds)]
#     confidence = np.max(preds)

#     cv2.putText(frame, f"{pred_class} ({confidence*100:.1f}%)",
#                 (30, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
#     cv2.imshow("Sign Recognition", frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()





# import cv2
# import numpy as np
# import mediapipe as mp
# from tensorflow.keras.models import load_model

# # ---------------- Load trained model ---------------- #
# model = load_model("asl_skeleton_model.h5")

# # Class labels (A–Z)
# classes = {i: chr(65+i) for i in range(26)}

# # ---------------- Mediapipe setup ---------------- #
# mp_hands = mp.solutions.hands
# mp_drawing = mp.solutions.drawing_utils
# hands = mp_hands.Hands(
#     static_image_mode=False,
#     max_num_hands=1,
#     min_detection_confidence=0.6,
#     min_tracking_confidence=0.6
# )

# # ---------------- Webcam setup ---------------- #
# cap = cv2.VideoCapture(0)
# img_size = (224, 224)

# sentence = ""
# prev_letter = ""
# stable_count = 0
# stable_threshold = 8

# print("Press 'space' to add space, 'c' to clear, 'q' to quit")

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break
#     frame = cv2.flip(frame, 1)
#     h, w, _ = frame.shape

#     # Convert for MediaPipe
#     rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     result = hands.process(rgb)

#     # White background skeleton
#     skeleton = np.ones((h, w, 3), dtype=np.uint8) * 255

#     if result.multi_hand_landmarks:
#         for hand_landmarks in result.multi_hand_landmarks:
#             # Draw skeleton with colored style (like dataset)
#             mp_drawing.draw_landmarks(
#                 skeleton,
#                 hand_landmarks,
#                 mp_hands.HAND_CONNECTIONS,
#                 mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2, circle_radius=2),   # Blue joints
#                 mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2)                    # Green lines
#             )

#         # Define region of interest (crop around center)
#         x1, y1, x2, y2 = 100, 50, 500, 450
#         cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)
#         roi = skeleton[y1:y2, x1:x2]

#         # Resize & preprocess for model
#         img = cv2.resize(roi, img_size)
#         img = img / 255.0  # normalize
#         img = np.expand_dims(img, axis=0)

#         # Predict
#         preds = model.predict(img)
#         class_idx = np.argmax(preds)
#         confidence = np.max(preds)
#         letter = classes[class_idx]

#         if confidence > 0.3:  # lowered for testing
#             if letter == prev_letter:
#                 stable_count += 1
#             else:
#                 stable_count = 0
#             prev_letter = letter

#             if stable_count >= stable_threshold:
#                 sentence += letter
#                 stable_count = 0

#         # Display
#         cv2.putText(frame, f"Letter: {letter} ({confidence:.2f})", (10, 50),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255,255,255), 3)
#         cv2.putText(frame, f"Sentence: {sentence}", (10, 450),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,0), 2)

#     # Combine both windows
#     combined = np.hstack((frame, skeleton))
#     cv2.imshow("ASL Test - Left: Real | Right: Colored Skeleton", combined)

#     key = cv2.waitKey(1) & 0xFF
#     if key == ord(' '):
#         sentence += ' '
#     elif key == ord('c'):
#         sentence = ""
#     elif key == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()




# import cv2
# import numpy as np
# import mediapipe as mp
# from tensorflow.keras.models import load_model

# # ---------------- Load trained model ---------------- #
# model = load_model("asl_skeleton_model.h5")

# # Class labels (A–Z)
# classes = {i: chr(65+i) for i in range(26)}

# # ---------------- Mediapipe setup ---------------- #
# mp_hands = mp.solutions.hands
# mp_drawing = mp.solutions.drawing_utils
# hands = mp_hands.Hands(
#     static_image_mode=False,
#     max_num_hands=1,
#     min_detection_confidence=0.6,
#     min_tracking_confidence=0.6
# )

# # ---------------- Webcam setup ---------------- #
# cap = cv2.VideoCapture(0)
# img_size = (224, 224)

# sentence = ""
# prev_letter = ""
# stable_count = 0
# stable_threshold = 10  # frames before adding same letter

# print("Press 'space' to add space, 'c' to clear, 'q' to quit")

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break
#     frame = cv2.flip(frame, 1)
#     h, w, _ = frame.shape

#     # Convert frame for MediaPipe
#     rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     result = hands.process(rgb)

#     # White canvas for skeleton
#     skeleton = np.ones((h, w, 3), dtype=np.uint8) * 255

#     if result.multi_hand_landmarks:
#         for hand_landmarks in result.multi_hand_landmarks:
#             # Draw skeleton on white background
#             mp_drawing.draw_landmarks(
#                 skeleton,
#                 hand_landmarks,
#                 mp_hands.HAND_CONNECTIONS,
#                 mp_drawing.DrawingSpec(color=(0, 0, 0), thickness=2, circle_radius=2),
#                 mp_drawing.DrawingSpec(color=(0, 0, 0), thickness=2)
#             )

#         # Define Region of Interest (ROI)
#         x1, y1, x2, y2 = 100, 50, 500, 450
#         cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)
#         roi = skeleton[y1:y2, x1:x2]

#         # Preprocess for model (grayscale, resize, normalize)
#         img = cv2.resize(roi, img_size)
#         img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         img = img / 255.0
#         img = np.expand_dims(img, axis=(0, -1))

#         # Predict letter
#         preds = model.predict(img)
#         class_idx = np.argmax(preds)
#         confidence = np.max(preds)
#         letter = classes[class_idx]

#         # Stabilize output (avoid flicker)
#         if confidence > 0.8:
#             if letter == prev_letter:
#                 stable_count += 1
#             else:
#                 stable_count = 0
#             prev_letter = letter

#             if stable_count >= stable_threshold:
#                 sentence += letter
#                 stable_count = 0

#         # Display results
#         cv2.putText(frame, f"Letter: {letter} ({confidence:.2f})", (10, 50),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1.5, (255,255,255), 3)
#         cv2.putText(frame, f"Sentence: {sentence}", (10, 450),
#                     cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,0), 2)

#     # Combine original & skeleton views side by side
#     combined = np.hstack((frame, skeleton))
#     cv2.imshow("ASL Test - Left: Real | Right: Skeleton", combined)

#     key = cv2.waitKey(1) & 0xFF
#     if key == ord(' '):
#         sentence += ' '
#     elif key == ord('c'):
#         sentence = ""
#     elif key == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()



# import cv2
# import numpy as np
# from tensorflow import keras

# # Load the trained model
# model = keras.models.load_model("asl_skeleton_model.h5")

# # Get class names (you can manually list them if you know them)
# # Example: if your training folders were A, B, C, ...
# class_names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
#                 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
#                 'U', 'V', 'W', 'X', 'Y', 'Z']

# # Initialize webcam
# cap = cv2.VideoCapture(0)

# print("🎥 Starting webcam... Press 'q' to quit.")

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         break

#     # Convert to grayscale (since model was trained on grayscale)
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
#     # Resize to match model input size
#     img = cv2.resize(gray, (224, 224))
#     img = img / 255.0
#     img = np.expand_dims(img, axis=(0, -1))  # shape: (1, 224, 224, 1)

#     # Predict
#     pred = model.predict(img, verbose=0)
#     class_idx = np.argmax(pred)
#     confidence = np.max(pred)

#     # Display prediction on the frame
#     text = f"{class_names[class_idx]} ({confidence*100:.1f}%)"
#     cv2.putText(frame, text, (30, 50), cv2.FONT_HERSHEY_SIMPLEX, 
#                 1, (0, 255, 0), 2, cv2.LINE_AA)

#     cv2.imshow("ASL Real-Time Detection", frame)

#     # Press 'q' to exit
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()
# print("✅ Webcam closed.")
