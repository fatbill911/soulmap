"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("表單資料:", formData);
    alert("感謝您的訊息！我們會盡快回覆您。（此功能尚未串接後端）");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cosmic-white mb-4">
            聯絡我們
          </h1>
          <p className="text-lg text-cosmic-white/70">
            有任何問題或建議嗎？我們很樂意聽到你的聲音
          </p>
        </div>

        <div className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-cosmic-white font-semibold mb-2"
              >
                姓名 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-cosmic-navy border border-cosmic-purple/30 rounded-lg px-4 py-3 text-cosmic-white focus:border-cosmic-purple focus:outline-none"
                placeholder="請輸入您的姓名"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-cosmic-white font-semibold mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-cosmic-navy border border-cosmic-purple/30 rounded-lg px-4 py-3 text-cosmic-white focus:border-cosmic-purple focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-cosmic-white font-semibold mb-2"
              >
                主旨 *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-cosmic-navy border border-cosmic-purple/30 rounded-lg px-4 py-3 text-cosmic-white focus:border-cosmic-purple focus:outline-none"
              >
                <option value="">請選擇主旨</option>
                <option value="feedback">網站回饋</option>
                <option value="bug">問題回報</option>
                <option value="suggestion">功能建議</option>
                <option value="collaboration">合作提案</option>
                <option value="other">其他</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-cosmic-white font-semibold mb-2"
              >
                訊息 *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-cosmic-navy border border-cosmic-purple/30 rounded-lg px-4 py-3 text-cosmic-white focus:border-cosmic-purple focus:outline-none resize-none"
                placeholder="請告訴我們您的想法..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cosmic-purple/50 transition-all"
            >
              送出訊息 ✨
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-cosmic-white/50">
            <p>
              📧 或直接寄信至：
              <a
                href="mailto:soulmapcontact@gmail.com"
                className="text-cosmic-purple hover:text-cosmic-pink transition-colors ml-1"
              >
                soulmapcontact@gmail.com
              </a>
            </p>
            <p className="mt-2">我們通常會在 2-3 個工作天內回覆</p>
          </div>
        </div>

        {/* Social Links (Optional) */}
        <div className="mt-8 text-center">
          <p className="text-cosmic-white/70 mb-4">也可以在這些平台找到我們</p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-cosmic-purple hover:text-cosmic-pink transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
