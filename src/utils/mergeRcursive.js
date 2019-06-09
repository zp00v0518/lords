function mergeRcursive(target, donor) {
  for (const p in donor) {
    try {
      if (donor[p].constructor === Object) {
        target[p] = mergeRcursive(target[p], donor[p]);
      } else {
        target[p] = donor[p];
      }
    } catch (e) {
      target[p] = donor[p];
    }
  }
  return target;
}

export default mergeRcursive;
