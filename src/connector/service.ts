import axios from "axios";

export async function isServiceRunning() {
  const { data } = await axios
    .get("http://service.netwio.local/$netwio/health")
    .catch(() => ({
      data: "",
    }));

  return data == "running" ? true : false;
}
