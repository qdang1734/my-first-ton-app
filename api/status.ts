// File: /api/status.ts
// Đây là một Serverless Function đơn giản cho Vercel.

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mỗi file trong thư mục /api là một API endpoint riêng biệt.
// Vercel sẽ tự động quản lý việc chạy file này khi có yêu cầu.
export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Lấy thời gian hiện tại của server
  const currentTime = new Date().toISOString();

  // Trả về một thông điệp JSON đơn giản
  response.status(200).json({
    message: 'Backend is running on Vercel!',
    serverTime: currentTime,
    status: 'OK',
  });
}