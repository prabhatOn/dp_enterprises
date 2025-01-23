'use client';

import Image from 'next/image';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Header() {
  const benefits = [
    "We do not deliver low-grade products and check them on multiple parameters before dispatching.",
    "We have tied the knot with reliable manufacturers to source products that are worth customers money.",
    "We are focused on the comfort of our customers and thus offer them doorstep delivery of goods."
  ];

  return (
    <div className="relative bg-white  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Partner in Industrial Solutions
              </h1>
              <p className="text-gray-600 leading-relaxed">
                We are well aware of the industry norms and make sure that our production partners are also adhering to them. 
                Our unique working approach and strict adherence to industry norms have enabled us to gain the trust of our clients.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">One Should Buy From Us Because..</h2>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-black text-white p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">Our Focus</h2>
              <p className="text-gray-300 leading-relaxed">
                We are focused on making our customers happy and developing a long-term bond with them. 
                We also aim to maintain a positive relationship with our partners by generating profit for them.
              </p>
              <div className="mt-4 flex items-center text-orange-400 hover:text-orange-300 transition-colors cursor-pointer group">
                Learn More <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
          <div className="relative h-[600px] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">\
              <Image
                src="/your-image.jpg"
                alt="Industrial Equipment"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <div className="inline-block border border-gray-200 rounded-full px-6 py-3 text-sm text-gray-600">
            D P Enterprises - Authorised Channel Partner of Milton Roy for Madhya Pradesh, Chandigarh & Nagpur
          </div>
        </div>
      </div>
    </div>
  );
}