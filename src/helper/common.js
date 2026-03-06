export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
}
export function formatYMDToDMY(input) {
  if (!input) return "";
  if (typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input)) {
    const [y, m, d] = input.split("-");
    return `${d}/${m}/${y}`;
  }
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date)) return "";
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export const number_to_price = (v) => {
  if (v === 0) {
    return "0";
  }

  if (!v || v === "") {
    return v;
  }
  v = v.toString();

  v = v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  v = v.split(",").join("*").split(".").join(",").split("*").join(".");
  return v;
};

export function validateOnlyNumber(pass) {
  const passw = /^\d+$/;
  return passw.test(pass);
}
export function validateNumberPhone(number) {
  const regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  return number.match(regex);
}
