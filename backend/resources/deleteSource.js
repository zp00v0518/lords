function deleteSource(delSources, storage) {
  if (Array.isArray(delSources)) {
    delSources.forEach(item => {
      const name = item.resource;
      storage.sources[name].nowValue -= item.value;
    });
  } else {
    Object.keys(delSources).forEach(name => {
      const value = delSources[name];
      storage.sources[name].nowValue -= value;
    });
  }
  return storage;
}

module.exports = deleteSource;
