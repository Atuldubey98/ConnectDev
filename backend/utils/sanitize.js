function sanitizeFilterUtil(filter) {
  let sanitized = {};
  if (!filter || typeof filter === "string" || !filter.user) {
    return sanitized;
  }
  sanitized = { ...filter };
  return sanitized;
}

function isJson(filter) {
  try {
    JSON.parse(filter);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = { sanitizeFilterUtil };
