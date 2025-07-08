import {
  Award,
  TrendingUp,
  Edit3,
  Check,
  X,
  Star,
  Sparkles
} from "lucide-react";

const PriceCard = ({
  title = "",
  price = "",
  isEditing = false,
  tempPrice = "",
  onTempPriceChange = (val: string) => {},
  onStartEdit = () => {},
  onSave = () => {},
  onCancel = () => {},
  gradientFrom = "from-yellow-400",
  gradientTo = "to-pink-500",
  bgGradient = "from-yellow-100 to-pink-100",
  sparkleColor = "bg-yellow-400"
}) => {
  return (
    <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-gray-100/50 hover:border-gray-200/80">
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

      {/* Floating sparkles animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-4 right-8 w-2 h-2 ${sparkleColor} rounded-full animate-pulse`}></div>
        <div className={`absolute top-12 right-4 w-1 h-1 ${sparkleColor} rounded-full animate-ping`} style={{ animationDelay: "0.5s" }}></div>
        <div className={`absolute top-8 right-12 w-1.5 h-1.5 ${sparkleColor} rounded-full animate-pulse`} style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Card content */}
      <div className="relative p-8 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>

              {/* Icon container */}
              <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
                <div className="relative">
                  <Award className="w-8 h-8 text-white" />
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-white/80 animate-pulse" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                {title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Live Rate</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Updated now
                </span>
              </div>
            </div>
          </div>

          {!isEditing && (
            <button
              className={`group/btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl transform`}
              onClick={onStartEdit}
            >
              <Edit3 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
              <span>Edit Price</span>
            </button>
          )}
        </div>

        {/* Price display/edit */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-inner border border-gray-100">
          {isEditing ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  {title} Price (₹/gram)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">₹</div>
                  <input
                    type="text"
                    value={tempPrice}
                    onChange={(e) => onTempPriceChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-2xl font-bold transition-all duration-300 bg-white"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onSave}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg"
                >
                  <Check className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  onClick={onCancel}
                  className="flex-1 flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 transform"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Current Market Rate</div>
                <div className="relative">
                  <div className={`text-6xl font-black bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent mb-2 transform group-hover:scale-105 transition-transform duration-300`}>
                    ₹{price}
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                  </div>
                </div>
                <div className="text-gray-600 font-medium">per gram</div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm">
                <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-medium">Market Active</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
