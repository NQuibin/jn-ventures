const baseUrl =
  'https://yrqgssyewhmofkpeyakd.supabase.co/storage/v1/object/public';

export const buildImageUrl = (imageName: string, bucketName: string): string => {
  return new URL(`${baseUrl}/${bucketName}/${imageName}`).toString();
};
