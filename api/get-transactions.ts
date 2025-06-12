// File: /api/get-transactions.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { TonClient, Address } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";

// Hàm handler chính mà Vercel sẽ chạy
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1. Khởi tạo TonClient để kết nối với Mạng lưới TON
    const endpoint = await getHttpEndpoint({ network: "mainnet" });
    const client = new TonClient({ endpoint });

    // 2. Lấy địa chỉ Ví Nóng từ biến môi trường đã cài đặt trên Vercel
    const hotWalletAddress = process.env.HOT_WALLET_ADDRESS;

    if (!hotWalletAddress) {
      // Nếu không có địa chỉ ví, báo lỗi
      return res.status(500).json({ error: "Chưa cấu hình địa chỉ Ví Nóng trên Vercel." });
    }

    const address = Address.parse(hotWalletAddress);

    // 3. Lấy 10 giao dịch gần nhất của ví
    const transactions = await client.getTransactions(address, {
      limit: 10,
    });

    // 4. Xử lý dữ liệu để trả về dạng JSON đơn giản
    const processedTxs = transactions.map(tx => {
      // Lấy thông tin giao dịch nạp tiền (in_msg)
      const inMsg = tx.inMessage;
      if (inMsg && inMsg.info.type === 'internal') {
        return {
          from: inMsg.info.src.toString(),
          value: parseFloat(inMsg.info.value.coins.toString()) / 1e9, // Chuyển từ nanocoin sang TON
          message: inMsg.body.toString(),
          hash: tx.hash().toString('base64'),
          time: new Date(tx.now * 1000).toISOString(),
        };
      }
      return null;
    }).filter(tx => tx !== null); // Lọc bỏ các giao dịch không phải là nạp tiền

    // 5. Trả về danh sách giao dịch đã xử lý
    return res.status(200).json({
      message: "Lấy giao dịch thành công",
      transactions: processedTxs
    });

  } catch (error) {
    console.error("Lỗi nghiêm trọng:", error);
    return res.status(500).json({ error: "Đã có lỗi xảy ra ở phía server." });
  }
}