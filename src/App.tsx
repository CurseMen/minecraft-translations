import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ModpackCard from './components/ModpackCard';
import ModpackDetail from './components/ModpackDetail';
import NewsModal from './components/NewsModal';
import { modpacks } from './data/modpacks';
import { Modpack } from './types';

interface DownloadCounts {
  [key: string]: number | 'loading' | 'error';
}

// Paths to images in the assets folder
const CREEPER_IMG = '/assets/Creeper.png';
const ZOMBIE_IMG = '/assets/zombie.png';
const SKELETON_IMG = '/assets/skeleton.png';
const ENDERMAN_IMG = '/assets/Enderman.png';
const GOLEM_IMG = '/assets/golem.png';

type SortType = 'newest' | 'name-asc' | 'name-desc';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadCounts, setDownloadCounts] = useState<DownloadCounts>({});
  const [selectedModpackId, setSelectedModpackId] = useState<number | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  
  const [sortType, setSortType] = useState<SortType>('newest');
  const [versionFilter, setVersionFilter] = useState<string>('all');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Effect to handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const id = parseInt(hash, 10);
      if (modpacks.some(p => p.id === id)) {
        setSelectedModpackId(id);
        window.scrollTo(0, 0); // Scroll to top on page change
      } else {
        setSelectedModpackId(null);
        // Clear hash if it's invalid
        if(hash) {
          window.history.pushState("", document.title, window.location.pathname + window.location.search);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange(); // Initial check on page load

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);

  // Effect to fetch download counts
  useEffect(() => {
    const fetchAllCounts = async () => {
      const cacheKey = 'downloadCountsCache';
      const cacheDuration = 4 * 60 * 60 * 1000; // 4 hours

      try {
        const cachedItem = localStorage.getItem(cacheKey);
        if (cachedItem) {
          const cachedData = JSON.parse(cachedItem);
          const now = new Date().getTime();
          if (now - cachedData.timestamp < cacheDuration) {
            setDownloadCounts(cachedData.counts);
            // Check if any modpacks with repoUrl are missing from the cache
            const packsWithRepo = modpacks.filter(p => p.repoUrl);
            const isMissingFromCache = packsWithRepo.some(p => cachedData.counts[p.id] === undefined);
            if (!isMissingFromCache) {
              return; // Cache is fresh and complete, no need to fetch.
            }
          }
        }
      } catch (e) {
        console.error("Failed to parse cache", e);
      }
      
      const packsWithRepo = modpacks.filter(p => p.repoUrl);
      if (packsWithRepo.length === 0) {
        return;
      }

      // Set initial loading state for all of them
      const loadingCounts: DownloadCounts = {};
      packsWithRepo.forEach(p => {
        loadingCounts[p.id] = 'loading';
      });
      setDownloadCounts(prevCounts => ({...prevCounts, ...loadingCounts}));

      // Fetch all counts in parallel for performance
      const promises = packsWithRepo.map(async (modpack) => {
        if (!modpack.repoUrl) {
          return null;
        }
        try {
          const response = await fetch(`https://api.github.com/repos/${modpack.repoUrl}/releases`);
          if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
          }
          type Asset = { download_count: number };
          type Release = { assets: Asset[] };
          const releases: Release[] = await response.json();

          const totalDownloads = releases.reduce((acc: number, release) => {
            return acc + release.assets.reduce((assetAcc: number, asset) => assetAcc + (asset.download_count || 0), 0);
          }, 0);

          return { id: modpack.id, count: totalDownloads };
        } catch (error) {
          console.error(`Failed to fetch downloads for ${modpack.repoUrl}:`, error);
          return { id: modpack.id, count: 'error' as const };
        }
      });

      const results = await Promise.all(promises);

      const newCounts: DownloadCounts = {};
      results.forEach(result => {
        if (result) {
          newCounts[result.id] = result.count;
        }
      });
      
      // Replace with the full, fresh set of counts
      setDownloadCounts(newCounts);
      
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ counts: newCounts, timestamp: new Date().getTime() }));
      } catch (e) {
        console.error("Failed to set cache", e);
      }
    };

    fetchAllCounts();
  }, []);
  
  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const uniqueVersions = useMemo(() => {
    const versions = [...new Set(modpacks.map(p => p.minecraftVersion))];
    // Sort versions numerically (e.g., 1.21 comes after 1.20.1)
    return versions.sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  }, []);

  const selectedModpack = useMemo(() => {
    if (selectedModpackId === null) return null;
    return modpacks.find(p => p.id === selectedModpackId);
  }, [selectedModpackId]);

  const filteredAndSortedModpacks = useMemo(() => {
    let filtered = modpacks
      .filter(modpack =>
        modpack.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (versionFilter !== 'all') {
      filtered = filtered.filter(modpack => modpack.minecraftVersion === versionFilter);
    }

    switch (sortType) {
      case 'name-asc':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return filtered.sort((a, b) => b.title.localeCompare(a.title));
      case 'newest':
      default:
        return filtered.sort((a, b) => b.id - a.id);
    }
  }, [searchQuery, sortType, versionFilter]);

  const getSortButtonText = () => {
    let sortText;
    switch (sortType) {
      case 'name-asc': sortText = 'А-Я'; break;
      case 'name-desc': sortText = 'Я-А'; break;
      default: sortText = 'Новые';
    }
    const versionText = versionFilter === 'all' ? 'Все' : versionFilter;
    return `${versionText} | ${sortText}`;
  };

  return (
    <div className="flex min-h-screen">
      {/* Left decorative sidebar */}
      <aside className="flex-none w-1/6 hidden xl:flex flex-col items-center justify-center space-y-16 p-8 opacity-50">
          <img src={CREEPER_IMG} alt="Creeper" className="w-auto h-auto" />
      </aside>

      {/* Main content area wrapper */}
      <div className="flex-1 flex justify-center min-w-0 main-content-bg">
        {/* Actual content container */}
        <div className="w-full max-w-7xl min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8">
          <Header onNewsClick={() => setIsNewsModalOpen(true)} />
          
          {isNewsModalOpen && <NewsModal onClose={() => setIsNewsModalOpen(false)} />}

          <main className="w-full flex-grow">
            {selectedModpack ? (
              <ModpackDetail
                modpack={selectedModpack}
                downloadCount={downloadCounts[selectedModpack.id]}
              />
            ) : (
              <>
                <div className="mb-8 w-full max-w-2xl mx-auto flex gap-2 items-stretch">
                  <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="minecraft-search w-full p-4 text-lg flex-grow"
                    aria-label="Поиск по названию модпака"
                  />
                  <div className="relative" ref={sortDropdownRef}>
                    <button 
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)} 
                      className="minecraft-btn px-4 py-2 text-xs h-full flex items-center gap-3"
                      aria-haspopup="true"
                      aria-expanded={isSortDropdownOpen}
                    >
                      <span>{getSortButtonText()}</span>
                      <span className={`arrow ${isSortDropdownOpen ? 'open' : ''}`} style={{ transform: isSortDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>&#9660;</span>
                    </button>
                    {isSortDropdownOpen && (
                      <div className="minecraft-dropdown-menu">
                        <div className="minecraft-dropdown-inner">
                          <div className="minecraft-dropdown-header">Сортировать по</div>
                          <button onClick={() => {setSortType('newest'); setIsSortDropdownOpen(false);}} className={`minecraft-dropdown-item ${sortType === 'newest' ? 'active' : ''}`}>Сначала новые</button>
                          <button onClick={() => {setSortType('name-asc'); setIsSortDropdownOpen(false);}} className={`minecraft-dropdown-item ${sortType === 'name-asc' ? 'active' : ''}`}>Название (А-Я)</button>
                          <button onClick={() => {setSortType('name-desc'); setIsSortDropdownOpen(false);}} className={`minecraft-dropdown-item ${sortType === 'name-desc' ? 'active' : ''}`}>Название (Я-А)</button>
                          <div className="minecraft-dropdown-divider"></div>
                          <div className="minecraft-dropdown-header">Фильтр по версии MC</div>
                          <button onClick={() => {setVersionFilter('all'); setIsSortDropdownOpen(false);}} className={`minecraft-dropdown-item ${versionFilter === 'all' ? 'active' : ''}`}>Все версии</button>
                          {uniqueVersions.map(version => (
                             <button key={version} onClick={() => {setVersionFilter(version); setIsSortDropdownOpen(false);}} className={`minecraft-dropdown-item ${versionFilter === version ? 'active' : ''}`}>{version}</button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAndSortedModpacks.map((modpack) => (
                    <ModpackCard 
                      key={modpack.id} 
                      modpack={modpack} 
                      downloadCount={downloadCounts[modpack.id]}
                    />
                  ))}
                </div>
                {filteredAndSortedModpacks.length === 0 && (
                    <div className="minecraft-card-inner text-center p-8 col-span-full">
                        <p className="text-xl text-black">Ничего не найдено!</p>
                    </div>
                )}
              </>
            )}
          </main>
          <Footer />
        </div>
      </div>

       {/* Right decorative sidebar */}
      <aside className="flex-none w-1/6 hidden xl:flex flex-col items-center justify-center space-y-16 p-8 opacity-50">
          <img src={GOLEM_IMG} alt="Golem" className="w-auto h-auto" />
          <img src={ENDERMAN_IMG} alt="Enderman" className="w-auto h-auto" />
      </aside>
    </div>
  );
};

export default App;
