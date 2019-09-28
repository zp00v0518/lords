function setProgress(arr){
  const progress = {
      attack: arr[0] || 0,
      def: arr[1] || 0,
      magic: arr[2] || 0 
  }
  return progress;
}

module.exports = setProgress;