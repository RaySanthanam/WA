import React from 'react';

export default function DateSeparator({ date }) {
  return (
    <div className="flex justify-center my-3">
      <span className="bg-[#182229] text-[#8696a0] text-[12.5px] px-3 py-1.5 rounded-lg shadow-sm">
        {date}
      </span>
    </div>
  );
}
