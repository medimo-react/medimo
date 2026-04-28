import { useOcrStore } from '../../../../../Desktop/src/store/ocrStore.js';

const AlSummary = () => {
  const ocrText = useOcrStore((s) => s.ocrText);

  return (
    <div>
      {ocrText ? (
        <>
          {/* 인식된 처방전 텍스트 */}
          <pre>{ocrText}</pre>
        </>
      ) : (
        <div>
          <p>스캔된 처방전이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default AlSummary;
