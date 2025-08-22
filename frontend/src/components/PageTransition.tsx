import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled
const DynamicBarba = dynamic(
  () => import('@barba/core').then(mod => mod.default),
  { ssr: false }
);

const PageTransition = () => {
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      import('@barba/core').then(barba => {
        barba.default.init({
          transitions: [{
            name: 'fade',
            leave(data) {
              const gsap = require('gsap');
              return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
            },
            enter(data) {
              const gsap = require('gsap');
              return gsap.fromTo(data.next.container,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }
              );
            }
          }]
        });
      });
    }
  }, []);

  return null;
};

export default PageTransition;
