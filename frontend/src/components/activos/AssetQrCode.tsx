import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

import type { AssetRecord } from '../../types/activos';

interface AssetQrCodeProps {
  asset: AssetRecord;
  size?: number;
}

const buildQrPayload = (asset: AssetRecord): string => {
  return JSON.stringify({
    codigoActivo: asset.codigo,
    numeroInventarioContable: asset.numeroInventarioContable,
    categoria: asset.categoria,
    fabricante: asset.fabricante,
    marca: asset.marca,
    numeroSerie: asset.serie,
    detalle: asset.detalle,
  });
};

const AssetQrCode = ({ asset, size = 82 }: AssetQrCodeProps) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [qrError, setQrError] = useState<string | null>(null);
  const payload = buildQrPayload(asset);

  useEffect(() => {
    let cancelled = false;
    setQrCode('');
    setQrError(null);

    const generateQr = async () => {
      try {
        const result = await QRCode.toDataURL(payload, {
          margin: 1,
          width: size,
          color: {
            dark: '#1f2937',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'M',
        });

        if (!cancelled) {
          setQrCode(result);
        }
      } catch (error) {
        if (!cancelled) {
          setQrError(error instanceof Error ? error.message : String(error));
        }
      }
    };

    generateQr();

    return () => {
      cancelled = true;
    };
  }, [payload, size]);

  return qrCode ? (
    <img src={qrCode} alt={`QR para ${asset.codigo}`} className="asset-qr-code" />
  ) : qrError ? (
    <div
      className="asset-qr-code asset-qr-code--placeholder asset-qr-code--error"
      role="img"
      aria-label="No se pudo generar el código QR"
      title={qrError}
    >
      <i className="bi bi-exclamation-triangle" />
    </div>
  ) : (
    <div className="asset-qr-code asset-qr-code--placeholder">
      <i className="bi bi-qr-code" />
    </div>
  );
};

export default AssetQrCode;
