import data from './data';
import pauseIcon from './assets/icons/pause.svg';
import './index.scss';

interface IItem {
  id: string;
  icon: string;
  background: string;
  sound: string;
}

let playingMusicId: unknown;
const list = document.querySelector('.weather-list') as HTMLUListElement;

const audioElement = new Audio();
audioElement.loop = true;

const volume = document.querySelector('.volume-controller') as HTMLInputElement;
volume.addEventListener('input', (e: any): void => {
  audioElement.volume = e.currentTarget.value / 100;
});

function renderIcons(item: IItem): void {
  const icon = document
    .querySelector(`[data-item-id = "${item.id}"`)!
    .querySelector('.weather-item__icon') as HTMLImageElement;
  icon.src = item.icon;
}

list.addEventListener('click', ({ target }: any): void => {
  const targetIcon = target.closest('[data-item-id]').querySelector('.weather-item__icon') as HTMLImageElement;
  const targetId: string = target.closest('[data-item-id]').dataset.itemId;

  if (!targetId) return;

  const item: IItem = data.find((i) => i.id === targetId)!;
  if (!item) return;

  if (playingMusicId !== item.id) {
    data.forEach(renderIcons);
    targetIcon.src = item.icon;
    playingMusicId = item.id;
    audioElement.src = item.sound;
    audioElement.play();
    document.body.style.backgroundImage = `url('${item.background}')`;
    return;
  }

  if (audioElement.paused) {
    targetIcon.src = item.icon;
    audioElement.play();
  } else {
    targetIcon.src = pauseIcon;
    audioElement.pause();
  }
});

function renderItem(item: IItem): void {
  const listItem = document.createElement('li');
  const weatherItem = document.createElement('button');
  const itemIcon = document.createElement('img');

  listItem.classList.add('weather-list__item');
  weatherItem.classList.add('weather-item');
  itemIcon.classList.add('weather-item__icon');

  weatherItem.dataset.itemId = item.id;
  weatherItem.style.backgroundImage = `url('${item.background}')`;
  itemIcon.src = item.icon;

  weatherItem.append(itemIcon);
  listItem.append(weatherItem);
  list.append(listItem);
}

data.forEach(renderItem);
