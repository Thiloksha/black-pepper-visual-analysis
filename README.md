# Black Pepper Variety Identification Component

## 1. Component Scope

The primary scope of this research component is to automate the morphological identification of Sri Lankan black pepper varieties using leaf imagery. Traditional identification requires expert taxonomic knowledge, which is often inaccessible to average farmers. This component leverages Computer Vision (CV) and Deep Learning (DL) to bridge that gap.

The system specifically identifies three indigenous Sri Lankan varieties:

- **Butawerala**
- **Dingirala**
- **Kohukuburerala**

By accurately identifying these varieties, the system aids researchers and cultivators in making informed decisions regarding crop management and breeding programs.

## 2. Functionality

The application provides a comprehensive end-to-end workflow for variety identification:

1.  **Image Acquisition (Frontend)**:
    - Users can capture live leaf images via the camera or select existing images from the gallery.
    - The app includes a "Smart Scan" UI with visual guides to ensure optimal leaf positioning.
2.  **API Communication**:
    - The image is sent asynchronously to a Python-based backend via a REST API endpoint (`/predict`).
3.  **AI Inference**:
    - The backend processes the image using a trained Deep Learning model (EfficientNetB0/MobileNetV2).
    - It returns the predicted variety and a confidence score (probability percentage).
4.  **Result Visualization & History**:
    - **Immediate Feedback**: The app displays the identified variety along with confidence metrics.
    - **Local History**: Scan results are automatically saved locally using `AsyncStorage`, allowing users to review previous scans offline.
5.  **Bilingual Support**:
    - To support local farmers in Sri Lanka, the application features full localization in **English** and **Sinhala**.
6.  **Knowledge Hub**:
    - A dedicated "Varieties" section provides agronomic details, parentage, and quality attributes for each specific pepper variety.

## 3. Used AI/ML Models

To ensure high accuracy, a comparative study was conducted using four distinct architectures. The models were trained on a dataset split of 80% training and 20% testing.

### A. Custom Architectures

1.  **Basic CNN**: A baseline architecture with 2 Convolutional blocks and Max Pooling.
2.  **Improved CNN**: An enhanced custom model featuring 3 Convolutional blocks and Dropout (0.3) for better generalization.

### B. Transfer Learning Models (Pre-trained)

3.  **MobileNetV2**: Optimized for mobile inference with lightweight depth-wise separable convolutions.
4.  **EfficientNetB0**: Selected as the primary candidate for deployment due to its superior feature extraction capabilities and balance between accuracy and computational efficiency.

## 4. Technology Stack

### Frontend (Mobile Application)

- **Framework**: React Native (via **Expo SDK 52**)
- **Language**: TypeScript
- **Navigation**: Expo Router (File-based routing)
- **Key Libraries**:
  - `expo-image-picker`: For camera and gallery access.
  - `@react-native-async-storage/async-storage`: For persisting scan history locally.
  - `react-native-safe-area-context`: For UI adaptability across different devices.
  - `Context API`: For global state management (Language & Theme).

### Backend (Inference Engine)

- **Framework**: Python (Flask)
- **ML Engine**: TensorFlow / Keras
- **Architecture**: REST API
- **Responsibilities**:
  - Preprocessing incoming images (Resizing to 224x224, Normalization).
  - Loading the trained `.h5` model.
  - Serving JSON responses containing predictions and confidence scores.

## 5. Installation & Setup

### Prerequisites

- Node.js & npm
- Python 3.9+
- Expo Go app (for testing on mobile)

### Running the Frontend

```bash
cd frontend
npm install
npx expo start
```


## Screenshots
| Scan Screen | Result Screen | History Screen | Profile Screen | 
|:---:|:---:|:---:|:---:|
| ![Scan](/screenshots/home.jpeg) | ![Result](/screenshots/result.jpeg) | ![History](/screenshots/history.jpeg) | ![Profile](/screenshots/profile.jpeg) |