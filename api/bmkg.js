const REGIONS_BMKG = [
  { id:1,  name:"Riau",        kode:"1402" },
  { id:2,  name:"Kalteng",     kode:"6271" },
  { id:3,  name:"Kalbar",      kode:"6101" },
  { id:4,  name:"Papua Barat", kode:"9201" },
  { id:5,  name:"Jambi",       kode:"1501" },
  { id:6,  name:"Sumsel",      kode:"1601" },
  { id:7,  name:"Kalsel",      kode:"6301" },
  { id:8,  name:"Kaltim",      kode:"6401" },
  { id:9,  name:"Aceh",        kode:"1101" },
  { id:10, name:"Papua Tgh",   kode:"9401" },
  { id:11, name:"Sumut",       kode:"1201" },
  { id:12, name:"Bengkulu",    kode:"1701" },
];

export default async function handler(req, res) {
  try {
    const results = await Promise.all(
      REGIONS_BMKG.map(async r => {
        try {
          const url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm2=${r.kode}`;
          const response = await fetch(url);
          const data = await response.json();
          const item = data.data?.[0]?.cuaca?.[0]?.[0];
          return {
            id: r.id,
            name: r.name,
            suhu: item?.t ?? null,
            kelembapan: item?.hu ?? null,
            cuaca: item?.weather_desc ?? null,
            angin: item?.ws ?? null,
          };
        } catch {
          return { id: r.id, name: r.name, suhu: null, kelembapan: null, cuaca: null };
        }
      })
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(results);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
