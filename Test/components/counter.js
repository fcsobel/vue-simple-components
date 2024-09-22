// myComponent.js
// export default function(props) {
//     return {
//         message: props.message || 'Default Message',
//         count: 0,
//         increment() {
//             this.count++;
//         }
//     };
// }

export default function(props) {
    return {
      $template: '#counter-template',
      count: props.initialCount,
      inc() {
        this.count++
      },
      mounted() {
        console.log(`counter is mounted!`)
      }
    }
  }