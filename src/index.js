'use strict';
import { fetchData } from "./api.js";
import { createTree } from "./create-tree.js";

(async function () {
  const data = await fetchData();
  if (data) createTree(data);
}());