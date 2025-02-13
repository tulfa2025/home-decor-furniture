function getDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    console.log(userAgent)
    // Check for iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'; // It's an iOS device
    }

    if (/Macintosh/.test(userAgent) && !window.MSStream && window.innerWidth > 960) {
      return 'Other'; // It's an iOS device
    }
    
    // Check for Android
    if (/android/i.test(userAgent)) {
      return 'Android'; // It's an Android device
    }
  
    // If neither iOS nor Android
    return 'Other';
  }

export default getDeviceType;