"use client";

import { useEffect, useRef } from "react";

interface RadarDataPoint {
  dimension: string;
  value: number; // 0-100
  color: string;
}

interface RadarChartProps {
  data: RadarDataPoint[];
}

export default function RadarChart({ data }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 設定 canvas 實際解析度（避免模糊）
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // 清空畫布
    ctx.clearRect(0, 0, rect.width, rect.height);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxRadius = Math.min(centerX, centerY) - 60;
    const numAxes = data.length;

    // 繪製背景同心圓（0%, 25%, 50%, 75%, 100%）
    const levels = [0.25, 0.5, 0.75, 1.0];
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    levels.forEach((level) => {
      ctx.beginPath();
      for (let i = 0; i <= numAxes; i++) {
        const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius * level;
        const y = centerY + Math.sin(angle) * maxRadius * level;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
    });

    // 繪製軸線與標籤
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    data.forEach((point, i) => {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
      const x = centerX + Math.cos(angle) * maxRadius;
      const y = centerY + Math.sin(angle) * maxRadius;

      // 軸線
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // 標籤位置（稍微外推）
      const labelX = centerX + Math.cos(angle) * (maxRadius + 30);
      const labelY = centerY + Math.sin(angle) * (maxRadius + 30);

      // 繪製標籤背景
      ctx.fillStyle = point.color;
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.arc(labelX, labelY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // 繪製標籤文字
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillText(point.dimension, labelX, labelY);
    });

    // 繪製數據多邊形
    ctx.beginPath();
    data.forEach((point, i) => {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
      const value = Math.max(0, Math.min(100, point.value)); // 限制在 0-100
      const radius = (maxRadius * value) / 100;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();

    // 填充顏色（漸層效果）
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      maxRadius
    );
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.5)"); // cosmic-purple
    gradient.addColorStop(1, "rgba(236, 72, 153, 0.3)"); // cosmic-pink
    ctx.fillStyle = gradient;
    ctx.fill();

    // 描邊
    ctx.strokeStyle = "rgba(139, 92, 246, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製數據點
    data.forEach((point, i) => {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
      const value = Math.max(0, Math.min(100, point.value));
      const radius = (maxRadius * value) / 100;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = point.color;
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [data]);

  return (
    <div className="w-full flex justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-full"
        style={{ width: "500px", height: "500px" }}
      />
    </div>
  );
}
