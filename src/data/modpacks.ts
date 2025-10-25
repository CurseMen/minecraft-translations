import { Modpack } from '../types';

/*
 * =====================================================================================
 * КАК РЕДАКТИРОВАТЬ ЭТОТ ФАЙЛ
 * =====================================================================================
 *
 * Этот файл — ваша "база данных" для переводов. Чтобы добавить новый перевод,
 * скопируйте существующий блок `{...}` и вставьте его в массив `modpacks`.
 *
 * Убедитесь, что каждый блок отделен запятой `,`, кроме последнего.
 *
 * Поля для заполнения:
 *
 * id: Уникальный номер для каждого перевода. Просто увеличивайте его на 1 для каждого нового.
 * title: Название модпака.
 * description: Краткое описание для карточки на главной странице.
 * detailedDescription: Подробное описание для страницы перевода. Можно использовать
 *                      HTML-теги, например, `<strong>` для выделения и `<br/>` для
 *                      переноса строки.
 * imageUrl: Ссылка на изображение для карточки.
 * downloadUrl: Прямая ссылка на скачивание файла перевода.
 * repoUrl (необязательно): Ссылка на репозиторий GitHub в формате "владелец/репозиторий".
 *                         Включает счётчик скачиваний. Репозиторий должен использовать "Releases".
 * version: Версия модпака, для которой предназначен перевод.
 * minecraftVersion: Версия игры Minecraft, для которой предназначен перевод (например, "1.20.1").
 * lastUpdated (необязательно): Дата последнего обновления в формате "ГГГГ-ММ-ДД".
 *                              Если дата свежая (до 7 дней), на карточке
 *                              появится значок "Обновлено!".
 * localizedMods (необязательно): Массив строк со списком локализованных модов.
 *                                Если поле есть, на странице перевода появится
 *                                сворачивающийся список.
 * curseforgeUrl (необязательно): Ссылка на страницу модпака на CurseForge.
 * modrinthUrl (необязательно): Ссылка на страницу модпака на Modrinth.
 *
 * =====================================================================================
 */

const today = new Date();
const fiveDaysAgo = new Date(today);
fiveDaysAgo.setDate(today.getDate() - 5);
const aMonthAgo = new Date(today);
aMonthAgo.setMonth(today.getMonth() - 1);

const formatDate = (date: Date) => date.toISOString().split('T')[0];


export const modpacks: Modpack[] = [
  {
    id: 1,
    title: "All The Mods 9",
    description: "Полная локализация для одной из крупнейших сборок. Сотни модов на русском языке для комфортного изучения.",
    detailedDescription: "Перевод для <strong>All The Mods 9</strong> включает в себя квесты, названия предметов и интерфейсы большинства модов. Погрузитесь в безграничный мир технологий, магии и исследований, не отвлекаясь на словарь.",
    imageUrl: "https://picsum.photos/seed/atm9/400/200",
    downloadUrl: "#",
    version: "0.2.58+",
    minecraftVersion: "1.20.1",
    lastUpdated: formatDate(today),
  },
  {
    id: 2,
    title: "All The Mods 10",
    description: "Новейшая версия легендарной серии! Перевод квестов и гайдов, чтобы вы были в курсе всех нововведений.",
    detailedDescription: "Локализация для <strong>All The Mods 10</strong> находится в активной разработке. Уже переведены стартовые квесты и основные моды. Откройте для себя будущее моддинга на понятном языке!",
    imageUrl: "https://picsum.photos/seed/atm10/400/200",
    downloadUrl: "#",
    version: "1.0.3+",
    minecraftVersion: "1.21",
    lastUpdated: formatDate(fiveDaysAgo),
  },
  {
    id: 3,
    title: "FTB OceanBlock 2",
    description: "Выживайте в мире, полностью покрытом водой. Все квесты переведены для вашего удобства.",
    detailedDescription: "Продолжение популярной сборки <strong>FTB OceanBlock</strong>. Мы подготовили полный перевод квестовой книги, чтобы вы могли с лёгкостью пройти все испытания и построить свою подводную базу.",
    imageUrl: "https://picsum.photos/seed/oceanblock2/400/200",
    downloadUrl: "#",
    version: "1.2.0",
    minecraftVersion: "1.20.1",
    lastUpdated: formatDate(aMonthAgo),
  },
  {
    id: 4,
    title: "SteamPunk [LPS]",
    description: "Погрузитесь в мир паровых машин и викторианской эстетики с полным переводом квестов и механизмов.",
    detailedDescription: "Локализация для сборки <strong>SteamPunk [LPS]</strong> поможет вам разобраться в сложных механизмах и захватывающем сюжете. Переведены все диалоги, квесты и описания ключевых предметов.",
    imageUrl: "https://picsum.photos/seed/steampunk/400/200",
    downloadUrl: "#",
    version: "66.0",
    minecraftVersion: "1.18.2",
  },
  {
    id: 5,
    title: "FTB Skies 2",
    description: "Новый взгляд на скайблок от команды FTB. Летайте между островами, выполняя переведенные задания.",
    detailedDescription: "Полный перевод квестов для <strong>FTB Skies 2</strong>. Исследуйте парящие в небе острова, изучайте магию и технологии, следуя указаниям на родном языке.",
    imageUrl: "https://picsum.photos/seed/skies2/400/200",
    downloadUrl: "#",
    version: "1.2.1",
    minecraftVersion: "1.20.1",
  },
  {
    id: 6,
    title: "MC Eternal 2",
    description: "Продолжение хардкорной приключенческой сборки. Перевод квестов, достижений и описаний.",
    detailedDescription: "<strong>MC Eternal 2</strong> бросает настоящий вызов. Наш перевод поможет вам сориентироваться в огромном мире, полном опасностей и приключений. Локализованы все квестовые линии и важные гайды.",
    imageUrl: "https://picsum.photos/seed/eternal2/400/200",
    downloadUrl: "#",
    version: "1.0",
    minecraftVersion: "1.19.2",
  },
  {
    id: 7,
    title: "GregTech Community Pack Modern",
    description: "Для истинных ценителей сложных производственных цепочек. Полный перевод квестов и гайдов GregTech.",
    detailedDescription: "Этот перевод предназначен для тех, кто не боится трудностей. Локализация <strong>GregTech Community Pack Modern</strong> охватывает тысячи предметов, механизмов и всю квестовую книгу, чтобы сделать ваш путь к звездам немного проще.",
    imageUrl: "https://picsum.photos/seed/gregtech/400/200",
    downloadUrl: "#",
    version: "1.10.3",
    minecraftVersion: "1.20.1",
  },
  {
    id: 8,
    title: "Cisco's Fantasy Medieval RPG",
    description: "Масштабная RPG-сборка с драконами, магией и подземельями. Перевод квестов и диалогов.",
    detailedDescription: "Погрузитесь в фэнтезийный мир <strong>Dragonfyre</strong>! Наш перевод поможет вам понять сюжет, квесты и диалоги с NPC, делая ваше приключение по-настояшему захватывающим.",
    imageUrl: "https://picsum.photos/seed/dragonfyre/400/200",
    downloadUrl: "#",
    version: "v25",
    minecraftVersion: "1.19.2",
  }
];
