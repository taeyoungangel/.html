import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const Location = () => {
  return (
    <section id="location" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">Location</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-600">
            비에이텍 본사 및 공장 오시는 길을 안내해 드립니다.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <motion.div 
            className="w-full lg:w-2/3 h-[400px] rounded-xl overflow-hidden bg-slate-200"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3150.7361436059323!2d127.73898439999999!3d37.84306249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3562e4261feffbab%3A0xc2ac431491561ac2!2z6rCV7JuQ7Yq667OE7J6Q7LmY67m4IEIOY2mOyynOyLnCBSUFZRKzZISA!5e0!3m2!1sko!2skr!4v1778313524834!5m2!1sko!2skr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="BA TECH Location"
            ></iframe>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/3 p-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start mb-6">
              <MapPin className="text-primary mt-1 mr-4 flex-shrink-0" size={28} />
              <div>
                <h3 className="text-xl font-bold text-secondary mb-2">Head Office & Factory</h3>
                <p className="text-slate-600 leading-relaxed">
                  강원특별자치도 춘천시 퇴계공단2길 64<br />
                  (퇴계제2농공단지내)
                </p>
                <div className="mt-4 text-slate-600 leading-relaxed text-sm space-y-1">
                  <p><strong className="text-slate-700">버스:</strong> 퇴계공단 정류장 하차 후 도보 3분</p>
                  <p><strong className="text-slate-700">자가용:</strong> 춘천IC &rarr; 퇴계공단길 방면 10분</p>
                </div>
              </div>
            </div>

            {/* 회사 전경 사진 추가 */}
            <div className="mt-6 rounded-xl overflow-hidden shadow-sm border border-slate-100">
              <img 
                src="/company-photo.png" 
                alt="비에이텍 회사 전경" 
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="mt-6 space-y-4">
              <a 
                href="https://maps.google.com/?q=강원특별자치도+춘천시+퇴계공단2길+64" 
                target="_blank" 
                rel="noreferrer"
                className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition-colors shadow-md"
              >
                <Navigation size={20} />
                길찾기 앱 열기
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
