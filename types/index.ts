// src/types/index.ts
export interface ITile {
    _id: string;
    title: string;
    summary: string;
    imageAssetId?: string;
    imageUrl?: string;
  }

  export type RootStackParamList = {
    Home: undefined;
    Details: {
      tileId: string;
      imageUrl?: string;
      title?: string;
    };
  };