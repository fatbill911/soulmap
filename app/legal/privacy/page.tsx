export const metadata = {
  title: "隱私政策 | SoulMap 靈魂地圖",
  description: "了解 SoulMap 如何收集、使用與保護您的個人資訊。",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cosmic-white mb-8">
          隱私政策
        </h1>

        <div className="space-y-6 text-cosmic-white/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-cosmic-white mb-3">
              1. 資訊收集
            </h2>
            <p>
              當您使用 SoulMap 靈魂地圖時，我們可能會收集以下類型的資訊：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>您在測驗中提供的回答（僅用於計算結果，不會儲存個人識別資訊）</li>
              <li>瀏覽器類型、裝置資訊、IP 位址等技術資訊</li>
              <li>您自願提供的聯絡資訊（如透過聯絡表單）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cosmic-white mb-3">
              2. 資訊使用
            </h2>
            <p>我們收集的資訊將用於：</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>提供測驗結果與個人化內容</li>
              <li>改善網站功能與使用者體驗</li>
              <li>回覆您的詢問與請求</li>
              <li>分析網站流量與使用情況（匿名統計）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cosmic-white mb-3">
              3. 資訊保護
            </h2>
            <p>
              我們採取適當的技術與組織措施來保護您的個人資訊，防止未經授權的存取、
              使用或洩露。然而，請注意網路傳輸無法保證 100% 安全。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cosmic-white mb-3">
              4. Cookies 使用
            </h2>
            <p>
              本網站可能使用 cookies 來改善使用者體驗。您可以透過瀏覽器設定來控制或
              刪除 cookies，但這可能影響網站的某些功能。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cosmic-white mb-3">
              5. 第三方服務
            </h2>
            <p>
              本網站可能使用第三方服務（如 Google Analytics、廣告服務等），
              這些服務有其自己的隱私政策。我們建議您閱讀這些第三方服務的隱私政策。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cosmic-white mb-3">
              6. 您的權利
            </h2>
            <p>根據相關法律，您有權：</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>要求查閱、更正或刪除您的個人資訊</li>
              <li>反對或限制我們處理您的資訊</li>
              <li>要求資料可攜性</li>
              <li>撤回同意（若處理基於您的同意）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cosmic-white mb-3">
              7. 政策更新
            </h2>
            <p>
              我們可能會不時更新本隱私政策。重大變更將透過網站公告通知。
              持續使用本網站即表示您接受更新後的政策。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-cosmic-white mb-3">
              8. 聯絡我們
            </h2>
            <p>
              如果您對本隱私政策有任何疑問，請透過{" "}
              <a href="/contact" className="text-cosmic-purple hover:text-cosmic-pink">
                聯絡表單
              </a>{" "}
              與我們聯繫。
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-cosmic-purple/20 text-sm text-cosmic-white/50">
            <p>最後更新日期：2024 年 1 月</p>
          </div>
        </div>
      </div>
    </div>
  );
}
