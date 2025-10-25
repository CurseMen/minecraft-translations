import React from 'react';
import { Modpack } from '../types';
import CollapsibleList from './CollapsibleList';

interface ModpackDetailProps {
  modpack: Modpack;
  downloadCount: number | 'loading' | 'error' | undefined;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const CurseForgeIcon = () => (
  <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
    <path d="m6.307 5.581.391 1.675H0s.112.502.167.558c.168.279.335.614.559.837 1.06 1.228 2.902 1.73 4.409 2.009 1.06.224 2.121.28 3.181.335l1.228 3.293h.67l.391 1.061h-.558l-.949 3.07h9.321l-.949-3.07h-.558l.39-1.061h.67s.558-3.404 2.288-4.967C21.935 7.758 24 7.535 24 7.535V5.581H6.307zm9.377 8.428c-.447.279-.949.279-1.284.503-.223.111-.335.446-.335.446-.223-.502-.502-.67-.837-.781-.335-.112-.949-.056-1.786-.782-.558-.502-.614-1.172-.558-1.507v-.167c0-.056 0-.112.056-.168.111-.334.39-.669.948-.893 0 0-.39.559 0 1.117.224.335.67.502 1.061.279.167-.112.279-.335.335-.503.111-.39.111-.781-.224-1.06-.502-.446-.613-1.06-.279-1.451 0 0 .112.502.614.446.335 0 .335-.111.224-.223-.056-.167-.782-1.228.279-2.009 0 0 .669-.447 1.451-.391-.447.056-.949.335-1.116.782v.055c-.168.447-.056.949.279 1.396.223.335.502.614.614 1.06-.168-.056-.279 0-.391.112a.533.533 0 0 0-.112.502c.056.112.168.223.279.223h.168c.167-.055.279-.279.223-.446.112.111.167.391.112.558 0 .167-.112.335-.168.446-.056.112-.167.224-.223.335-.056.112-.112.224-.112.335 0 .112 0 .279.056.391.223.335.67 0 .782-.279.167-.335.111-.726-.112-1.061 0 0 .391.224.67 1.005.223.67-.168 1.451-.614 1.73z"/>
  </svg>
);

const ModrinthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<path d="M12.252.004a11.78 11.768 0 0 0-8.92 3.73a11 11 0 0 0-2.17 3.11a11.37 11.359 0 0 0-1.16 5.169c0 1.42.17 2.5.6 3.77c.24.759.77 1.899 1.17 2.529a12.3 12.298 0 0 0 8.85 5.639c.44.05 2.54.07 2.76.02c.2-.04.22.1-.26-1.7l-.36-1.37l-1.01-.06a8.5 8.489 0 0 1-5.18-1.8a5.3 5.3 0 0 1-1.3-1.26c0-.05.34-.28.74-.5a37.572 37.545 0 0 1 2.88-1.629c.03 0 .5.45 1.06.98l1 .97l2.07-.43l2.06-.43l1.47-1.47c.8-.8 1.48-1.5 1.48-1.52c0-.09-.42-1.63-.46-1.7c-.04-.06-.2-.03-1.02.18c-.53.13-1.2.3-1.45.4l-.48.15l-.53.53l-.53.53l-.93.1l-.93.07l-.52-.5a2.7 2.7 0 0 1-.96-1.7l-.13-.6l.43-.57c.68-.9.68-.9 1.46-1.1c.4-.1.65-.2.83-.33c.13-.099.65-.579 1.14-1.069l.9-.9l-.7-.7l-.7-.7l-1.95.54c-1.07.3-1.96.53-1.97.53c-.03 0-2.23 2.48-2.63 2.97l-.29.35l.28 1.03c.16.56.3 1.16.31 1.34l.03.3l-.34.23c-.37.23-2.22 1.3-2.84 1.63c-.36.2-.37.2-.44.1c-.08-.1-.23-.6-.32-1.03c-.18-.86-.17-2.75.02-3.73a8.84 8.84 0 0 1 7.9-6.93c.43-.03.77-.08.78-.1c.06-.17.5-2.999.47-3.039c-.01-.02-.1-.02-.2-.03Zm3.68.67c-.2 0-.3.1-.37.38c-.06.23-.46 2.42-.46 2.52c0 .04.1.11.22.16a8.51 8.499 0 0 1 2.99 2a8.38 8.379 0 0 1 2.16 3.449a6.9 6.9 0 0 1 .4 2.8c0 1.07 0 1.27-.1 1.73a9.4 9.4 0 0 1-1.76 3.769c-.32.4-.98 1.06-1.37 1.38c-.38.32-1.54 1.1-1.7 1.14c-.1.03-.1.06-.07.26c.03.18.64 2.56.7 2.78l.06.06a12.07 12.058 0 0 0 7.27-9.4c.13-.77.13-2.58 0-3.4a11.96 11.948 0 0 0-5.73-8.578c-.7-.42-2.05-1.06-2.25-1.06Z"/>
</svg>
);

