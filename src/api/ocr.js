import axios from 'axios';

const VISION_API_KEY = import.meta.env.VITE_GOOGLE_VISION_API_KEY;
const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`;

const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

export const scanImageOcr = async (file) => {
  try {
    const base64 = await fileToBase64(file);

    const response = await axios.post(
        VISION_API_URL,
        {
          requests: [
            {
              image: { content: base64 },
              features: [{ type: "TEXT_DETECTION" }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );

    return response.data.responses[0]?.fullTextAnnotation?.text ?? "";
  } catch (error) {
    console.error("OCR 요청 실패:", error);
    throw error;
  }
};