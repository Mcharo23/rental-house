export const units = [
  { value: "Kg", label: "Kg" },
  { value: "Bag", label: "Bag" },
  { value: "Ton", label: "Ton" },
  { value: "Bundle", label: "Bundle" },
  { value: "m³", label: "m³" },
  { value: "Gal", label: "Gal" },
  { value: "L", label: "L" },
  { value: "Piece", label: "Piece" },
  { value: "Sheet", label: "Sheet" },
  { value: "Roll", label: "Roll" },
  { value: "Pallet", label: "Pallet" },
  { value: "Ft", label: "Ft" },
  { value: "sq. ft.", label: "sq. ft." },
  { value: "cu. yd.", label: "cu. yd." },
];

export const country_currency = [
  { value: "Tsh", label: "🇹🇿 TSHS" },
  { value: "eur", label: "🇪🇺 EUR" },
  { value: "usd", label: "🇺🇸 USD" },
  { value: "cad", label: "🇨🇦 CAD" },
  { value: "gbp", label: "🇬🇧 GBP" },
  { value: "aud", label: "🇦🇺 AUD" },
  { value: "kes", label: "🇰🇪 KES" },
  { value: "ugx", label: "🇺🇬 UGX" },
  { value: "rwf", label: "🇷🇼 RWF" },
  { value: "bif", label: "🇧🇮 BIF" },
  { value: "ssd", label: "🇸🇸 SSD" },
  { value: "etb", label: "🇪🇹 ETB" },
];

export const eastAfricanCountries = [
  { value: "+255", label: "🇹🇿 Tanzania", currency: "Tshs" },
  { value: "+254", label: "🇰🇪 Kenya", currency: "Kes" },
  { value: "+256", label: "🇺🇬 Uganda", currency: "Ugx" },
  { value: "+250", label: "🇷🇼 Rwanda", currency: "Rwf" },
  { value: "+257", label: "🇧🇮 Burundi", currency: "Bif" },
  { value: "+211", label: "🇸🇸 South Sudan", currency: "Ssp" },
  { value: "+252", label: "🇸🇴 Somalia", currency: "Sos" },
  { value: "+251", label: "🇪🇹 Ethiopia", currency: "Etb" },
];

export const period = [
  { value: "", label: "Duration" },
  { value: "/day", label: "Tsh/Day" },
  { value: "/Week", label: "Tsh/Week" },
  { value: "/month", label: "Tsh/Month" },
  { value: "/year", label: "Tsh/Year" },
];

