import { createApp } from "vue";

createApp({});

const req = require.context("./", false, /\.svg$/);
const requireAll = (requireContext: any) =>
  requireContext.keys().map(requireContext);
requireAll(req);
