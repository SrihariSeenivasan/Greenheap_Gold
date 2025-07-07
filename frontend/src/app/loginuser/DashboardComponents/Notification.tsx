import React, { useState } from 'react';
import { Bell, Clock, X, ChevronRight } from 'lucide-react';

type Notification = {
  id: number;
  type: 'offer' | 'update' | 'reminder';
  title: string;
  description: string;
  time: string;
  avatar: string;
  bgGradient: string;
  borderColor: string;
  unread: boolean;
};

const LNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'offer',
      title: 'Tanishq Digital Gold offers..',
      description:
        'over to it since the jewellery at Tanishq is already way to expensive therefor hallmarking the jewelry could',
      time: '9 months ago',
      avatar: '💰',
      bgGradient: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-200',
      unread: true,
    },
    {
      id: 2,
      type: 'update',
      title: 'New Features Available',
      description:
        'Check out the latest updates and improvements to your dashboard experience',
      time: '2 days ago',
      avatar: '🚀',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      unread: true,
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Monthly Report Due',
      description:
        'Your monthly analytics report is ready for review and needs your attention',
      time: '1 week ago',
      avatar: '📊',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      unread: false,
    },
  ]);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#7a1335] to-[#a91d47] rounded-2xl flex items-center justify-center shadow-lg shadow-[#7a1335]/20">
                <Bell className="w-6 h-6 text-white" />
              </div>
              {notifications.some((n) => n.unread) && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#7a1335] to-[#a91d47] bg-clip-text text-transparent">
                Notifications
              </h1>
              <p className="text-gray-600 text-sm">
                {notifications.filter((n) => n.unread).length} unread
                notifications
              </p>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                <Bell className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                All caught up!
              </h3>
              <p className="text-gray-500">No new notifications at the moment.</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`group relative overflow-hidden rounded-2xl border ${notification.borderColor} bg-gradient-to-r ${notification.bgGradient} hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  notification.unread ? 'ring-2 ring-[#7a1335]/10' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'slideInUp 0.6s ease-out forwards',
                }}
              >
                {/* Unread indicator */}
                {notification.unread && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7a1335] to-[#a91d47]"></div>
                )}

                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl shadow-sm">
                        {notification.avatar}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3
                          className={`font-semibold text-gray-900 ${
                            notification.unread ? 'font-bold' : ''
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 ml-4">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/50 rounded-lg"
                          >
                            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        {notification.description}
                      </p>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {notification.unread && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#7a1335] text-white">
                              New
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded-full capitalize ${
                              notification.type === 'offer'
                                ? 'bg-green-100 text-green-700'
                                : notification.type === 'update'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-purple-100 text-purple-700'
                            }`}
                          >
                            {notification.type}
                          </span>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                          <ChevronRight className="w-4 h-4 text-[#7a1335]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))
          )}
        </div>

        {/* Clear All */}
        {notifications.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setNotifications([])}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7a1335] to-[#a91d47] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#7a1335]/25 transition-all duration-200 hover:scale-105"
            >
              Clear All Notifications
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LNotification;