const installationSteps = [
  '<strong>Шаг 1:</strong> Скачайте архив с переводом по кнопке "Скачать".',
  '<strong>Шаг 2:</strong> Откройте папку вашей сборки. Обычно это можно сделать через лаунчер (в CurseForge это правый клик по сборке -> "Открыть папку").',
  '<strong>Шаг 3:</strong> Найдите в папке сборки директории, которые есть в архиве (чаще всего это папки <strong>kubejs</strong>, <strong>config</strong> или <strong>patchouli_books</strong>).',
  '<strong>Шаг 4:</strong> Распакуйте содержимое архива в папку сборки, подтверждая замену файлов, если потребуется.',
  '<strong>Шаг 5:</strong> Запустите игру. Перевод должен примениться автоматически.',
];


const ModpackDetail: React.FC<ModpackDetailProps> = ({ modpack, downloadCount }) => {
  const handleBackClick = () => {
    window.location.hash = '';
  };
  
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(modpack.downloadUrl, '_blank', 'noopener,noreferrer');
  };

  const renderCount = () => {
    if (downloadCount === 'loading') return 'Загрузка...';
    if (downloadCount === 'error') return 'Ошибка';
    if (typeof downloadCount === 'number') return downloadCount.toLocaleString('ru-RU');
    return null;
  };

  return (
    <div className="minecraft-detail-view p-4 md:p-6 lg:p-8">
      <button onClick={handleBackClick} className="minecraft-btn mb-6 text-sm py-2 px-4">
        &lt; Назад к списку
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img 
            src={modpack.imageUrl} 
            alt={modpack.title}
            className="w-full h-auto object-cover border-4 border-stone-900 mb-4" 
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl uppercase text-black mb-2" style={{ textShadow: '2px 2px 0 #ffffff90' }}>
            {modpack.title}
          </h1>
          <p className="text-stone-600 text-lg mb-4">
            Версия: {modpack.version}
            <span className="mx-2 text-stone-400">|</span>
            Minecraft: {modpack.minecraftVersion}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
             <a 
                href={modpack.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownloadClick}
                className="minecraft-btn text-center py-3 px-6 text-lg uppercase"
              >
                Скачать
              </a>
              {renderCount() && (
                <div className="download-badge text-white text-sm px-3 py-1 rounded flex items-center justify-center">
                  <DownloadIcon />
                  <span>{renderCount()} скачиваний</span>
                </div>
              )}
          </div>
          
          <div 
            className="text-stone-800 text-base leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: modpack.detailedDescription }} 
          />
          
          <CollapsibleList title="Установка" items={installationSteps} />

          {modpack.localizedMods && modpack.localizedMods.length > 0 && (
            <CollapsibleList title="Список локализованных модов" items={modpack.localizedMods} />
          )}

          {(modpack.curseforgeUrl || modpack.modrinthUrl) && (
             <div className="mt-8 pt-6 border-t-4 border-stone-500">
                <h3 className="text-xl uppercase text-black mb-4">Источники</h3>
                <div className="flex flex-wrap gap-4">
                  {modpack.curseforgeUrl && (
                    <a href={modpack.curseforgeUrl} target="_blank" rel="noopener noreferrer" className="minecraft-btn minecraft-btn-source minecraft-btn-curseforge">
                      <CurseForgeIcon />
                      <span>CurseForge</span>
                    </a>
                  )}
                  {modpack.modrinthUrl && (
                    <a href={modpack.modrinthUrl} target="_blank" rel="noopener noreferrer" className="minecraft-btn minecraft-btn-source minecraft-btn-modrinth">
                      <ModrinthIcon />
                      <span>Modrinth</span>
                    </a>
                  )}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModpackDetail;
