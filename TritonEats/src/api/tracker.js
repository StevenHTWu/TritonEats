import axios from "axios";

export default axios.create({
  baseURL: "http://us-central1-tritoneats-api.cloudfunctions.net/app",
});
