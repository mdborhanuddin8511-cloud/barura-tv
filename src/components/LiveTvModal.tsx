import React, { useState } from 'react';
import { X, Tv, Volume2, VolumeX, Maximize2, Radio, Play, Pause, AlertCircle, Share2 } from 'lucide-react';

interface LiveTvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveTvModal: React.FC<LiveTvModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white">
              <Tv className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base font-serif">বরুড়া.টিভি লাইভ</span>
                <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
                  Live HD
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                বরুড়া ও দেশের সার্বক্ষণিক সরাসরি সম্প্রচার
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {/* Studio Video Background */}
          <img
            src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80"
            alt="Live Studio Stream"
            className="w-full h-full object-cover opacity-85"
          />

          {/* Broadcast Graphics Overlays */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-xs px-3 py-1 rounded border border-white/10">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-xs font-bold text-white">বরুড়া.টিভি ডিজিটাল স্টুডিও</span>
            <span className="text-[11px] text-slate-400">· ১০৮০p HD</span>
          </div>

          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded shadow flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>সরাসরি</span>
          </div>

          {/* Lower Third Ticker inside TV */}
          <div className="absolute bottom-0 left-0 right-0 bg-slate-950/90 border-t-2 border-red-600 p-2.5 text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded text-[11px]">
                বিশেষ বুলেটিন
              </span>
              <p className="truncate font-semibold text-slate-200">
                বরুড়ায় আধুনিক কৃষি ও প্রযুক্তি নির্ভর কর্মসংস্থানে তরুণদের নতুন উদ্যোগ। কুমিল্লা অঞ্চলের বিশেষ প্রতিবেদন।
              </p>
            </div>
          </div>

          {/* Player controls overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 hover:text-red-400 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:text-red-400 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Schedule & Info */}
        <div className="p-4 bg-slate-950 text-xs text-slate-400 border-t border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-red-400 font-bold block mb-0.5">সকাল ৯:০০ - সংবাদ সকাল</span>
              <p className="text-slate-300">বরুড়া ও সারাদেশের সকালের তাজা খবর</p>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-0.5">দুপুর ২:০০ - বরুড়া প্রতিদিন</span>
              <p className="text-slate-300">কুমিল্লা ও বরুড়ার স্থানীয় উন্নয়ন সংবাদ</p>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-0.5">রাত ৮:০০ - প্রাইম টাইম বুলেটিন</span>
              <p className="text-slate-300">দেশের শীর্ষ খবর ও বিশ্লেষণী টকশো</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
