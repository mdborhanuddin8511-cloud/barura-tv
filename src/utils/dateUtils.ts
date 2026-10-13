/**
 * Utility functions for Bengali date formatting and numerals
 */

const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num: number | string): string {
  return num
    .toString()
    .replace(/[0-9]/g, (match) => BENGALI_NUMERALS[parseInt(match, 10)]);
}

const BENGALI_MONTHS = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const BENGALI_DAYS = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

export function getFormattedBengaliDate(): {
  fullBengaliDate: string;
  banglaEraDate: string;
  timeString: string;
} {
  const now = new Date();
  const dayName = BENGALI_DAYS[now.getDay()];
  const dateNum = toBengaliNumber(now.getDate());
  const monthName = BENGALI_MONTHS[now.getMonth()];
  const yearNum = toBengaliNumber(now.getFullYear());

  // Approximate Bangla calendar estimation (Aswin/Kartik 1433)
  const banglaEraDate = '২৮ আশ্বিন ১৪৩৩ বঙ্গাব্দ';

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ন';
  const hour12 = hours % 12 || 12;
  const timeString = `${toBengaliNumber(hour12)}:${toBengaliNumber(
    minutes < 10 ? '0' + minutes : minutes
  )} ${ampm}`;

  return {
    fullBengaliDate: `${dayName}, ${dateNum} ${monthName} ${yearNum}`,
    banglaEraDate,
    timeString,
  };
}
