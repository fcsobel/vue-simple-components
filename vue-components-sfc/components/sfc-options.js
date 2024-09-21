// sfc options 
const sfcOptions =
{
    moduleCache: {
        vue: Vue,
    },
    getFile(url) {
        console.log('getfile', url)
        return fetch(url).then((resp) =>
            resp.ok ? resp.text() : Promise.reject(resp)
        );
    },
    addStyle(styleStr) {
        const style = document.createElement('style');
        style.textContent = styleStr;
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
    log(type, ...args) {
        console.log(type, ...args);
    }
};

//export default sfcOptions;

//export default {
 //   moduleCache: {
  //      vue: Vue,
   // },
    //getFile(url) {
     //   console.log('getfile', url)
      //  return fetch(url).then((resp) =>
       //     resp.ok ? resp.text() : Promise.reject(resp)
        //);
    //},
    //addStyle(styleStr) {
        //const style = document.createElement('style');
        //style.textContent = styleStr;
//       const ref = document.head.getElementsByTagName('style')[0] || null;
//        document.head.insertBefore(style, ref);
 //   },
   // log(type, ...args) {
     //   console.log(type, ...args);
    //}
//}