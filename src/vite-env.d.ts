/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_ENABLED?: string;
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_ADSENSE_SLOT_HOME_BANNER?: string;
  readonly VITE_ADSENSE_SLOT_HOME_MID_SECTION?: string;
  readonly VITE_ADSENSE_SLOT_GAMES_BANNER?: string;
  readonly VITE_ADSENSE_SLOT_DISCOVER_BANNER?: string;
  readonly VITE_ADSENSE_SLOT_GAME_DETAILS_SIDEBAR?: string;
  readonly VITE_ADSENSE_SLOT_GAME_DETAILS_BOTTOM?: string;
  readonly VITE_ADSENSE_SLOT_GAME_PLAYER_ABOVE?: string;
  readonly VITE_ADSENSE_SLOT_GAME_PLAYER_BELOW?: string;
  readonly VITE_ADSENSE_SLOT_FOOTER_BANNER?: string;
  readonly VITE_ADSENSE_SLOT_RESPONSIVE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
