import axios from "axios";

export default axios.create({
  baseURL: "http://articleavenue-node-server-dc:9002",
  headers: {
    "Content-type": "application/json"
  }
});
