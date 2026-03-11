const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`

export type HeroMetric = {
  value: string
  label: string
}

export type ServicePillar = {
  title: string
  copy: string
}

export type RouteStory = {
  id: string
  label: string
  title: string
  copy: string
  note: string
  focusStops: string[]
  image: string
  accent: string
  mapX: number
  mapY: number
}

export type PhysicsChip = {
  label: string
  accent: string
}

export type GalleryItem = {
  title: string
  caption: string
  image: string
}

export type TicketOption = {
  eyebrow: string
  title: string
  copy: string
  accent: string
  tag: string
}

export type LandmarkFeature = {
  title: string
  copy: string
  image: string
  stop: string
}

export const heroMetrics: HeroMetric[] = [
  {
    value: '20 years',
    label: 'in hospitality and Bratislava tourism',
  },
  {
    value: '15 stops',
    label: 'across the published GoldenExpress city route',
  },
  {
    value: 'Audio guide',
    label: 'available in multiple languages for small groups',
  },
  {
    value: 'Private rides',
    label: 'for weddings, children, team events and evening trips',
  },
]

export const servicePillars: ServicePillar[] = [
  {
    title: 'Multilingual storytelling',
    copy:
      'The original service offers an audio guide in multiple languages and live guides for larger groups.',
  },
  {
    title: 'Castle terrace stop',
    copy:
      'The route pauses at Bratislava Castle, where guests can step out for one of the strongest city panoramas.',
  },
  {
    title: 'Night ride + UFO view',
    copy:
      'One of the signature experiences combines an evening city loop with the 95 m UFO observation deck.',
  },
  {
    title: 'Tailor-made departures',
    copy:
      'The train is also positioned for custom rides: weddings, corporate events, children tours and private charters.',
  },
  {
    title: 'Historic city rhythm',
    copy:
      'The route is built around Old Town streets, theatre façades, the riverfront and landmark architecture.',
  },
  {
    title: 'Flexible by design',
    copy:
      'GoldenExpress explicitly presents the route as adjustable to guest needs instead of a fixed rigid template.',
  },
]

export const routeStories: RouteStory[] = [
  {
    id: 'castle',
    label: '01 Castle stop',
    title: 'Start with Bratislava Castle and a terrace view over the entire city.',
    copy:
      'GoldenExpress describes the castle pause as a guided panoramic moment. The train gets visitors there without a steep walk, then hands the city over from above.',
    note: 'Local guide + terrace panorama',
    focusStops: ['Bratislava Castle', "St. Martin's Cathedral", 'Former fortification walls'],
    image: asset('hero-castle.jpg'),
    accent: '#f2ba5f',
    mapX: 28,
    mapY: 16,
  },
  {
    id: 'gate',
    label: '02 Old Town core',
    title: 'Move through Michael’s Gate, the pedestrian zone and the main square as one continuous story.',
    copy:
      'Instead of breaking the visit into disconnected walks, the train ties medieval gateways, palaces and the compact centre into one legible sequence.',
    note: 'Gate + squares + palace frontage',
    focusStops: ["Michael's Gate", 'Pedestrian zone', "Primate's Palace"],
    image: asset('hero-gate.jpg'),
    accent: '#7ad2c3',
    mapX: 48,
    mapY: 45,
  },
  {
    id: 'theatre',
    label: '03 River-facing axis',
    title: 'Slip toward the Slovak National Theatre, gallery frontage and the harbour edge without solving transport.',
    copy:
      'The published city-tour copy leans on the theatre district, civic buildings and the Danube-side route as an easy sightseeing spine.',
    note: 'Theatre district + river edge',
    focusStops: ['Slovak National Theatre', 'Slovak National Gallery', 'Harbor'],
    image: asset('train-station.jpg'),
    accent: '#8ebdff',
    mapX: 67,
    mapY: 63,
  },
  {
    id: 'blue-church',
    label: '04 Design highlights',
    title: 'Use the loop to jump between postcard icons like the Blue Church and central monuments.',
    copy:
      'The route shortens the city into comfortable hop-off moments, especially helpful for families, seniors or first-time visitors trying to see the essentials in one pass.',
    note: 'Blue Church + central monuments',
    focusStops: ['Blue Church', 'Mirbach Palace', 'Statue "Schöne Náci"'],
    image: asset('train-front.jpg'),
    accent: '#93d4ff',
    mapX: 80,
    mapY: 74,
  },
  {
    id: 'night',
    label: '05 Night ride',
    title: 'Finish with the evening route and the 95 m UFO observation deck above the SNP bridge.',
    copy:
      'GoldenExpress highlights the sunset version of Bratislava: the Danube below, city lights switching on, and a view that can stretch up to 100 km in clear weather.',
    note: 'UFO tower + sunset over the Danube',
    focusStops: ['U.F.O.', 'Slavín', 'Danube panorama'],
    image: asset('hero-view.jpg'),
    accent: '#ffb86e',
    mapX: 42,
    mapY: 58,
  },
]

export const fullRouteStops = [
  'Bratislava Castle',
  "Michael's Gate",
  'Pedestrian zone',
  'Main square',
  "Primate's Palace",
  'Slovak National Theatre',
  'Slovak National Gallery',
  'Blue Church',
  "St. Martin's Cathedral",
  'Mirbach Palace',
  'U.F.O.',
  'Statue "Schöne Náci"',
  'Slavín',
  'Tourist agency',
  'Harbor',
]

export const physicsChips: PhysicsChip[] = [
  { label: 'Castle stop', accent: '#f2ba5f' },
  { label: 'Audio guide', accent: '#7ad2c3' },
  { label: 'Night ride', accent: '#ffb86e' },
  { label: 'Blue Church', accent: '#93d4ff' },
  { label: 'Private charter', accent: '#f47e61' },
  { label: 'Wedding ride', accent: '#c88cf1' },
  { label: 'Old Town', accent: '#d5bf9c' },
  { label: 'Danube view', accent: '#7ec0f5' },
]

export const galleryItems: GalleryItem[] = [
  {
    title: 'Castle arrival',
    caption: 'Hero imagery adapted from the existing GoldenExpress slider.',
    image: asset('hero-castle.jpg'),
  },
  {
    title: 'Historic gate approach',
    caption: 'Old Town perspective for the medieval core of the route.',
    image: asset('hero-gate.jpg'),
  },
  {
    title: 'Night panorama',
    caption: 'Evening view towards the Danube and the UFO experience.',
    image: asset('hero-view.jpg'),
  },
  {
    title: 'Train profile',
    caption: 'Gallery photo from the train category on goldenexpress.eu.',
    image: asset('train-side.jpg'),
  },
  {
    title: 'Departure point',
    caption: 'A stronger operational view for the loading and embarkation mood.',
    image: asset('train-station.jpg'),
  },
  {
    title: 'Front carriage',
    caption: 'Closer train detail for product-focused sections and cards.',
    image: asset('train-front.jpg'),
  },
]

export const ticketOptions: TicketOption[] = [
  {
    eyebrow: 'Core city loop',
    title: 'Sell the easiest first-timer tour through the Bratislava essentials.',
    copy:
      'Position the main ride around castle access, Old Town landmarks and multilingual audio storytelling instead of walking logistics.',
    accent: '#f4b85c',
    tag: 'Best for first-day sightseeing',
  },
  {
    eyebrow: 'Evening product',
    title: 'Frame the night ride as the premium atmosphere-led Bratislava moment.',
    copy:
      'Use the Danube, sunset colors and the UFO viewpoint to turn the evening departure into a memorable upsell, not just another schedule slot.',
    accent: '#8ebdff',
    tag: 'Sunset + city lights',
  },
  {
    eyebrow: 'Private charter',
    title: 'Keep weddings, families and team events visible as bookable private formats.',
    copy:
      'GoldenExpress already mentions tailored departures. The site should surface them early with a clear route-customization narrative.',
    accent: '#7ad2c3',
    tag: 'Custom route by request',
  },
]

export const landmarkFeatures: LandmarkFeature[] = [
  {
    title: 'Bratislava Castle',
    copy:
      'The highest visual anchor on the route and one of the strongest reasons to pick the train over a long uphill walk.',
    image: asset('hero-castle.jpg'),
    stop: 'Stop 01',
  },
  {
    title: "Michael's Gate",
    copy:
      'The surviving medieval gate gives the route a recognisable Old Town silhouette and instantly signals central Bratislava.',
    image: asset('hero-gate.jpg'),
    stop: 'Stop 02',
  },
  {
    title: 'Blue Church',
    copy:
      'A postcard landmark that works perfectly in marketing cards and in route storytelling for first-time visitors.',
    image: asset('train-front.jpg'),
    stop: 'Stop 08',
  },
  {
    title: 'UFO Observation Deck',
    copy:
      'The evening route gains real product tension when the Danube and UFO tower are presented as the final viewpoint crescendo.',
    image: asset('hero-view.jpg'),
    stop: 'Stop 11',
  },
]

export const contactDetails = {
  company: 'Donau Welle / Danube Wave s.r.o.',
  address: ['Špitálska 16', '811 08 Bratislava', 'Slovakia'],
  email: 'info@d-w.sk',
  phone: '+421 903 768 543',
  facebook: 'https://www.facebook.com/pages/Danube-Wave-Donau-Welle/477939848972612',
}
