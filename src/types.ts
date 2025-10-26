export interface Modpack {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  imageUrl: string;
  downloadUrl: string;
  // Optional: "owner/repo" for fetching download counts from GitHub API.
  // Example: "octocat/Hello-World"
  repoUrl?: string;
  version: string;
  minecraftVersion: string;
  lastUpdated?: string; // Date in "YYYY-MM-DD" format
  isOutdated?: boolean;
  localizedMods?: string[];
  curseforgeUrl?: string;
  modrinthUrl?: string;
}

export interface NewsItem {
  id: number;
  date: string;
  content: string;
}
