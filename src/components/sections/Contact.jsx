import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle } from 'lucide-react';
import { trackEvent } from '../../utils/analytics';

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    // Here you would integrate with EmailJS or Formspree
    // Example: await emailjs.send('service_id', 'template_id', data, 'public_key');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    trackEvent('contact_form_submit', {
      company: data.company
    });

    // 고객 문의 데이터를 LocalStorage에 저장하여 임직원 포털에서 확인할 수 있도록 함
    try {
      const existing = JSON.parse(localStorage.getItem('customer_inquiries') || '[]');
      const newInquiry = {
        id: Date.now(),
        type: '고객문의',
        title: `[${data.inquiryType}] ${data.company} - ${data.name}`,
        requester: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
        date: new Date().toISOString().split('T')[0],
        status: '대기'
      };
      localStorage.setItem('customer_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch(e) {
      console.error(e);
    }

    setIsSuccess(true);
    reset();
    
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-900/40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Contact & Inquiry</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              프로젝트 도입 및 견적 문의를 남겨주시면,<br />
              담당 엔지니어가 신속하게 답변해 드립니다.
            </p>
            
            <div className="space-y-6 text-slate-200">
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <span className="font-bold">⏱️</span>
                </div>
                <div>
                  <p className="text-sm text-slate-400">평균 응답 시간</p>
                  <p className="font-semibold">영업일 기준 24시간 이내</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="font-bold text-primary">T</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">대표전화</p>
                    <p className="font-semibold text-lg">033-264-9243 / FAX : 033-251-5747</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSuccess ? (
              <div className="bg-white border border-slate-200 p-10 rounded-2xl flex flex-col items-center justify-center h-full text-center animate-pulse shadow-xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <CheckCircle size={80} className="text-[#00b4d8] mb-6 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 text-[#1a2f6b]">문의가 접수되었습니다</h3>
                <p className="text-slate-600 text-lg">영업일 기준 1~2일 내에 상세한 답변을 드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-xl space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1a2f6b] mb-1">문의 유형 *</label>
                  <select
                    {...register("inquiryType", { required: "문의 유형을 선택해주세요" })}
                    className={`w-full bg-[#f4f6fb] border ${errors.inquiryType ? 'border-red-400' : 'border-transparent'} rounded-lg px-4 py-3 text-[#1a2f6b] focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors`}
                  >
                    <option value="">유형을 선택해주세요</option>
                    <option value="제품 도입 문의">제품 도입 문의</option>
                    <option value="견적 요청">견적 요청</option>
                    <option value="A/S 문의">A/S 문의</option>
                    <option value="기타">기타</option>
                  </select>
                  {errors.inquiryType && <p className="text-red-400 text-xs mt-1">{errors.inquiryType.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2f6b] mb-1">회사명 *</label>
                    <input 
                      {...register("company", { required: "회사명을 입력해주세요" })}
                      className={`w-full bg-[#f4f6fb] border ${errors.company ? 'border-red-400' : 'border-transparent'} rounded-lg px-4 py-3 text-[#1a2f6b] placeholder-slate-400 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors`}
                      placeholder="주식회사 비에이텍"
                    />
                    {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2f6b] mb-1">담당자 성함 *</label>
                    <input 
                      {...register("name", { required: "성함을 입력해주세요" })}
                      className={`w-full bg-[#f4f6fb] border ${errors.name ? 'border-red-400' : 'border-transparent'} rounded-lg px-4 py-3 text-[#1a2f6b] placeholder-slate-400 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors`}
                      placeholder="홍길동"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2f6b] mb-1">연락처 *</label>
                    <input 
                      {...register("phone", { required: "연락처를 입력해주세요" })}
                      className={`w-full bg-[#f4f6fb] border ${errors.phone ? 'border-red-400' : 'border-transparent'} rounded-lg px-4 py-3 text-[#1a2f6b] placeholder-slate-400 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors`}
                      placeholder="010-0000-0000"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a2f6b] mb-1">이메일 *</label>
                    <input 
                      type="email"
                      {...register("email", { 
                        required: "이메일을 입력해주세요",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "유효한 이메일 주소를 입력해주세요"
                        }
                      })}
                      className={`w-full bg-[#f4f6fb] border ${errors.email ? 'border-red-400' : 'border-transparent'} rounded-lg px-4 py-3 text-[#1a2f6b] placeholder-slate-400 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors`}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a2f6b] mb-1">문의 내용 *</label>
                  <textarea 
                    {...register("message", { required: "문의 내용을 입력해주세요" })}
                    rows={4}
                    className={`w-full bg-[#f4f6fb] border ${errors.message ? 'border-red-400' : 'border-transparent'} rounded-lg px-4 py-3 text-[#1a2f6b] placeholder-slate-400 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-colors resize-none`}
                    placeholder="도입을 원하시는 설비나 궁금한 점을 상세히 남겨주세요."
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a2f6b] mb-1">첨부 파일 (선택)</label>
                  <input 
                    type="file"
                    {...register("attachment")}
                    className="w-full bg-[#f4f6fb] border border-transparent rounded-lg px-4 py-2 text-[#1a2f6b] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00b4d8] file:text-white hover:file:bg-[#0096b4] cursor-pointer text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">도면, 사양서 등 참고 자료를 첨부하실 수 있습니다. (최대 10MB)</p>
                </div>

                <div className="flex items-center pt-2">
                  <input 
                    type="checkbox" 
                    id="privacyConsent"
                    {...register("privacyConsent", { required: "개인정보 수집 및 이용에 동의해야 합니다." })}
                    className="w-5 h-5 rounded border-gray-300 text-[#00b4d8] focus:ring-[#00b4d8] mr-3 cursor-pointer"
                  />
                  <label htmlFor="privacyConsent" className="text-sm text-[#1a2f6b] cursor-pointer flex-1">
                    개인정보 수집 및 이용에 동의합니다. (필수)
                  </label>
                </div>
                {errors.privacyConsent && <p className="text-red-400 text-xs">{errors.privacyConsent.message}</p>}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#00b4d8] hover:bg-[#0096b4] text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={20} />
                      문의 접수하기
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
