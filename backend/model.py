import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models

IMG_SIZE = (224, 224)
BATCH_SIZE = 16

datagen = ImageDataGenerator(validation_split=0.2, rescale=1./255)

train_data = datagen.flow_from_directory(
    "ASL_dataset",
    target_size=IMG_SIZE,
    subset="training",
    batch_size=BATCH_SIZE
)

val_data = datagen.flow_from_directory(
    "ASL_dataset",
    target_size=IMG_SIZE,
    subset="validation",
    batch_size=BATCH_SIZE
)

model = models.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=IMG_SIZE+(3,)),
    layers.MaxPooling2D(2,2),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D(2,2),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(len(train_data.class_indices), activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(train_data, validation_data=val_data, epochs=20)
model.save("sign_word_model.h5")





# import tensorflow as tf
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from tensorflow.keras.applications import MobileNetV2
# from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
# from tensorflow.keras.models import Model
# from tensorflow.keras.optimizers import Adam

# # ---------------------- Settings ---------------------- #
# data_dir = "ASL_dataset"  # Path to your folder
# img_size = (224, 224)
# batch_size = 8  # smaller batch for fewer images
# epochs = 10     # fewer epochs (small dataset)

# # ---------------------- Data Loading ---------------------- #
# datagen = ImageDataGenerator(rescale=1./255)

# train_gen = datagen.flow_from_directory(
#     data_dir,
#     target_size=img_size,
#     batch_size=batch_size,
#     color_mode='grayscale',
#     class_mode='categorical',
#     shuffle=True
# )

# # ---------------------- Model ---------------------- #
# base_model = MobileNetV2(weights=None, include_top=False, input_shape=(224, 224, 1))

# x = GlobalAveragePooling2D()(base_model.output)
# x = Dropout(0.3)(x)
# outputs = Dense(len(train_gen.class_indices), activation='softmax')(x)

# model = Model(inputs=base_model.input, outputs=outputs)
# model.compile(optimizer=Adam(1e-4), loss='categorical_crossentropy', metrics=['accuracy'])

# # ---------------------- Train ---------------------- #
# history = model.fit(train_gen, epochs=epochs)

# # ---------------------- Save ---------------------- #
# model.save("asl_skeleton_model.h5")
# print("✅ Model trained and saved as asl_skeleton_model.h5")



# import tensorflow as tf
# from tensorflow.keras.preprocessing.image import ImageDataGenerator
# from tensorflow.keras.applications import MobileNetV2
# from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
# from tensorflow.keras.models import Model
# from tensorflow.keras.optimizers import Adam

# # ---------------------- Settings ---------------------- #
# data_dir = "ASL_dataset"  # Path to your folder
# img_size = (224, 224)
# batch_size = 16
# epochs = 15

# # ---------------------- Data Loading ---------------------- #
# datagen = ImageDataGenerator(
#     rescale=1./255,
#     validation_split=0.2,
#     rotation_range=10,
#     zoom_range=0.1,
#     horizontal_flip=False
# )

# train_gen = datagen.flow_from_directory(
#     data_dir,
#     target_size=img_size,
#     batch_size=batch_size,
#     subset='training',
#     color_mode='grayscale',
#     class_mode='categorical'
# )

# val_gen = datagen.flow_from_directory(
#     data_dir,
#     target_size=img_size,
#     batch_size=batch_size,
#     subset='validation',
#     color_mode='grayscale',
#     class_mode='categorical'
# )

# # ---------------------- Model ---------------------- #
# base_model = MobileNetV2(weights=None, include_top=False, input_shape=(224, 224, 1))

# x = GlobalAveragePooling2D()(base_model.output)
# x = Dropout(0.3)(x)
# outputs = Dense(len(train_gen.class_indices), activation='softmax')(x)

# model = Model(inputs=base_model.input, outputs=outputs)
# model.compile(optimizer=Adam(1e-4), loss='categorical_crossentropy', metrics=['accuracy'])

# # ---------------------- Train ---------------------- #
# history = model.fit(
#     train_gen,
#     validation_data=val_gen,
#     epochs=epochs
# )

# # ---------------------- Save ---------------------- #
# model.save("asl_skeleton_model.h5")
# print("✅ Model saved as asl_skeleton_model.h5")
