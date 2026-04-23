export default async function handler(req, res) {
  const url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm2=6471`;
  const response = await fetch(url);
  const data = await response.json();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}