export const ResortData = {
  title: "Название резорта",
  image: "https://example.com/image.jpg",
  description: "Описание резорта",
  location: {
    distanceToCity: "100 км от Москвы",
    transport: "Доступен трансфер из аэропорта",
    landmarks: "Вблизи находятся: Кремль, Красная площадь",
  },
  photos: [
    {
      id: 1,
      image: "https://example.com/image1.jpg",
    },
    {
      id: 2,
      image: "https://example.com/image2.jpg",
    },
    {
      id: 3,
      image: "https://example.com/image3.jpg",
      isPanorama: true,
    },
  ],
  services: [
    {
      id: 1,
      title: "Аренда мотеля",
      description: "Описание аренды мотеля",
      types: [
        {
          id: 1,
          title: "Стандартный номер",
          description: "Описание стандартного номера",
          occupancy: 2,
          facilities: ["Wi-Fi", "Телевизор", "Кондиционер"],
        },
        {
          id: 2,
          title: "Люкс",
          description: "Описание люкса",
          occupancy: 4,
          facilities: ["Wi-Fi", "Телевизор", "Кондиционер", "Джакузи"],
        },
      ],
    },
    {
      id: 2,
      title: "Аренда питчей",
      description: "Описание аренды питчей",
      types: [
        {
          id: 1,
          title: "Стандартный питч",
          description: "Описание стандартного питча",
          area: 100,
          electricity: true,
        },
        {
          id: 2,
          title: "Улучшенный питч",
          description: "Описание улучшенного питча",
          area: 150,
          electricity: true,
          water: true,
        },
      ],
    },
    {
      id: 3,
      title: "Аренда автокемперов",
      description: "Описание аренды автокемперов",
      types: [
        {
          id: 1,
          title: "Кемпер на 2-х человек",
          description: "Описание кемпера на 2-х человек",
          price: "1000 руб/сутки",
        },
        {
          id: 2,
          title: "Кемпер на 4-х человек",
          description: "Описание кемпера на 4-х человек",
          price: "1500 руб/сутки",
        },
      ],
    },
  ],
  facilities: [
    {
      id: 1,
      title: "Спортивные площадки",
      description: "Описание спортивных площадок",
      types: ["Футбольное поле", "Волейбольная площадка", "Теннисный корт"],
    },
    {
      id: 2,
      title: "Бассейны",
      description: "Описание бассейнов",
      types: ["Детский бассейн", "Взрослый бассейн", "Бассейн с подогревом"],
    },
    {
      id: 3,
      title: "Детские площадки",
      description: "Описание детских площадок",
      types: ["Площадка для детей до 3-х лет", "Площадка для детей от 3-х лет"],
    },
  ],
  food: {
    cafes: [
      {
        id: 1,
        title: "Название кафе",
        description: "Описание кафе",
        cuisine: "Итальянская кухня",
      },
      {
        id: 2,
        title: "Название кафе",
        description: "Описание кафе",
        cuisine: "Кафе восточной кухни",
      },
    ],
    restaurants: [
      {
        id: 1,
        title: "Название ресторана",
        description: "Описание ресторана",
        cuisine: "Италья",
      },
      {
        id: 2,
        title: "Название кафе",
        description: "Описание кафе",
        cuisine: "Кафе восточной кухни",
      },
    ],
    shops: [
      {
        id: 1,
        title: "Название магазина",
        description: "Описание магазина",
        assortment: "Продукты питания, сувениры",
      },
    ],
  },
  sanitation: {
    showers: [
      {
        id: 1,
        title: "Душевые",
        description: "Описание душевых",
        type: "Платный",
        workingHours: "Круглосуточно",
      },
    ],
    toilets: [
      {
        id: 1,
        title: "Туалеты",
        description: "Описание туалетов",
        type: "Бесплатный",
        workingHours: "Круглосуточно",
      },
    ],
    laundry: {
      id: 1,
      title: "Прачечная",
      description: "Описание прачечной",
      services: ["Стирка", "Сушка", "Глажка"],
      workingHours: "10:00-22:00",
    },
  },
  technical: {
    carService: {
      id: 1,
      title: "СТО",
      description: "Описание СТО",
      services: ["Шиномонтаж", "Ремонт двигателя", "Замена масла"],
      workingHours: "9:00-18:00",
    },
    chargingStation: {
      id: 1,
      title: "Электрозарядка",
      description: "Описание электрозарядки",
      type: "Tesla",
      workingHours: "Круглосуточно",
    },
  },
  trade: {
    souvenirs: [
      {
        id: 1,
        title: "Сувенирный магазин",
        description: "Описание сувенирного магазина",
        assortment: "Магниты, футболки, посуда",
      },
    ],
    food: [
      {
        id: 1,
        title: "Продуктовый магазин",
        description: "Описание продуктового магазина",
        assortment: "Продукты питания, напитки",
      },
    ],
  },
  activities: [
    {
      id: 1,
      title: "Экскурсии",
      description: "Описание экскурсий",
      types: [
        "Экскурсия по городу",
        "Экскурсия в музей",
        "Экскурсия на природу",
      ],
    },
    {
      id: 2,
      title: "Аттракционы",
      description: "Описание аттракционов",
      types: ["Веревочный парк", "Прокат велосипедов", "Прокат квадроциклов"],
    },
  ],
  conferenceHall: {
    id: 1,
    title: "Конференц-зал",
    description: "Описание конференц-зала",
    capacity: 100,
    equipment: ["Проектор", "Экран", "Звук"],
  },
  rentals: {
    bikes: [
      {
        id: 1,
        title: "Велосипед",
        description: "Описание велосипеда",
        type: "Горный велосипед",
        price: "500 руб/день",
      },
    ],
    quads: [
      {
        id: 1,
        title: "Квадроцикл",
        description: "Описание квадроцикла",
        type: "2-местный",
        price: "2000 руб/час",
      },
    ],
  },
  contact: {
    address: "Адрес резорта",
    phone: "+7 (000) 000-00-00",
    email: "info@example.com",
  },
};
