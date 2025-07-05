import { Award, Eye, Heart, MessageCircle, Share2, Shield, ShoppingCart, Sparkles, Star, Zap } from 'lucide-react';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pricebreakup, products } from "../../../../../constants";

const JewelryProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Get product by id from constants
  const product = products.find((p) => String(p.id) === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        <div className="animate-pulse">Product not found.</div>
      </div>
    );
  }

  const productImages = [product.img, product.img1, product.img2, product.img3, product.img4];
  // Similar products: show other products from constants except current
  const similarProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 pt-16">
      {/* Hero Section with Floating Elements */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzdhMTMzNSIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPgo8L2c+CjwvZz4KPC9zdmc+')] opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
          {/* Compact Header */}
          <div className="flex items-center justify-between py-3 mb-4">
            <div className="flex items-center space-x-1 text-xs text-[#7a1335]/70">
              <span className="hover:text-[#7a1335] cursor-pointer">Home</span>
              <span>/</span>
              <span className="hover:text-[#7a1335] cursor-pointer">Jewelry</span>
              <span>/</span>
              <span className="font-medium text-[#7a1335]">{product.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-[#7a1335] text-white px-2 py-1 rounded-full">PREMIUM</span>
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full animate-pulse">IN STOCK</span>
            </div>
          </div>

          {/* Main Product Grid - Compact Layout */}
          <div className="grid lg:grid-cols-12 gap-4 mb-6">
            {/* Product Images - Compact */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative group">
                <div className="aspect-square bg-gradient-to-br from-[#7a1335]/5 to-purple-100 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : 'text-[#7a1335]'}`} />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                      <Share2 className="w-4 h-4 text-[#7a1335]" />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                      <Eye className="w-4 h-4 text-[#7a1335]" />
                    </button>
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      12% OFF
                    </div>
                  </div>
                </div>

                {/* Thumbnail Images - Horizontal Scroll */}
                <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
                  {productImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                        selectedImage === i 
                          ? 'ring-2 ring-[#7a1335] scale-110 shadow-lg' 
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details - Compact */}
            <div className="lg:col-span-6 space-y-4">
              {/* Title & Rating */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-sm text-[#7a1335]/70 ml-2">(125)</span>
                  </div>
                  <Sparkles className="w-5 h-5 text-[#7a1335] animate-pulse" />
                </div>
                <h1 className="text-2xl font-bold text-[#7a1335] mb-2">{product.title}</h1>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-[#7a1335]">{product.price}</span>
                  <span className="text-lg text-[#7a1335]/50 line-through">₹95,000</span>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Award, label: "Material", value: product.material },
                  { icon: Shield, label: "Purity", value: product.goldpurity },
                  { icon: Sparkles, label: "Quality", value: product.quality },
                  { icon: Zap, label: "Warranty", value: "Lifetime" }
                ].map((item, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4 text-[#7a1335] group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs text-[#7a1335]/70">{item.label}</div>
                        <div className="font-semibold text-[#7a1335] text-sm">{item.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                <h3 className="font-semibold text-[#7a1335] mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Key Features
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.description?.points?.map((point, idx) => (
                    <div key={idx} className="text-center group">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#7a1335]/20 to-purple-200 rounded-lg flex items-center justify-center mx-auto mb-1 group-hover:scale-110 transition-transform">
                        <div className="w-3 h-3 bg-[#7a1335] rounded-full"></div>
                      </div>
                      <p className="text-xs font-medium text-[#7a1335] leading-tight">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-[#7a1335] to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button className="flex-1 bg-white border-2 border-[#7a1335] text-[#7a1335] py-3 px-4 rounded-xl font-semibold hover:bg-[#7a1335] hover:text-[#bf0f0f] transition-all duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Tabbed Content - Compact */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-[#7a1335]/20">
              {['details', 'pricing'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab 
                      ? 'text-[#7a1335] border-b-2 border-[#7a1335] bg-[#7a1335]/5' 
                      : 'text-[#7a1335]/70 hover:text-[#7a1335] hover:bg-[#7a1335]/5'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4">
              {activeTab === 'details' && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-[#7a1335] mb-3">{product.description?.title}</h3>
                    <div className="space-y-2">
                      {product.description?.points?.map((point, idx) => (
                        <div key={idx} className="flex items-start space-x-2 group">
                          <div className="w-2 h-2 bg-[#7a1335] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                          <span className="text-sm text-[#7a1335]/80">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[#7a1335]/5 to-purple-100 rounded-xl p-4">
                    <h4 className="font-semibold text-[#7a1335] mb-2">Care Instructions</h4>
                    <ul className="text-sm text-[#7a1335]/80 space-y-1">
                      <li>• Store in provided jewelry box</li>
                      <li>• Clean with soft cloth regularly</li>
                      <li>• Avoid exposure to chemicals</li>
                      <li>• Professional cleaning recommended</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="bg-gradient-to-br from-[#7a1335]/5 to-purple-100 rounded-xl p-4">
                  <h3 className="font-bold text-[#7a1335] mb-4">Price Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#7a1335]/20">
                          <th className="text-left py-2 text-[#7a1335] font-semibold">Component</th>
                          <th className="text-left py-2 text-[#7a1335] font-semibold">Rate</th>
                          <th className="text-left py-2 text-[#7a1335] font-semibold">Weight</th>
                          <th className="text-left py-2 text-[#7a1335] font-semibold">Discount</th>
                          <th className="text-left py-2 text-[#7a1335] font-semibold">Final</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pricebreakup.map((row, idx) => (
                          <tr key={idx} className="hover:bg-white/50 transition-colors">
                            <td className="py-2 font-medium text-[#7a1335]">{row.component}</td>
                            <td className="py-2 text-[#7a1335]">{row.goldrate18kt}</td>
                            <td className="py-2 text-[#7a1335]">{row.weightg}</td>
                            <td className="py-2 text-green-600 font-medium">{row.discount}</td>
                            <td className="py-2 font-bold text-[#7a1335]">{row.finalvalue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-4 pt-4 border-t border-[#7a1335]/20 text-right">
                      <div className="text-xl font-bold text-[#7a1335]">Total: {product.price}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Products Section moved below Tab Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#7a1335] mb-8">
              Similar Products you may like
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {similarProducts.map((p, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-[#7a1335] mb-1">{p.title}</h4>
                    <p className="text-lg font-bold text-[#7a1335] mb-2">{p.price}</p>
                    <button
                      className="w-full bg-[#7a1335]/10 text-[#7a1335] py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#7a1335] hover:text-white transition-all duration-300"
                      onClick={() => navigate(`/buyornaments/${p.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      
    </div>
  );
};

export default JewelryProductPage;