// components/TypingAnimationMain.tsx

'use client';

import { TypeAnimation } from 'react-type-animation';

export default function TypingAnimationMain() {
  return (
    <div className="font-sans text-xl md:text-2xl mb-4 h-[84px] md:h-[56px]">
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