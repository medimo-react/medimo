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
  const base64 = await fileToBase64(file);

  const response = await fetch(VISION_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      requests: [
        {
          image: { content: base64 },
          features: [{ type: "TEXT_DETECTION" }],
        },
      ],
    }),
  });

  if (!response.ok) throw new Error("Vision API 요청 실패");

  const data = await response.json();
  return data.responses[0]?.fullTextAnnotation?.text ?? "";
};
