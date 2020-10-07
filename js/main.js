'use strict';

const NUMBER_OF_OFFERS = 8;
const MIM_NUMBER_OF_USERS = 1;
const POST_TITLES = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const PRICE_FROM = 500;
const PRICE_TO = 10000;
const TYPE_OF_HOUSES = [`palace`, `flat`, `house`, `bungalow`];
const NUMBER_OF_ROOMS = [1, 2, 3, 100];
const NUMBER_OF_GUESTS = [3, 2, 1, 0];
const CHECKINS = [`12:00`, `13:00`, `14:00`];
const CHECKOUTS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const STATIC_POINTS = Object.freeze({x1: 0, x2: 1200, y1: 130, y2: 630});
const XY_OFFSET = Object.freeze({x: 25, y: 50});

const pinBlock = document.querySelector(`.map__pins`);

const activateMap = () => {
  const mapBlock = document.querySelector(`.map`);
  return mapBlock.classList.remove(`map--faded`);
};

// The value is no lower min and is less than (but not equal to) max.
const getRandomInt = (min = 0, max = 100) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getMaxIndex = (array) => {
  return array.length - 1;
};

const minIndex = 0;

const shuffle = (elements) => {
  const shuffledElements = elements.slice();

  for (let i = shuffledElements.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledElements[i], shuffledElements[j]] = [shuffledElements[j], shuffledElements[i]];
  }

  return shuffledElements;
};

const getRandomArray = (randomElements) => {
  const newArray = shuffle(randomElements.slice());

  return newArray.slice(0, getRandomInt(0, newArray.length));
};

const getTitleAndType = (titles, types) => {
  const elements = [];
  titles = POST_TITLES;
  types = TYPE_OF_HOUSES;

  for (let i = 0; i < titles.length; i++) {
    elements.push({title: titles[i], type: types[i]});
  }

  return elements;
};

const getlocationXY = () => {
  const locations = [];

  for (let i = 0; i < NUMBER_OF_OFFERS; i++) {
    const locationX = getRandomInt(STATIC_POINTS.x1, STATIC_POINTS.x2);
    const locationY = getRandomInt(STATIC_POINTS.y1, STATIC_POINTS.y2);
    locations.push({x: locationX, y: locationY});
  }

  return locations;
};

const generateOffers = (quantity = NUMBER_OF_OFFERS) => {
  const offers = [];

  for (let i = 0; i < quantity; i++) {
    const titleAndType = getTitleAndType()[getRandomInt(minIndex, getMaxIndex(getTitleAndType()))];
    const locationXY = getlocationXY()[getRandomInt(minIndex, getMaxIndex(getlocationXY()))];

    const generateOffer = () => {
      return {
        author: {
          avatar: `img/avatars/user0${getRandomInt(MIM_NUMBER_OF_USERS, NUMBER_OF_OFFERS)}.png`
        },
        offer: {
          title: titleAndType.title,
          address: `${locationXY.x}, ${locationXY.y}`,
          price: getRandomInt(PRICE_FROM, PRICE_TO),
          type: titleAndType.type,
          rooms: NUMBER_OF_ROOMS[getRandomInt(minIndex, getMaxIndex(NUMBER_OF_ROOMS))],
          guests: NUMBER_OF_GUESTS[getRandomInt(minIndex, getMaxIndex(NUMBER_OF_GUESTS))],
          checkin: CHECKINS[getRandomInt(minIndex, getMaxIndex(CHECKINS))],
          checkout: CHECKOUTS[getRandomInt(minIndex, getMaxIndex(CHECKOUTS))],
          features: getRandomArray(FEATURES),
          description: `Описание`,
          photos: getRandomArray(PHOTOS)
        },
        location: locationXY
      };
    };

    offers.push(generateOffer());
  }

  return offers;
};

const renderPin = (offer) => {
  const pinTemplate = document.querySelector(`#pin`).content;
  const pin = pinTemplate.cloneNode(true);
  const pinImage = pin.querySelector(`img`);
  const pinButton = pin.querySelector(`button`);
  pinButton.style = `left:${offer.location.x - XY_OFFSET.x}px;
                     top:${offer.location.y - XY_OFFSET.y}px;`;
  pinImage.src = `${offer.author.avatar}`;
  pinImage.alt = `${offer.offer.title}`;

  return pin;
};

const renderPins = (offers) => {
  const fragment = document.createDocumentFragment();

  offers.forEach((offer) => {
    fragment.appendChild(renderPin(offer));
  });

  pinBlock.appendChild(fragment);
};

// const renderOfferFeatures = (offerCard, features) => {
//   const offerFeatures = offerCard.querySelector(`.popup__features`);
//   offerFeatures.innerHTML = ``;

//   if (!features || features.length === 0) {
//     offerFeatures.classList.add(`hidden`);
//   }

//   const fragment = document.createDocumentFragment();

//   features.forEach((feature) => {
//     const featureItem = document.createElement(`li`);
//     featureItem.classList.add(`popup__feature`, `popup__feature--${feature}`);
//     fragment.appendChild(featureItem);
//   });

//   offerFeatures.appendChild(fragment);
// };

// const renderOfferPhotos = (offerCard, photos) => {
//   const offerPhotos = offerCard.querySelector(`.popup__photos`);
//   const offerPhoto = offerPhotos.querySelector(`img`);
//   offerPhotos.innerHTML = ``;

//   if (!photos || photos.length === 0) {
//     offerPhotos.classList.add(`hidden`);
//   }

//   const fragment = document.createDocumentFragment();

//   photos.forEach((photo) => {
//     const offerCardPhoto = offerPhoto.cloneNode();
//     offerCardPhoto.src = photo;
//     fragment.appendChild(offerCardPhoto);
//   });

//   return offerPhotos.appendChild(fragment);
// };

// const createOfferCard = (offer) => {
//   const cardTemplate = document.querySelector(`#card`).content;
//   const mapCard = cardTemplate.querySelector(`.map__card`);
//   const offerCard = mapCard.cloneNode(true);
//   const offerTitle = offerCard.querySelector(`.popup__title`);
//   const offerAddress = offerCard.querySelector(`.popup__text--address`);
//   const offerPrice = offerCard.querySelector(`.popup__text--price`);
//   const offerHouseType = offerCard.querySelector(`.popup__type`);
//   const offerRoomsAndGuests = offerCard.querySelector(`.popup__text--capacity`);
//   const offerTimes = offerCard.querySelector(`.popup__text--time`);
//   const offerDescription = offerCard.querySelector(`.popup__description`);
//   const offerAvatar = offerCard.querySelector(`.popup__avatar`);

//   offerTitle.textContent = offer.offer.title;
//   offerAddress.textContent = offer.offer.address;
//   offerPrice.textContent = `${offer.offer.price}₽/ночь`;
//   offerHouseType.textContent = offer.offer.type;
//   offerRoomsAndGuests.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей.`;
//   offerTimes.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}.`;
//   renderOfferFeatures(offerCard, offer.offer.features);
//   offerDescription.textContent = offer.offer.description;
//   renderOfferPhotos(offerCard, offer.offer.photos);
//   offerAvatar.src = `${offer.author.avatar}`;

//   pinBlock.append(offerCard);
// };

activateMap();
const offers = generateOffers();
renderPins(offers);
// createOfferCard(offers[0]);

// module4-task1
// переключение режимов страницы между неактивным и активным
