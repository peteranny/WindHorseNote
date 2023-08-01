const key = "@@State";
const getItem = () => localStorage.getItem(key);
const setItem = (item) => localStorage.setItem(key, item);

const root = document.getElementById("root");
const data = JSON.parse(getItem());
const pretty = /pretty/.test(location.search);
root.value = JSON.stringify(data, null, pretty ? 2 : null);

const initial = root.value;
root.onblur = (e) => {
  const value = e.target.value;
  if (value === initial) return;

  try {
    const data = JSON.parse(value);
    const item = JSON.stringify(data);
    setItem(item);
    location.reload();
  } catch {
    alert("[DEBUG ONLY] Falied to parse the data");
    location.reload();
  }
};
