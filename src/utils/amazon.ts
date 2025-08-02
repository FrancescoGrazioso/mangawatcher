export function generateAmazonUrl(mangaTitle: string, volume?: number): string {
  const baseUrl = 'https://www.amazon.it/s?k='
  
  // Clean the title and add volume if specified
  let searchTerm = mangaTitle
    .replace(/[^\w\s]/gi, '') // Remove special characters
    .replace(/\s+/g, '+') // Replace spaces with +
    .trim()
  
  // Add "manga" to the search term to avoid confusion with other products
  searchTerm += '+manga'
  
  if (volume) {
    searchTerm += `+volume+${volume}`
  }
  
  return `${baseUrl}${encodeURIComponent(searchTerm)}`
}

export function generateMangaAmazonUrl(mangaTitle: string): string {
  return generateAmazonUrl(mangaTitle)
}

export function generateVolumeAmazonUrl(mangaTitle: string, volume: number): string {
  return generateAmazonUrl(mangaTitle, volume)
} 