export const locations = [
  {
    label: "Pick house region",
    value: "",
  },
  {
    label: "Arusha",
    value: "Arusha",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Arusha", value: "Arusha" },
      { label: "Arumeru", value: "Arumeru" },
      { label: "Babati", value: "Babati" },
      { label: "Karatu", value: "Karatu" },
      { label: "Longido", value: "Longido" },
    ],
  },
  {
    label: "Dar es Salaam",
    value: "Dar es Salaam",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Kinondoni", value: "Kinondoni" },
      { label: "Ilala", value: "Ilala" },
      { label: "Temeke", value: "Temeke" },
      { label: "Ubungo", value: "Ubungo" },
      { label: "Kigamboni", value: "Kigamboni" },
    ],
  },
  {
    label: "Dodoma",
    value: "Dodoma",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Dodoma", value: "Dodoma" },
      { label: "Bahigwe", value: "Bahigwe" },
      { label: "Chamwino", value: "Chamwino" },
      { label: "Chemba", value: "Chemba" },
      { label: "Kondoa", value: "Kondoa" },
      { label: "Kongwa", value: "Kongwa" },
      { label: "Mpwapwa", value: "Mpwapwa" },
    ],
  },
  {
    label: "Geita",
    value: "Geita",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Bukombe", value: "Bukombe" },
      { label: "Chato", value: "Chato" },
      { label: "Geita", value: "Geita" },
      { label: "Mbogwe", value: "Mbogwe" },
      { label: "Nyang'hwale", value: "Nyang'hwale" },
    ],
  },
  {
    label: "Iringa",
    value: "Iringa",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Iringa", value: "Iringa" },
      { label: "Iringa Rural", value: "Iringa Rural" },
      { label: "Kilolo", value: "Kilolo" },
      { label: "Mufindi", value: "Mufindi" },
    ],
  },
  {
    label: "Kagera",
    value: "Kagera",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Biharamulo", value: "Biharamulo" },
      { label: "Bukoba", value: "Bukoba" },
      { label: "Bukoba Rural", value: "Bukoba Rural" },
      { label: "Karagwe", value: "Karagwe" },
      { label: "Kyerwa", value: "Kyerwa" },
      { label: "Missenyi", value: "Missenyi" },
      { label: "Muleba", value: "Muleba" },
      { label: "Ngara", value: "Ngara" },
    ],
  },
  {
    label: "Katavi",
    value: "Katavi",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Mlele", value: "Mlele" },
      { label: "Mpanda", value: "Mpanda" },
      { label: "Mpanda Rural", value: "Mpanda Rural" },
    ],
  },
  {
    label: "Kigoma",
    value: "Kigoma",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Kigoma Urban", value: "Kigoma Urban" },
      { label: "Kigoma Rural", value: "Kigoma Rural" },
      { label: "Kasulu", value: "Kasulu" },
      { label: "Buhigwe", value: "Buhigwe" },
      { label: "Kakonko", value: "Kakonko" },
      { label: "Uvinza", value: "Uvinza" },
    ],
  },
  {
    label: "Kilimanjaro",
    value: "Kilimanjaro",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Moshi Municipal", value: "Moshi Municipal" },
      { label: "Moshi Rural", value: "Moshi Rural" },
      { label: "Hai", value: "Hai" },
      { label: "Siha", value: "Siha" },
      { label: "Rombo", value: "Rombo" },
      { label: "Mwanga", value: "Mwanga" },
    ],
  },
  {
    label: "Lindi",
    value: "Lindi",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Lindi Municipal", value: "Lindi Municipal" },
      { label: "Lindi Rural", value: "Lindi Rural" },
      { label: "Kilwa", value: "Kilwa" },
      { label: "Liwale", value: "Liwale" },
      { label: "Nachingwea", value: "Nachingwea" },
      { label: "Ruangwa", value: "Ruangwa" },
    ],
  },
  {
    label: "Manyara",
    value: "Manyara",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Babati Town", value: "Babati Town" },
      { label: "Babati Rural", value: "Babati Rural" },
      { label: "Hanang", value: "Hanang" },
      { label: "Kiteto", value: "Kiteto" },
      { label: "Mbulu Town", value: "Mbulu Town" },
      { label: "Mbulu Rural", value: "Mbulu Rural" },
      { label: "Simanjiro", value: "Simanjiro" },
    ],
  },
  {
    label: "Mara",
    value: "Mara",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Musoma Municipal", value: "Musoma Municipal" },
      { label: "Musoma Rural", value: "Musoma Rural" },
      { label: "Bunda", value: "Bunda" },
      { label: "Serengeti", value: "Serengeti" },
      { label: "Tarime", value: "Tarime" },
      { label: "Rorya", value: "Rorya" },
      { label: "Butiama", value: "Butiama" },
    ],
  },
  {
    label: "Mbeya",
    value: "Mbeya",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Mbeya City", value: "Mbeya City" },
      { label: "Mbeya Rural", value: "Mbeya Rural" },
      { label: "Ileje", value: "Ileje" },
      { label: "Mbarali", value: "Mbarali" },
      { label: "Rungwe", value: "Rungwe" },
      { label: "Kyela", value: "Kyela" },
      { label: "Mbozi", value: "Mbozi" },
      { label: "Songwe", value: "Songwe" },
    ],
  },
  {
    label: "Morogoro",
    value: "Morogoro",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Morogoro Municipal", value: "Morogoro Municipal" },
      { label: "Morogoro Rural", value: "Morogoro Rural" },
      { label: "Kilombero", value: "Kilombero" },
      { label: "Ulanga", value: "Ulanga" },
      { label: "Malinyi", value: "Malinyi" },
      { label: "Mvomero", value: "Mvomero" },
      { label: "Gairo", value: "Gairo" },
    ],
  },
  {
    label: "Mtwara",
    value: "Mtwara",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Mtwara Municipal", value: "Mtwara Municipal" },
      { label: "Mtwara Rural", value: "Mtwara Rural" },
      { label: "Nanyumbu", value: "Nanyumbu" },
      { label: "Newala", value: "Newala" },
      { label: "Tandahimba", value: "Tandahimba" },
      { label: "Masasi", value: "Masasi" },
    ],
  },
  {
    label: "Mwanza",
    value: "Mwanza",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Mwanza City", value: "Mwanza City" },
      { label: "Ilemela", value: "Ilemela" },
      { label: "Nyamagana", value: "Nyamagana" },
      { label: "Sengerema", value: "Sengerema" },
      { label: "Kwimba", value: "Kwimba" },
      { label: "Magu", value: "Magu" },
      { label: "Ukerewe", value: "Ukerewe" },
    ],
  },
  {
    label: "Njombe",
    value: "Njombe",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Njombe Town", value: "Njombe Town" },
      { label: "Njombe Rural", value: "Njombe Rural" },
      { label: "Makambako", value: "Makambako" },
      { label: "Wanging'ombe", value: "Wanging'ombe" },
      { label: "Ludewa", value: "Ludewa" },
      { label: "Makete", value: "Makete" },
    ],
  },
  {
    label: "Pemba North",
    value: "Pemba North",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Micheweni", value: "Micheweni" },
      { label: "Wete", value: "Wete" },
      { label: "Mkoani", value: "Mkoani" },
    ],
  },
  {
    label: "Pemba South",
    value: "Pemba South",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Chake Chake", value: "Chake Chake" },
      { label: "Mkoani", value: "Mkoani" },
      { label: "Mkoani District", value: "Mkoani District" },
    ],
  },
  {
    label: "Pwani",
    value: "Pwani",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Kibaha Town", value: "Kibaha Town" },
      { label: "Kibaha Rural", value: "Kibaha Rural" },
      { label: "Kisarawe", value: "Kisarawe" },
      { label: "Mkuranga", value: "Mkuranga" },
      { label: "Rufiji", value: "Rufiji" },
      { label: "Bagamoyo", value: "Bagamoyo" },
    ],
  },
  {
    label: "Rukwa",
    value: "Rukwa",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Kalambo", value: "Kalambo" },
      { label: "Nkasi", value: "Nkasi" },
      { label: "Sumbawanga Town", value: "Sumbawanga Town" },
      { label: "Sumbawanga Rural", value: "Sumbawanga Rural" },
    ],
  },
  {
    label: "Ruvuma",
    value: "Ruvuma",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Mbinga", value: "Mbinga" },
      { label: "Songea Municipal", value: "Songea Municipal" },
      { label: "Songea Rural", value: "Songea Rural" },
      { label: "Tunduru", value: "Tunduru" },
    ],
  },
  {
    label: "Shinyanga",
    value: "Shinyanga",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Shinyanga Municipal", value: "Shinyanga Municipal" },
      { label: "Kahama Town", value: "Kahama Town" },
      { label: "Shinyanga Rural", value: "Shinyanga Rural" },
      { label: "Kishapu", value: "Kishapu" },
    ],
  },
  {
    label: "Simiyu",
    value: "Simiyu",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Bariadi", value: "Bariadi" },
      { label: "Busega", value: "Busega" },
      { label: "Itilima", value: "Itilima" },
      { label: "Maswa", value: "Maswa" },
      { label: "Meatu", value: "Meatu" },
    ],
  },
  {
    label: "Singida",
    value: "Singida",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Manyoni", value: "Manyoni" },
      { label: "Singida Municipal", value: "Singida Municipal" },
      { label: "Ikungi", value: "Ikungi" },
      { label: "Mkalama", value: "Mkalama" },
      { label: "Iramba", value: "Iramba" },
    ],
  },
  {
    label: "Tabora",
    value: "Tabora",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Tabora Municipal", value: "Tabora Municipal" },
      { label: "Igunga", value: "Igunga" },
      { label: "Urambo", value: "Urambo" },
      { label: "Sikonge", value: "Sikonge" },
      { label: "Kaliua", value: "Kaliua" },
      { label: "Tabora Urban", value: "Tabora Urban" },
    ],
  },
  {
    label: "Tanga",
    value: "Tanga",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Tanga City", value: "Tanga City" },
      { label: "Korogwe", value: "Korogwe" },
      { label: "Mkinga", value: "Mkinga" },
      { label: "Lushoto", value: "Lushoto" },
      { label: "Muheza", value: "Muheza" },
      { label: "Pangani", value: "Pangani" },
    ],
  },
  {
    label: "Zanzibar Central/South",
    value: "Zanzibar Central/South",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Mjini Magharibi", value: "Mjini Magharibi" },
      { label: "Kati", value: "Kati" },
      { label: "Kusini", value: "Kusini" },
    ],
  },
  {
    label: "Zanzibar North",
    value: "Zanzibar North",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Kaskazini A", value: "Kaskazini A" },
      { label: "Kaskazini B", value: "Kaskazini B" },
    ],
  },
  {
    label: "Zanzibar Urban/West",
    value: "Zanzibar Urban/West",
    district: [
      { label: "Pick house district", value: "" },
      { label: "Mjini Magharibi", value: "Mjini Magharibi" },
      { label: "Kaskazini Unguja", value: "Kaskazini Unguja" },
    ],
  },
];