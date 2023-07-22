//
// const safelySaveValueInWindowObj = (name, value) => Object.defineProperty(window, name, { value, writable: false, });


// Adding Config

// const urlHost = window.location.host;
// 
// if (urlHost.includes('localhost')) {
//     safelySaveValueInWindowObj("baseURL", 'mockApi')
//     safelySaveValueInWindowObj("APP_ENV", "development")
// }
// else if (urlHost.includes('40.8:')) {
//     safelySaveValueInWindowObj("baseURL", 'mockApi')
//     safelySaveValueInWindowObj("APP_ENV", "development")
// }
// else if (urlHost.includes('gt')) {
//     safelySaveValueInWindowObj("baseURL", 'mockApi')
//     safelySaveValueInWindowObj("APP_ENV", "Production")
// }



// else if (urlHost.includes('rts-stage')) {

//     safelySaveValueInWindowObj("baseURL", "https://admin-stage.ramandtech.com/")
//     safelySaveValueInWindowObj("APP_ENV", "production")

// }
// else if (urlHost.includes('rts-tgs')) {

//     safelySaveValueInWindowObj("baseURL", 'https://admin-tgs.ramandtech.com/')
//     safelySaveValueInWindowObj("APP_ENV", "production")

// }
// else if (urlHost.includes('rts-farabi')) {

//     safelySaveValueInWindowObj("baseURL", 'https://admin-farabi.ramandtech.com/')
//     safelySaveValueInWindowObj("APP_ENV", "production")

// }

