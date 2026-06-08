export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  } else {
    // Development fallback
    console.log(`[GA4 Event Tracker] ${eventName}`, eventParams);
  }
};
