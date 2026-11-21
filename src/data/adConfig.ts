const env = import.meta.env;
const publisherId = env.VITE_ADSENSE_CLIENT_ID?.trim() ?? '';
const enabledRequested = env.PROD && env.VITE_ADSENSE_ENABLED?.trim() === 'true';
const hasValidPublisherId = /^ca-pub-\d{16}$/.test(publisherId);

if (enabledRequested && !hasValidPublisherId) {
  console.error('AdSense is enabled, but VITE_ADSENSE_CLIENT_ID is missing or invalid. Ads are disabled.');
}

const slotId = (value: string | undefined) => value?.trim() ?? '';

export const adConfig = {
  enabled: enabledRequested && hasValidPublisherId,
  publisherId,
  units: {
    homepageBanner:          slotId(env.VITE_ADSENSE_SLOT_HOME_BANNER),
    homepageMidSection:      slotId(env.VITE_ADSENSE_SLOT_HOME_MID_SECTION),
    gamesBanner:             slotId(env.VITE_ADSENSE_SLOT_GAMES_BANNER),
    discoverBanner:          slotId(env.VITE_ADSENSE_SLOT_DISCOVER_BANNER),
    gameDetailsSidebar:      slotId(env.VITE_ADSENSE_SLOT_GAME_DETAILS_SIDEBAR),
    gameDetailsBottom:       slotId(env.VITE_ADSENSE_SLOT_GAME_DETAILS_BOTTOM),
    gamePlayerAbove:         slotId(env.VITE_ADSENSE_SLOT_GAME_PLAYER_ABOVE),
    gamePlayerBelow:         slotId(env.VITE_ADSENSE_SLOT_GAME_PLAYER_BELOW),
    footerBanner:            slotId(env.VITE_ADSENSE_SLOT_FOOTER_BANNER),
    responsive:              slotId(env.VITE_ADSENSE_SLOT_RESPONSIVE),
  },
  formats: {
    banner:     { width: 728, height: 90  },
    rectangle:  { width: 300, height: 250 },
    halfPage:   { width: 300, height: 600 },
    mobile:     { width: 320, height: 50  },
  },
} as const;

export type AdUnitKey = keyof typeof adConfig.units;
export type AdFormat  = keyof typeof adConfig.formats;

export const isAdUnitEnabled = (slot: AdUnitKey) =>
  adConfig.enabled && /^\d{10}$/.test(adConfig.units[slot]);
