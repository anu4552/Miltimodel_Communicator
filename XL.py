import pandas as pd
import random

# Load existing dataset
df = pd.read_excel("final_health_progress_dataset.xlsx")

# Disorders mapped to their symptoms
disorder_symptoms = {
    "Epilepsy": "Seizures, temporary confusion, loss of consciousness, muscle stiffness, and unusual sensations.",
    "Autism Spectrum Disorder": "Difficulty in social interaction, delayed speech, repetitive behaviors, limited eye contact, and sensory sensitivity.",
    "Arthritis": "Joint pain, stiffness, swelling, reduced range of motion, fatigue, and redness around joints.",
    "Blindness": "Loss of vision, blurred vision, difficulty recognizing faces, sensitivity to light, and trouble seeing at night.",
    "Depression": "Low mood, loss of interest, fatigue, changes in sleep or appetite, and feelings of hopelessness.",
    "Diabetes": "Frequent urination, excessive thirst, fatigue, blurred vision, and slow wound healing.",
    "Down Syndrome": "Distinct facial features, learning delays, low muscle tone, and developmental delay.",
    "OCD": "Repetitive thoughts, compulsive behaviors, fear of contamination, and checking rituals.",
    "Dementia": "Memory loss, confusion, difficulty reasoning, personality changes, and trouble completing tasks.",
    "Aphasia": "Difficulty speaking, understanding speech, problems reading or writing, and mixing up words."
}

disorders = list(disorder_symptoms.keys())

# Generate 100 new samples
new_data = []
for _ in range(500):
    age = random.randint(5, 60)
    gender = random.choice(["Male", "Female"])
    disorder = random.choice(disorders)
    common_symptoms = disorder_symptoms[disorder]
    social_duration = random.randint(1, 24)
    mental_scale = random.randint(1, 10)
    mood = random.randint(1, 10)
    symptoms = random.choice([0, 1])
    progress = (mental_scale + mood + social_duration/10 + random.uniform(-3, 3)) / 20
    progress = max(0, min(1, progress))  # keep within 0–1 range

   
    
    new_data.append([
        age, gender, disorder, social_duration, mental_scale,
        mood, symptoms, progress, common_symptoms
    ])

# Convert new rows to DataFrame
df_new = pd.DataFrame(new_data, columns=df.columns)

# Append to the old dataset
df = pd.concat([df, df_new], ignore_index=True)

# Save back to Excel
df.to_excel("final_health_progress_dataset.xlsx", index=False)
print(f"✅ Dataset extended successfully! New total rows: {len(df)}")



# import pandas as pd
# import random

# # 🔹 Disorders mapped to their symptoms
# disorder_symptoms = {
#     "Epilepsy": "Seizures, temporary confusion, loss of consciousness, muscle stiffness, and unusual sensations.",
#     "Autism Spectrum Disorder": "Difficulty in social interaction, delayed speech, repetitive behaviors, limited eye contact, and sensory sensitivity.",
#     "Arthritis": "Joint pain, stiffness, swelling, reduced range of motion, fatigue, and redness around joints.",
#     "Blindness": "Loss of vision, blurred vision, difficulty recognizing faces, sensitivity to light, and trouble seeing at night.",
#     "Depression": "Low mood, loss of interest, fatigue, changes in sleep or appetite, and feelings of hopelessness.",
#     "Diabetes": "Frequent urination, excessive thirst, fatigue, blurred vision, and slow wound healing.",
#     "Down Syndrome": "Distinct facial features, learning delays, low muscle tone, and developmental delay.",
#     "OCD": "Repetitive thoughts, compulsive behaviors, fear of contamination, and checking rituals.",
#     "Dementia": "Memory loss, confusion, difficulty reasoning, personality changes, and trouble completing tasks.",
#     "Aphasia": "Difficulty speaking, understanding speech, problems reading or writing, and mixing up words."
# }

# disorders = list(disorder_symptoms.keys())

# # 🔹 Create synthetic samples
# data = []
# for _ in range(500):
#     age = random.randint(18, 70)
#     gender = random.choice(["Male", "Female"])
#     disorder = random.choice(disorders)
#     common_symptoms = disorder_symptoms[disorder]
    
#     social_duration = random.randint(0, 60)
#     mental_scale = random.randint(1, 10)
#     mood = random.randint(1, 10)
#     symptoms = random.choice([0, 1])
    
#     # Basic rule to simulate progress (1 = good, 0 = poor)
#     progress = 1 if (mental_scale + mood + social_duration/10) > 10 else 0
    
#     data.append([
#         age, gender, disorder, social_duration, mental_scale,
#         mood, symptoms, progress, common_symptoms
#     ])

# # 🔹 Create DataFrame
# df = pd.DataFrame(data, columns=[
#     "age", "gender", "disorder", "social_duration",
#     "mental_scale", "mood", "symptoms", "progress", "common_symptoms"
# ])

# # 🔹 Save to Excel
# df.to_excel("final_health_progress_dataset.xlsx", index=False)
# print("✅ Dataset created successfully: 'final_health_progress_dataset.xlsx'")
