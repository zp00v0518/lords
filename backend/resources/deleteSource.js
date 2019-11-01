function deleteSource(delSources, storage) {
  delSources.forEach(item => {
    const name = item.resource;
    storage.sources[name].nowValue -= item.value; 
  })
  return storage;
}

module.exports = deleteSource;
