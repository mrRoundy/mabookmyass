// components/TypingAnimationPrompt.tsx

'use client';

import { TypeAnimation } from 'react-type-animation';

export default function TypingAnimationPrompt() {
  return (
    <div className="font-sans text-[20px] md:text-[22px] leading-relaxed mb-4 h-[81px] md:h-[52px]">
      <TypeAnimation
        cursor={false} // <-- CHANGE THIS TO false
        sequence={[
          1000,
          '“A Book’s True Worth is Hidden in its Wisdom, NOT its Cover”',
          (el) => el?.classList.add('blinking'),
        ]}
        wrapper="p"
        speed={55}
        className="solid-cursor"
        repeat={0}
      />
    </div>
  );
}