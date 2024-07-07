function mergeRecursive(target, donor) {
  for (const p in donor) {
    try {
      if (donor[p].constructor === Object) {
        target[p] = mergeRecursive(target[p], donor[p]);
      } else {
        target[p] = donor[p];
      }
    } catch (e) {
      target[p] = donor[p];
    }
  }
  return target;
}

export default mergeRecursive;
